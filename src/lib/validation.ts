import { z } from 'zod';

// food categories
export const foodCategories = [
  'grains',
  'vegetables', 
  'fruits',
  'dairy',
  'canned',
  'beverages',
  'cooked',
  'other'
] as const;

export const donationItemSchema = z.object({
  id: z.number(),
  name: z.string()
    .trim()
    .min(1, { message: "Item name is required" })
    .max(100, { message: "Item name must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9\s,.\-']+$/, { message: "Item name contains invalid characters" }),
  quantity: z.string()
    .trim()
    .min(1, { message: "Quantity is required" })
    .max(50, { message: "Quantity must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9\s.,\-]+$/, { message: "Quantity contains invalid characters" }),
  category: z.enum(foodCategories, { 
    errorMap: () => ({ message: "Please select a valid category" })
  })
});

export const donationFormSchema = z.object({
  items: z.array(donationItemSchema)
    .min(1, { message: "At least one item is required" })
    .max(20, { message: "Maximum 20 items allowed" }),
  pickupAddress: z.string()
    .trim()
    .min(10, { message: "Please provide a complete address (at least 10 characters)" })
    .max(500, { message: "Address must be less than 500 characters" })
    .regex(/^[a-zA-Z0-9\s,.\-#/'()]+$/, { message: "Address contains invalid characters" }),
  pickupDate: z.string()
    .min(1, { message: "Pickup date is required" })
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, { message: "Pickup date cannot be in the past" }),
  notes: z.string()
    .trim()
    .max(1000, { message: "Notes must be less than 1000 characters" })
    .regex(/^[a-zA-Z0-9\s,.\-#/'()!?@]*$/, { message: "Notes contain invalid characters" })
    .optional()
    .or(z.literal(''))
});

// Registration form schema
export const registrationSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s.\-']+$/, { message: "Name can only contain letters, spaces, dots, hyphens, and apostrophes" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(72, { message: "Password must be less than 72 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type exports
export type DonationItem = z.infer<typeof donationItemSchema>;
export type DonationFormData = z.infer<typeof donationFormSchema>;
export type RegistrationData = z.infer<typeof registrationSchema>;

// Validation helper that returns user-friendly errors
export function validateDonationForm(data: unknown): { 
  success: true; 
  data: DonationFormData 
} | { 
  success: false; 
  errors: { field: string; message: string }[] 
} {
  const result = donationFormSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return { success: false, errors };
}

export function validateRegistration(data: unknown): { 
  success: true; 
  data: RegistrationData 
} | { 
  success: false; 
  errors: { field: string; message: string }[] 
} {
  const result = registrationSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return { success: false, errors };
}

// Sanitize string inputs (removes potential XSS)
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}
