import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../lib/utils.js";

/**
 * Checkbox Component with Optional Integrated Label
 * 
 * Accessible checkbox based on Radix UI
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.checked] - Checked state
 * @param {Function} [props.onCheckedChange] - Callback when checked state changes
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.description] - Optional description text below label
 * @param {boolean} [props.required] - Mark field as required
 * 
 * @example
 * // Classic usage (backward compatible)
 * <Checkbox checked={agreed} onCheckedChange={setAgreed} />
 * 
 * // Modern usage with integrated label
 * <Checkbox 
 *   label="I agree to the terms and conditions" 
 *   checked={agreed} 
 *   onCheckedChange={setAgreed}
 *   required
 * />
 * 
 * // With description
 * <Checkbox 
 *   label="Enable notifications" 
 *   description="Receive email updates about your account"
 *   checked={notifications} 
 *   onCheckedChange={setNotifications}
 * />
 */
const Checkbox = React.forwardRef(({ className, label, description, required, ...props }, ref) => {
    const checkboxId = React.useId();

    // If no label, render classic checkbox
    if (!label) {
        return (
            <CheckboxPrimitive.Root
                ref={ref}
                className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn("flex items-center justify-center text-current")}
                >
                    <Check className="h-4 w-4" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        );
    }

    // Modern checkbox with integrated label
    return (
        <div className="flex items-start space-x-3">
            <CheckboxPrimitive.Root
                id={checkboxId}
                ref={ref}
                className={cn(
                    "peer h-5 w-5 shrink-0 rounded-md border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground mt-0.5",
                    className
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn("flex items-center justify-center text-current")}
                >
                    <Check className="h-4 w-4" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            <div className="flex-1">
                <label
                    htmlFor={checkboxId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
