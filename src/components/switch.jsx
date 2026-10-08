import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../lib/utils.js";

/**
 * Switch Component with Optional Integrated Label
 * 
 * Accessible switch/toggle based on Radix UI
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.checked] - Checked state
 * @param {Function} [props.onCheckedChange] - Callback when checked state changes
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.description] - Optional description text below label
 * 
 * @example
 * // Classic usage (backward compatible)
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * 
 * // Modern usage with integrated label
 * <Switch 
 *   label="Enable notifications" 
 *   description="Receive email updates"
 *   checked={enabled} 
 *   onCheckedChange={setEnabled}
 * />
 */
const Switch = React.forwardRef(({ className, label, description, ...props }, ref) => {
    const switchId = React.useId();

    // If no label, render classic switch
    if (!label) {
        return (
            <SwitchPrimitives.Root
                className={cn(
                    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                    className
                )}
                {...props}
                ref={ref}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                    )}
                />
            </SwitchPrimitives.Root>
        );
    }

    // Modern switch with integrated label
    return (
        <div className="flex items-start space-x-3">
            <SwitchPrimitives.Root
                id={switchId}
                className={cn(
                    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input mt-0.5",
                    className
                )}
                {...props}
                ref={ref}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                    )}
                />
            </SwitchPrimitives.Root>

            <div className="flex-1">
                <label
                    htmlFor={switchId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    {label}
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

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
