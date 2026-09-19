import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 * 
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 * 
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6") // "px-6 py-2 bg-blue-500"
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
