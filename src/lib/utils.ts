import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging Tailwind classes
// This is from shadcn docs - super useful for conditional classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
