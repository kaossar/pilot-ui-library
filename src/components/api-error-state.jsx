import * as React from "react";
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash, ShieldX } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./button.jsx";

// ── Configuration des types d'erreur ─────────────────────────────────────────

const ERROR_CONFIGS = {
    default: {
        icon: AlertTriangle,
        title: "Une erreur est survenue",
        description: "Impossible de charger les données. Veuillez réessayer.",
        iconClass: "text-destructive",
        bgClass: "bg-destructive/10",
    },
    network: {
        icon: WifiOff,
        title: "Connexion impossible",
        description: "Vérifiez votre connexion internet et réessayez.",
        iconClass: "text-warning",
        bgClass: "bg-warning/10",
    },
    server: {
        icon: ServerCrash,
        title: "Erreur serveur",
        description: "Le serveur a rencontré un problème. Notre équipe est informée.",
        iconClass: "text-destructive",
        bgClass: "bg-destructive/10",
    },
    permission: {
        icon: ShieldX,
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour afficher ce contenu.",
        iconClass: "text-muted-foreground",
        bgClass: "bg-muted",
    },
};

/**
 * ApiErrorState — Composant d'état d'erreur API standardisé PILOT OS
 *
 * Affiché lorsqu'un appel API échoue, en remplacement des `console.error()` silencieux.
 * Fournit un feedback clair à l'utilisateur et un moyen de réessayer.
 *
 * @param {string} [message] - Message d'erreur personnalisé (surcharge la description par défaut)
 * @param {Function} [onRetry] - Callback appelé lors du clic sur "Réessayer"
 * @param {'default' | 'network' | 'server' | 'permission'} [type='default'] - Type d'erreur
 * @param {'default' | 'compact'} [variant='default'] - Variante d'affichage
 * @param {string} [className] - Classes CSS additionnelles
 *
 * @example
 * // Utilisation standard
 * if (error) return <ApiErrorState message={error.message} onRetry={fetchData} />;
 *
 * @example
 * // Erreur réseau
 * if (isOffline) return <ApiErrorState type="network" onRetry={retry} />;
 *
 * @example
 * // Compact dans un panneau
 * <ApiErrorState variant="compact" message="Impossible de charger les agents." onRetry={load} />
 */
const ApiErrorState = React.forwardRef(({
    message,
    onRetry,
    type = "default",
    variant = "default",
    className,
    ...props
}, ref) => {
    const config = ERROR_CONFIGS[type] || ERROR_CONFIGS.default;
    const Icon = config.icon;
    const isCompact = variant === "compact";

    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col items-center justify-center text-center",
                isCompact ? "py-6 px-4" : "py-14 px-8",
                className
            )}
            role="alert"
            {...props}
        >
            {/* Icône */}
            <div className={cn(
                "flex items-center justify-center rounded-2xl mb-4",
                isCompact ? "h-10 w-10 mb-3" : "h-14 w-14 mb-5",
                config.bgClass
            )}>
                <Icon className={cn(
                    config.iconClass,
                    isCompact ? "h-5 w-5" : "h-7 w-7"
                )} strokeWidth={1.5} />
            </div>

            {/* Titre */}
            <h3 className={cn(
                "font-black tracking-tight text-foreground",
                isCompact ? "text-sm mb-1" : "text-lg mb-2"
            )}>
                {config.title}
            </h3>

            {/* Message d'erreur */}
            <p className={cn(
                "text-muted-foreground max-w-sm leading-relaxed",
                isCompact ? "text-xs mb-4" : "text-sm mb-6"
            )}>
                {message || config.description}
            </p>

            {/* Bouton Réessayer */}
            {onRetry && (
                <Button
                    variant="outline"
                    size={isCompact ? "sm" : "md"}
                    onClick={onRetry}
                    icon={<RefreshCw className={cn(isCompact ? "h-3 w-3" : "h-4 w-4")} />}
                >
                    Réessayer
                </Button>
            )}
        </div>
    );
});

ApiErrorState.displayName = "ApiErrorState";

export { ApiErrorState };
