import React, { useId } from 'react';
import { cn } from '../lib/utils.js';

/**
 * DatePicker — input date natif stylisé avec floating label.
 *
 * Utilise directement <input type="date"> du navigateur.
 * Aucun Popover, aucun calendrier custom, aucun problème de z-index.
 *
 * API standard : onChange={e => setState(e.target.value)}
 * La valeur est toujours une string au format 'yyyy-MM-dd'.
 */
export function DatePicker({
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
    label,
    helperText,
    error,
    required,
    min,
    max,
    // Ignorés — conservés pour compatibilité API avec les anciens appels
    align,
}) {
    const inputId = useId();

    // Normaliser : accepte string 'yyyy-MM-dd' ou objet Date
    const normalizedValue = (() => {
        if (!value) return '';
        if (typeof value === 'string') return value;
        if (value instanceof Date && !isNaN(value.getTime())) {
            // Formater en yyyy-MM-dd local sans décalage UTC
            const y = value.getFullYear();
            const m = String(value.getMonth() + 1).padStart(2, '0');
            const d = String(value.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }
        return '';
    })();

    return (
        <div className="w-full">
            <div className="relative w-full">

                {/* Floating label au-dessus de l'input */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "absolute left-3 top-2 text-xs font-medium text-muted-foreground pointer-events-none z-10",
                            error && "text-destructive"
                        )}
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}

                {/* Input date natif — toujours interactif, pas de couche par-dessus */}
                <input
                    id={inputId}
                    type="date"
                    value={normalizedValue}
                    min={min}
                    max={max}
                    disabled={disabled}
                    required={required}
                    onChange={onChange}
                    className={cn(
                        "w-full px-3 bg-background border border-input rounded-xl shadow-sm",
                        "text-sm font-medium text-foreground cursor-pointer",
                        "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-150",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        // Hauteur : plus grande si on a un label flottant
                        label ? "h-14 pt-6 pb-2" : "h-10",
                        error && "border-destructive focus:ring-destructive/20",
                        !normalizedValue && "text-muted-foreground",
                        className
                    )}
                />
            </div>

            {/* Message d'aide ou d'erreur */}
            {helperText && (
                <p className={cn(
                    "mt-1.5 text-xs px-3",
                    error ? "text-destructive" : "text-muted-foreground"
                )}>
                    {helperText}
                </p>
            )}
        </div>
    );
}
