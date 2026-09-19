import * as React from "react";
import { Badge } from './badge';
import { cn } from '../lib/utils';

const StatusBadge = React.forwardRef(({ variant, children, className, ...props }, ref) => {
    return (
        <Badge ref={ref} className={cn("border", variant, className)} {...props}>
            {children}
        </Badge>
    );
});

StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
