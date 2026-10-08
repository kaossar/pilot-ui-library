import * as React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * AddButton — Bouton d'ajout compact avec icône "+"
 *
 * Conçu pour s'associer à des sélecteurs (SitePicker, ClientPicker, etc.)
 * en respectant exactement la même hauteur que les champs standards (h-10).
 *
 * @param {Object}   props
 * @param {function} props.onClick       - Callback au clic
 * @param {string}   [props.tooltip]     - Texte du title (accessibilité)
 * @param {string}   [props.className]   - Classes supplémentaires
 * @param {string}   [props.size="md"]   - "sm" (h-8 w-8) | "md" (h-10 w-10) | "lg" (h-12 w-12)
 * @param {boolean}  [props.disabled]    - Désactiver le bouton
 *
 * @example
 * <AddButton onClick={() => setOpen(true)} tooltip="Créer un nouveau site" />
 */
const sizeMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
};

const iconSizeMap = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
};

const AddButton = React.forwardRef(
    ({ onClick, tooltip, className, size = 'md', disabled = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                title={tooltip}
                disabled={disabled}
                onClick={onClick}
                className={cn(
                    // Base — même hauteur que les champs standards
                    'inline-flex items-center justify-center flex-shrink-0',
                    'rounded-xl border border-dashed',
                    'font-bold transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    'active:scale-95',
                    // Taille
                    sizeMap[size] ?? sizeMap.md,
                    // Couleurs (état normal)
                    'border-primary/30 text-primary bg-transparent',
                    'hover:bg-primary/5 hover:border-primary/50',
                    // Désactivé
                    'disabled:pointer-events-none disabled:opacity-40',
                    className
                )}
                {...props}
            >
                <Plus className={cn(iconSizeMap[size] ?? iconSizeMap.md)} />
            </button>
        );
    }
);

AddButton.displayName = 'AddButton';

export { AddButton };
