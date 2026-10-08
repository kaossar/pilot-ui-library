import * as React from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { cn } from "../lib/utils.js";

/**
 * RadioGroupField - Radio Group with Integrated Label
 * Wrapper around Radix RadioGroup for modern label integration
 * 
 * @param {Object} props
 * @param {string} props.label - Label text for the group
 * @param {Array} props.options - Array of {value, label, description?} objects
 * @param {string} [props.value] - Selected value
 * @param {Function} [props.onValueChange] - Callback when value changes
 * @param {boolean} [props.required] - Mark field as required
 * @param {string} [props.helperText] - Helper text below radio group
 * @param {boolean} [props.error] - Error state
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.orientation="vertical"] - Layout orientation
 * 
 * @example
 * <RadioGroupField 
 *   label="Notification Preference"
 *   value={preference}
 *   onValueChange={setPreference}
 *   options={[
 *     { value: "email", label: "Email", description: "Receive notifications via email" },
 *     { value: "sms", label: "SMS", description: "Receive notifications via text message" },
 *     { value: "none", label: "None", description: "Do not send notifications" }
 *   ]}
 *   required
 * />
 */
const RadioGroupField = React.forwardRef(
    ({ label, options, value, onValueChange, required, helperText, error, className, orientation = "vertical", ...props }, ref) => {
        const groupId = React.useId();

        return (
            <div className="w-full">
                {/* Group Label */}
                <label className="text-sm font-medium leading-none mb-3 block">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>

                {/* Radio Group */}
                <RadioGroup
                    ref={ref}
                    value={value}
                    onValueChange={onValueChange}
                    className={cn(
                        orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
                        className
                    )}
                    {...props}
                >
                    {options.map((option, index) => {
                        const itemId = `${groupId}-${option.value}`;
                        return (
                            <div key={option.value} className="flex items-start space-x-3">
                                <RadioGroupItem
                                    value={option.value}
                                    id={itemId}
                                    className={cn(
                                        "mt-0.5",
                                        error && "border-destructive"
                                    )}
                                />
                                <div className="flex-1">
                                    <label
                                        htmlFor={itemId}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                        {option.label}
                                    </label>
                                    {option.description && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {option.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </RadioGroup>

                {/* Helper Text / Error Message */}
                {helperText && (
                    <p className={cn(
                        "mt-2 text-xs px-1",
                        error ? "text-destructive" : "text-muted-foreground"
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

RadioGroupField.displayName = "RadioGroupField";

export { RadioGroupField };
