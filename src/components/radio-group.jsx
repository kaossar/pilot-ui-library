import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../lib/utils.js";

/**
 * RadioGroup Component
 * 
 * Accessible radio group based on Radix UI
 * 
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroupItem value="option1" id="r1" />
 *   <Label htmlFor="r1">Option 1</Label>
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            {...props}
            ref={ref}
        />
    );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem Component
 * 
 * Individual radio button item
 * 
 * @param {Object} props
 * @param {string} props.value - Value of this radio option
 * @param {string} [props.id] - ID for label association
 * @param {string} [props.className] - Additional CSS classes
 */
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-2.5 w-2.5 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
