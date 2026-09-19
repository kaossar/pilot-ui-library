import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "../lib/utils";

// ── Contexte Toast ────────────────────────────────────────────────────────────

const ToastContext = createContext(null);

// ── Configuration des variants ────────────────────────────────────────────────

const TOAST_VARIANTS = {
    success: {
        icon: CheckCircle2,
        containerClass: "border-success/30 bg-success/10",
        iconClass: "text-success",
        titleClass: "text-success",
    },
    error: {
        icon: XCircle,
        containerClass: "border-destructive/30 bg-destructive/10",
        iconClass: "text-destructive",
        titleClass: "text-destructive",
    },
    warning: {
        icon: AlertTriangle,
        containerClass: "border-warning/30 bg-warning/10",
        iconClass: "text-warning",
        titleClass: "text-warning-foreground",
    },
    info: {
        icon: Info,
        containerClass: "border-primary/30 bg-primary/10",
        iconClass: "text-primary",
        titleClass: "text-primary",
    },
};

const DEFAULT_DURATION = 4000; // 4 secondes

// ── Composant Toast individuel ────────────────────────────────────────────────

/**
 * Toast individuel affiché dans le Toaster.
 * Non destiné à être utilisé directement — passer par useToast().
 */
const ToastItem = ({ id, variant = "info", title, description, onDismiss }) => {
    const config = TOAST_VARIANTS[variant] || TOAST_VARIANTS.info;
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "flex items-start gap-3 p-4 rounded-2xl border shadow-lg shadow-black/10 backdrop-blur-sm",
                "animate-in slide-in-from-right-5 fade-in duration-300",
                "min-w-[320px] max-w-[420px]",
                config.containerClass
            )}
            role="alert"
        >
            {/* Icône */}
            <div className="flex-shrink-0 mt-0.5">
                <Icon className={cn("h-5 w-5", config.iconClass)} />
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
                {title && (
                    <p className={cn("text-sm font-bold leading-tight", config.titleClass)}>
                        {title}
                    </p>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Bouton fermeture */}
            <button
                onClick={() => onDismiss(id)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
                aria-label="Fermer la notification"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

// ── Provider Toast ────────────────────────────────────────────────────────────

/**
 * ToastProvider — À placer à la racine de l'application (dans main.jsx ou App.jsx)
 *
 * @example
 * // Dans main.jsx :
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Ajouter un toast
    const addToast = useCallback(({ variant = "info", title, description, duration = DEFAULT_DURATION }) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;

        setToasts(prev => [...prev, { id, variant, title, description }]);

        // Suppression automatique après la durée configurée
        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    // Supprimer un toast manuellement
    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // API du hook useToast
    const toast = {
        /** Afficher un toast de succès */
        success: (title, description, options = {}) =>
            addToast({ variant: "success", title, description, ...options }),

        /** Afficher un toast d'erreur */
        error: (title, description, options = {}) =>
            addToast({ variant: "error", title, description, ...options }),

        /** Afficher un toast d'avertissement */
        warning: (title, description, options = {}) =>
            addToast({ variant: "warning", title, description, ...options }),

        /** Afficher un toast informatif */
        info: (title, description, options = {}) =>
            addToast({ variant: "info", title, description, ...options }),

        /** Fermer un toast par son ID */
        dismiss: dismissToast,
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <Toaster toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    );
};

// ── Toaster — Container des toasts ───────────────────────────────────────────

/**
 * Toaster — Conteneur de rendu des toasts actifs.
 * Positionné en bas à droite de l'écran.
 * Automatiquement inclus dans ToastProvider, ne pas l'utiliser directement.
 */
const Toaster = ({ toasts, onDismiss }) => {
    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3"
            role="region"
            aria-label="Notifications"
            aria-live="polite"
        >
            {toasts.map(toast => (
                <ToastItem
                    key={toast.id}
                    {...toast}
                    onDismiss={onDismiss}
                />
            ))}
        </div>
    );
};

// ── Hook useToast ─────────────────────────────────────────────────────────────

/**
 * useToast — Hook pour afficher des notifications toast depuis n'importe quel composant.
 *
 * Doit être utilisé à l'intérieur d'un <ToastProvider>.
 *
 * @returns {{ success, error, warning, info, dismiss }} API du toast
 *
 * @example
 * const toast = useToast();
 *
 * // Succès
 * toast.success("Agent affecté", "L'agent a été affecté à la mission avec succès.");
 *
 * // Erreur
 * toast.error("Erreur", "Impossible de charger les missions. Veuillez réessayer.");
 *
 * // Avertissement
 * toast.warning("Document expiré", "Le CNAPS de cet agent expire dans 7 jours.");
 *
 * // Info
 * toast.info("Synchronisation", "Les données sont en cours de mise à jour.");
 */
const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "[PILOT OS] useToast() doit être utilisé à l'intérieur d'un <ToastProvider>. " +
            "Vérifiez que <ToastProvider> est bien placé dans main.jsx."
        );
    }

    return context;
};

export { ToastProvider, Toaster, useToast };
