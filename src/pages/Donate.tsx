import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Package, MapPin, Calendar, Plus, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import donateHeroBg from "@/assets/donate-hero-bg.jpg";
import { validateDonationForm, sanitizeString } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FadeIn, ScaleIn } from "@/components/animations";

interface DonationItem {
  id: number;
  name: string;
  quantity: string;
  category: string;
}

const Donate = () => {
  // TODO: Refactor this component - it's getting too big
  // Maybe split form logic into separate hook?
  const [items, setItems] = useState<DonationItem[]>([
    { id: 1, name: "", quantity: "", category: "" }
  ]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupDate, setPickupDate] = useState(""); // FIXME: timezone issues on some browsers
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const addItem = () => {
    if (items.length >= 20) {
      toast({
        title: "Maximum items reached",
        description: "You can only add up to 20 items per donation.",
        variant: "destructive",
      });
      return;
    }
    // Using Date.now() for unique IDs - might want to use uuid later?
    setItems([...items, { id: Date.now(), name: "", quantity: "", category: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof DonationItem, value: string) => {
    // Sanitize input before updating state
    const sanitizedValue = field === 'category' ? value : sanitizeString(value);
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: sanitizedValue } : item
    ));
    // Clear field-specific errors when user starts typing
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`items.${items.findIndex(i => i.id === id)}.${field}`];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a donation.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Prepare and sanitize form data
    const formData = {
      items: items.map(item => ({
        ...item,
        name: sanitizeString(item.name),
        quantity: sanitizeString(item.quantity),
      })),
      pickupAddress: sanitizeString(pickupAddress),
      pickupDate,
      notes: sanitizeString(notes),
    };

    // Validate using zod schema
    const validation = validateDonationForm(formData);

    if (validation.success === false) {
      // Map errors to field names
      const errors: Record<string, string> = {};
      validation.errors.forEach(err => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);

      // Show first error as toast
      toast({
        title: "Validation Error",
        description: validation.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare items for database (remove id, keep only relevant fields)
      const itemsForDb = formData.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        category: item.category,
      }));

      // Insert donation into database
      const { error } = await supabase
        .from('donations')
        .insert({
          user_id: user.id,
          items: itemsForDb,
          pickup_address: formData.pickupAddress,
          pickup_date: formData.pickupDate,
          notes: formData.notes || null,
          status: 'pending',
        });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "Donation Submitted!",
        description: "Thank you for your generosity. We'll contact you soon for pickup.",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Unable to submit donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login prompt if not authenticated
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8">
                <Heart className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Sign In to Donate
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Please log in or create an account to submit a food donation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-8 animate-scale-in">
                <CheckCircle className="w-12 h-12 text-secondary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Your donation has been submitted successfully. Our team will contact you within 24 hours to arrange pickup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => {
                  setIsSuccess(false);
                  setItems([{ id: 1, name: "", quantity: "", category: "" }]);
                  setPickupAddress("");
                  setPickupDate("");
                  setNotes("");
                }}>
                  Donate More
                </Button>
                <Button variant="outline" asChild>
                  <a href="/track">Track Donations</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section 
        className="pt-24 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(${donateHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn className="max-w-2xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
            </ScaleIn>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Donate Food
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Your surplus food can be someone's only meal today. Fill in the details below and we'll arrange pickup.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Items Section */}
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Food Items
                  </h2>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-muted rounded-xl">
                      <div className="md:col-span-5">
                        <Label htmlFor={`item-${item.id}`}>Item Name</Label>
                        <Input
                          id={`item-${item.id}`}
                          placeholder="e.g., Rice, Vegetables, Bread"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, "name", e.target.value)}
                          className={`mt-1 ${fieldErrors[`items.${index}.name`] ? 'border-destructive' : ''}`}
                          maxLength={100}
                          required
                        />
                        {fieldErrors[`items.${index}.name`] && (
                          <p className="text-destructive text-xs mt-1">{fieldErrors[`items.${index}.name`]}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`qty-${item.id}`}>Quantity</Label>
                        <Input
                          id={`qty-${item.id}`}
                          placeholder="e.g., 5 kg"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                          className={`mt-1 ${fieldErrors[`items.${index}.quantity`] ? 'border-destructive' : ''}`}
                          maxLength={50}
                          required
                        />
                        {fieldErrors[`items.${index}.quantity`] && (
                          <p className="text-destructive text-xs mt-1">{fieldErrors[`items.${index}.quantity`]}</p>
                        )}
                      </div>
                      <div className="md:col-span-4">
                        <Label>Category</Label>
                        <Select
                          value={item.category}
                          onValueChange={(value) => updateItem(item.id, "category", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grains">Grains & Cereals</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                            <SelectItem value="dairy">Dairy Products</SelectItem>
                            <SelectItem value="canned">Canned Foods</SelectItem>
                            <SelectItem value="beverages">Beverages</SelectItem>
                            <SelectItem value="cooked">Cooked Meals</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="mt-4"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Item
                </Button>
              </div>

              {/* Pickup Details */}
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Pickup Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Pickup Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your full address"
                      value={pickupAddress}
                      onChange={(e) => {
                        setPickupAddress(sanitizeString(e.target.value));
                        setFieldErrors(prev => ({ ...prev, pickupAddress: '' }));
                      }}
                      className={`mt-1 ${fieldErrors.pickupAddress ? 'border-destructive' : ''}`}
                      maxLength={500}
                      required
                    />
                    {fieldErrors.pickupAddress && (
                      <p className="text-destructive text-xs mt-1">{fieldErrors.pickupAddress}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="date">Preferred Pickup Date</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => {
                          setPickupDate(e.target.value);
                          setFieldErrors(prev => ({ ...prev, pickupDate: '' }));
                        }}
                        className={`pl-10 ${fieldErrors.pickupDate ? 'border-destructive' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    {fieldErrors.pickupDate && (
                      <p className="text-destructive text-xs mt-1">{fieldErrors.pickupDate}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions or details about the donation..."
                      value={notes}
                      onChange={(e) => {
                        setNotes(sanitizeString(e.target.value));
                        setFieldErrors(prev => ({ ...prev, notes: '' }));
                      }}
                      className={`mt-1 ${fieldErrors.notes ? 'border-destructive' : ''}`}
                      maxLength={1000}
                      rows={4}
                    />
                    {fieldErrors.notes && (
                      <p className="text-destructive text-xs mt-1">{fieldErrors.notes}</p>
                    )}
                    <p className="text-muted-foreground text-xs mt-1">{notes.length}/1000 characters</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Submit Donation
                    </>
                  )}
                </Button>
                <p className="text-muted-foreground text-sm mt-4">
                  Our team will contact you within 24 hours to confirm pickup
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
