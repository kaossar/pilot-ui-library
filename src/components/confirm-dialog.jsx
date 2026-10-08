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

    // Accessibilité : sans description, on l'indique explicitement à Radix
    // (aria-describedby={undefined}) pour éviter le warning console.
    // Avec description, Radix relie automatiquement DialogDescription.
    const a11yProps = description ? {} : { "aria-describedby": undefined };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent ref={ref} data-testid="confirm-dialog" className={cn("sm:max-w-[425px]", className)} {...a11yProps} {...props}>
                <DialogHeader>
                    <DialogTitle data-testid="confirm-dialog-title">{title}</DialogTitle>
                    {description && (
                        <DialogDescription data-testid="confirm-dialog-description">{description}</DialogDescription>
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
                        data-testid="confirm-dialog-cancel"
                        onClick={handleCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant={variant}
                        data-testid="confirm-dialog-confirm"
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
