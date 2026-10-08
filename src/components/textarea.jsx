import * as React from "react";
import { cn } from "../lib/utils.js";

/**
 * Textarea Component with Optional Integrated Label
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error=false] - Error state
 * @param {number} [props.maxLength] - Maximum character length
 * @param {boolean} [props.showCounter=false] - Show character counter
 * @param {number} [props.rows=3] - Number of rows
 * @param {string} [props.label] - Optional label text (modern floating label)
 * @param {string} [props.helperText] - Optional helper/error text below textarea
 * @param {boolean} [props.required] - Mark field as required
 * 
 * @example
 * // Classic usage (backward compatible)
 * <Textarea placeholder="Enter description..." rows={4} />
 * 
 * // Modern usage with integrated label
 * <Textarea label="Description" rows={4} maxLength={500} showCounter required />
 */
const Textarea = React.forwardRef(
    ({ className, error, maxLength, showCounter, rows = 3, label, helperText, required, ...props }, ref) => {
        const textareaId = React.useId();
        const [charCount, setCharCount] = React.useState(0);
        const [isFocused, setIsFocused] = React.useState(false);
        const [hasValue, setHasValue] = React.useState(false);

        // Check if textarea has value for floating label
        React.useEffect(() => {
            if (props.value !== undefined) {
                setHasValue(!!props.value);
                setCharCount(String(props.value).length);
            }
        }, [props.value]);

        const handleChange = (e) => {
            const length = e.target.value.length;
            setCharCount(length);
            setHasValue(length > 0);
            if (props.onChange) {
                props.onChange(e);
            }
        };

        // If no label, render classic textarea
        if (!label) {
            return (
                <div className="w-full">
                    <textarea
                        className={cn(
                            "flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        rows={rows}
                        maxLength={maxLength}
                        onChange={handleChange}
                        {...props}
                    />
                    {showCounter && maxLength && (
                        <div className="mt-1 text-xs text-muted-foreground text-right">
                            {charCount} / {maxLength}
                        </div>
                    )}
                </div>
            );
        }

        // Modern textarea with integrated floating label
        const isLabelFloating = isFocused || hasValue || props.placeholder;

        return (
            <div className="w-full">
                <div className="relative w-full">
                    <textarea
                        id={textareaId}
                        className={cn(
                            "peer flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 pt-7 pb-2 text-sm ring-offset-background placeholder:text-transparent focus:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        rows={rows}
                        maxLength={maxLength}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleChange}
                        {...props}
                    />

                    {/* Floating Label */}
                    <label
                        htmlFor={textareaId}
                        className={cn(
                            "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground",
                            isLabelFloating
                                ? "top-2 text-xs font-medium"
                                : "top-4 text-sm"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                </div>

                {/* Counter and Helper Text */}
                <div className="flex justify-between items-center mt-1.5 px-3">
                    {helperText && (
                        <p className={cn(
                            "text-xs",
                            error ? "text-destructive" : "text-muted-foreground"
                        )}>
                            {helperText}
                        </p>
                    )}
                    {showCounter && maxLength && (
                        <span className={cn(
                            "text-xs ml-auto",
                            charCount > maxLength * 0.9 ? "text-destructive" : "text-muted-foreground"
                        )}>
                            {charCount} / {maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
