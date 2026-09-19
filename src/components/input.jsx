import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Input Component with Optional Integrated Label
 * 
 * @param {Object} props
 * @param {string} [props.type="text"] - Input type
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.error=false] - Error state
 * @param {React.ReactNode} [props.prefix] - Icon or element to show before input
 * @param {React.ReactNode} [props.suffix] - Icon or element to show after input
 * @param {string} [props.label] - Optional label text (modern floating label)
 * @param {string} [props.helperText] - Optional helper/error text below input
 * @param {boolean} [props.required] - Mark field as required
 * 
 * @example
 * // Classic usage (backward compatible)
 * <Input type="email" placeholder="Email" />
 * 
 * // Modern usage with integrated label
 * <Input label="Email Address" type="email" required />
 * <Input label="Search" prefix={<Search />} />
 */
const Input = React.forwardRef(
    ({ className, type = "text", error, prefix, suffix, label, helperText, required, ...props }, ref) => {
        const inputId = React.useId();
        const [isFocused, setIsFocused] = React.useState(false);
        const [hasValue, setHasValue] = React.useState(false);


        const inputRef = React.useRef(null);

        // Détecte si la valeur est renseignée (controlled)
        React.useEffect(() => {
            if (props.value !== undefined) {
                setHasValue(!!props.value);
            }
        }, [props.value]);

        // Détection autofill navigateur via animation CSS
        // Chrome déclenche l'animation 'onAutoFillStart' dès qu'il remplit un champ.
        // C'est la seule méthode fiable cross-navigateur pour les inputs contrôlés React.
        const handleAnimationStart = (e) => {
            if (e.animationName === 'onAutoFillStart') {
                setHasValue(true);
            }
            if (e.animationName === 'onAutoFillCancel') {
                // L'utilisateur a effacé la valeur autofillée
                const el = inputRef.current;
                if (el && !el.value) setHasValue(false);
            }
        };

        const handleChange = (e) => {
            setHasValue(!!e.target.value);
            if (props.onChange) {
                props.onChange(e);
            }
        };

        // If no label, render classic input
        if (!label) {
            return (
                <div className="relative w-full">
                    {prefix && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                            {prefix}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                            prefix && "pl-10",
                            suffix && "pr-10",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {suffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 inline-flex items-center">
                            {suffix}
                        </div>
                    )}
                </div>
            );
        }

        // Modern input with integrated floating label
        const forceFloatingTypes = ['date', 'datetime-local', 'month', 'time', 'week'];
        const isLabelFloating = isFocused || hasValue || props.placeholder || forceFloatingTypes.includes(type);

        return (
            <div className="w-full">
                <div className="relative w-full">
                    {prefix && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                            {prefix}
                        </div>
                    )}

                    <input
                        id={inputId}
                        type={type}
                        className={cn(
                            "peer flex h-14 w-full rounded-xl border border-input bg-background px-3 pt-6 pb-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus:placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all input-autofill-detect",
                            prefix && "pl-10",
                            suffix && "pr-10",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={(node) => {
                            inputRef.current = node;
                            if (typeof ref === 'function') ref(node);
                            else if (ref) ref.current = node;
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleChange}
                        onAnimationStart={handleAnimationStart}
                        {...props}
                    />

                    {/* Floating Label — remonte via JS (hasValue/focus) ou CSS (:-webkit-autofill) */}
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground",
                            "peer-[-webkit-autofill]:top-2 peer-[-webkit-autofill]:text-xs peer-[-webkit-autofill]:font-medium",
                            prefix && "left-10",
                            isLabelFloating
                                ? "top-2 text-xs font-medium"
                                : "top-1/2 -translate-y-1/2 text-sm"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>

                    {suffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 inline-flex items-center">
                            {suffix}
                        </div>
                    )}
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

Input.displayName = "Input";

export { Input };
