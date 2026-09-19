import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * Label Component
 * 
 * Accessible label for form inputs based on Radix UI
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Label text
 * 
 * @example
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
