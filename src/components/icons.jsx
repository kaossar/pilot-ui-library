import * as React from "react";
import {
    Calculator, Calendar, Clock, Check, Info, AlertCircle,
    Building, Moon, Sun, Star, Zap, Repeat, ArrowRight,
    Trash2, Plus, List, X, Hash, Percent, Wand2,
    Save, ArrowLeft, FileDown, History, Edit2, Search
} from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Standard Icon wrapper to ensure consistent sizing and behavior
 */
const IconWrapper = React.forwardRef(({ icon: IconComponent, className, size = "md", ...props }, ref) => {
    const sizes = {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8"
    };

    return (
        <IconComponent
            ref={ref}
            className={cn(sizes[size] || sizes.md, className)}
            {...props}
        />
    );
});

IconWrapper.displayName = "IconWrapper";

// Export individual icons
export {
    Calculator, Calendar, Clock, Check, Info, AlertCircle,
    Building, Moon, Sun, Star, Zap, Repeat, ArrowRight,
    Trash2, Plus, List, X, Hash, Percent, Wand2,
    Save, ArrowLeft, FileDown, History, Edit2, Search, IconWrapper
};
