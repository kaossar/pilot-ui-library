import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Composant de Tiroir Latéral (Sheet/Drawer) Elite.
 * Basé sur Radix UI Dialog pour l'accessibilité.
 */
const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = ({ className, ...props }) => (
    <SheetPrimitive.Portal className={cn(className)} {...props} />
);
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
        ref={ref}
    />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
            ref={ref}
            className={cn(
                "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl",
                className
            )}
            {...props}
        >
            {children}
            <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
            </SheetPrimitive.Close>
        </SheetPrimitive.Content>
    </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }) => (
    <div
        className={cn("flex flex-col space-y-2 text-center sm:text-left border-b border-slate-100 pb-4 mb-6", className)}
        {...props}
    />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }) => (
    <div
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-slate-100 pt-6 mt-6", className)}
        {...props}
    />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn("text-lg font-bold text-foreground", className)}
        {...props}
    />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
    <SheetPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
