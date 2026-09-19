import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { cn } from "../lib/utils";

const ConfirmDialog = React.forwardRef(({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    variant = "default",
    children,
    className,
    ...props
}, ref) => {
    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange?.(false);
    };

    const handleCancel = () => {
        onCancel?.();
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent ref={ref} className={cn("sm:max-w-[425px]", className)} {...props}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children && (
                    <div className="py-2">
                        {children}
                    </div>
                )}
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant={variant}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

ConfirmDialog.displayName = "ConfirmDialog";

export { ConfirmDialog };
