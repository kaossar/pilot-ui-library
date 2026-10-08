import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Toggle Switch Component
 * A visual toggle switch (like iOS/Android switches)
 */
const Toggle = React.forwardRef(({
    className,
    pressed,
    onPressedChange,
    children,
    disabled,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={pressed}
            disabled={disabled}
            onClick={() => onPressedChange?.(!pressed)}
            className={cn(
                "inline-flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {/* Switch visual */}
            <div
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    pressed ? "bg-blue-600" : "bg-gray-300",
                    disabled && "opacity-50"
                )}
            >
                <span
                    className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                        pressed ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </div>

            {/* Label */}
            {children && (
                <span className="text-sm font-medium text-slate-700">
                    {children}
                </span>
            )}
        </button>
    );
});

Toggle.displayName = "Toggle";

export { Toggle };
