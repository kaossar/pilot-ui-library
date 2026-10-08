import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Button variants using class-variance-authority
 */
const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground shadow hover:bg-primary-hover active:bg-primary-active",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:bg-secondary/80",
                outline:
                    "border-2 border-primary bg-transparent text-primary hover:bg-primary-light active:bg-primary-light/80",
                ghost:
                    "hover:bg-surface hover:text-surface-foreground active:bg-muted",
                danger:
                    "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 active:bg-destructive/80",
                success:
                    "bg-success text-success-foreground shadow hover:bg-success/90 active:bg-success/80",
            },
            size: {
                sm: "h-9 px-3 text-xs",
                md: "h-10 px-4 py-2",
                lg: "h-12 px-6 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

/**
 * Button Component
 * 
 * @param {Object} props
 * @param {string} [props.variant="primary"] - Button style variant
 * @param {string} [props.size="md"] - Button size
 * @param {boolean} [props.asChild=false] - Render as child element
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Button content
 * @param {boolean} [props.loading=false] - Show loading state
 * @param {React.ReactNode} [props.icon] - Icon to display (left side)
 * @param {React.ReactNode} [props.iconRight] - Icon to display (right side)
 * 
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="outline" icon={<Shield />}>Secure</Button>
 * <Button variant="danger" loading>Deleting...</Button>
 */
const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, loading = false, icon, iconRight, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!loading && icon && <span className="inline-flex">{icon}</span>}
                {children}
                {!loading && iconRight && <span className="inline-flex">{iconRight}</span>}
            </Comp>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
