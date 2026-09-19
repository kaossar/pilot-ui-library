import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent } from "./select";
import { cn } from "../lib/utils.js";

/**
 * SelectField - Select with Integrated Floating Label
 * Wrapper around Radix Select for modern label integration
 * 
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.required] - Mark field as required
 * @param {boolean} [props.error] - Error state
 * @param {string} [props.helperText] - Helper/error text below select
 * @param {React.ReactNode} props.children - SelectItem components
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <SelectField label="Country" value={country} onValueChange={setCountry} required>
 *   <SelectItem value="fr">France</SelectItem>
 *   <SelectItem value="us">United States</SelectItem>
 * </SelectField>
 */
const SelectField = React.forwardRef(
    ({ label, placeholder, required, error, helperText, children, className, value, onValueChange, ...props }, ref) => {
        const selectId = React.useId();
        const [isOpen, setIsOpen] = React.useState(false);
        const hasValue = value !== undefined && value !== null && value !== "";

        const isLabelFloating = isOpen || hasValue || (placeholder && placeholder.trim() !== "");
        const safeValue = value === "" ? undefined : value;

        return (
            <div className="w-full">
                <div className="relative w-full">
                    <Select value={safeValue} onValueChange={onValueChange} onOpenChange={setIsOpen} {...props}>
                        <SelectTrigger
                            ref={ref}
                            className={cn(
                                label ? "h-14 pt-6 pb-2" : "h-9 py-2",
                                error && "border-destructive focus:ring-destructive",
                                className
                            )}
                        >
                            <SelectValue placeholder={placeholder || " "} />
                        </SelectTrigger>
                        <SelectContent position="popper" side="bottom" className="max-h-[300px]">
                            {children}
                        </SelectContent>
                    </Select>

                    {/* Floating Label */}
                    <label
                        htmlFor={selectId}
                        className={cn(
                            "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground z-10",
                            isLabelFloating
                                ? "top-2 text-xs font-medium"
                                : "top-1/2 -translate-y-1/2 text-sm"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                </div>

                {/* Helper Text / Error Message */}
                {helperText && (
                    <p className={cn(
                        "mt-1.5 text-xs px-3",
                        error ? "text-destructive" : "text-muted-foreground"
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

SelectField.displayName = "SelectField";

export { SelectField };
