import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";

/**
 * Badge variants
 */
const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                success:
                    "border-transparent bg-success text-success-foreground hover:bg-success/80",
                warning:
                    "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
                info:
                    "border-transparent bg-info text-info-foreground hover:bg-info/80",
                error:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

/**
 * Badge Component
 * 
 * @param {Object} props
 * @param {string} [props.variant="default"] - Badge style variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Badge content
 * 
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error">Offline</Badge>
 * <Badge variant="warning">Pending</Badge>
 */
function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
