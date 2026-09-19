import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button.jsx";

/**
 * EmptyState — Composant d'état vide standardisé PILOT OS
 *
 * Affiché sur toutes les listes/tableaux lorsqu'il n'y a aucune donnée à montrer.
 * Garantit une expérience cohérente sur l'ensemble du SaaS.
 *
 * @param {React.ElementType} [icon] - Icône lucide-react à afficher (ex: Users, MapPin)
 * @param {string} title - Titre principal de l'état vide
 * @param {string} [description] - Description secondaire pour guider l'utilisateur
 * @param {{ label: string, onClick: Function, icon?: React.ReactNode }} [action] - CTA principal
 * @param {{ label: string, onClick: Function }} [secondaryAction] - CTA secondaire (lien/ghost)
 * @param {string} [className] - Classes CSS additionnelles
 * @param {'default' | 'compact'} [variant='default'] - Variante d'affichage
 *
 * @example
 * // Usage standard dans une liste
 * <EmptyState
 *   icon={Users}
 *   title="Aucun agent enregistré"
 *   description="Commencez par créer le profil de votre premier agent de sécurité."
 *   action={{ label: "Ajouter un agent", onClick: () => navigate('/agents/new'), icon: <Plus className="h-4 w-4" /> }}
 * />
 *
 * @example
 * // Usage compact (dans un panneau ou une section)
 * <EmptyState
 *   variant="compact"
 *   icon={FileText}
 *   title="Aucune mission"
 *   description="Aucune mission planifiée pour cette période."
 * />
 */
const EmptyState = React.forwardRef(({
    icon: Icon,
    title,
    description,
    action,
    secondaryAction,
    className,
    variant = "default",
    ...props
}, ref) => {
    // Taille du container selon la variante
    const isCompact = variant === "compact";

    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col items-center justify-center text-center",
                isCompact ? "py-8 px-4" : "py-16 px-8",
                className
            )}
            {...props}
        >
            {/* Icône avec halo décoratif */}
            {Icon && (
                <div className={cn(
                    "relative mb-6 flex items-center justify-center",
                    isCompact ? "mb-4" : "mb-6"
                )}>
                    {/* Cercles concentriques décoratifs */}
                    <div className="absolute inset-0 rounded-full bg-primary/5 scale-[2.5] opacity-50" />
                    <div className="absolute inset-0 rounded-full bg-primary/5 scale-[1.75] opacity-70" />

                    {/* Conteneur de l'icône */}
                    <div className={cn(
                        "relative flex items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm",
                        isCompact ? "h-12 w-12" : "h-16 w-16"
                    )}>
                        <Icon className={cn(isCompact ? "h-6 w-6" : "h-8 w-8")} strokeWidth={1.5} />
                    </div>
                </div>
            )}

            {/* Titre */}
            <h3 className={cn(
                "font-black tracking-tight text-foreground",
                isCompact ? "text-base mb-1" : "text-xl mb-2"
            )}>
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className={cn(
                    "text-muted-foreground max-w-sm leading-relaxed",
                    isCompact ? "text-xs mb-4" : "text-sm mb-6"
                )}>
                    {description}
                </p>
            )}

            {/* Actions */}
            {(action || secondaryAction) && (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    {action && (
                        <Button
                            variant="primary"
                            size={isCompact ? "sm" : "md"}
                            onClick={action.onClick}
                            icon={action.icon}
                        >
                            {action.label}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button
                            variant="ghost"
                            size={isCompact ? "sm" : "md"}
                            onClick={secondaryAction.onClick}
                        >
                            {secondaryAction.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
});

EmptyState.displayName = "EmptyState";

export { EmptyState };
