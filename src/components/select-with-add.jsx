import * as React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select.jsx';

/**
 * SelectWithAdd — Liste déroulante avec bouton "+" intégré visuellement
 *
 * Le sélecteur et le bouton d'ajout forment une seule unité visuelle cohérente.
 * Le "+" est attaché à la droite du select, séparé par un diviseur vertical,
 * le tout dans le même conteneur avec une seule bordure.
 *
 * IMPORTANT : Utilise les primitives Radix directement (pas SelectField)
 * pour garder le contrôle total du layout flex.
 *
 * @param {Object}          props
 * @param {string}          props.value             - Valeur sélectionnée
 * @param {function}        props.onValueChange     - Callback de changement de valeur
 * @param {React.ReactNode} props.children          - Les <SelectItem> enfants
 * @param {function}        [props.onAdd]           - Callback du bouton "+"
 * @param {string}          [props.addTooltip]      - Tooltip du bouton "+"
 * @param {boolean}         [props.showAdd=true]    - Afficher ou non le bouton "+"
 * @param {string}          [props.className]       - Classes sur le conteneur externe
 * @param {string}          [props.triggerClassName] - Classes sur le SelectTrigger
 * @param {string}          [props.placeholder]     - Placeholder du select
 * @param {boolean}         [props.disabled]        - Désactiver le composant
 *
 * @example
 * <SelectWithAdd
 *   value={siteId}
 *   onValueChange={(v) => setSiteId(v)}
 *   onAdd={() => setOpenCreateSite(true)}
 *   addTooltip="Créer un nouveau site"
 * >
 *   <SelectItem value="none">-- Sélectionner --</SelectItem>
 *   {sites.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
 * </SelectWithAdd>
 */
const SelectWithAdd = React.forwardRef(
    (
        {
            value,
            onValueChange,
            children,
            onAdd,
            addTooltip = 'Ajouter',
            showAdd = true,
            className,
            triggerClassName,
            placeholder = ' ',
            disabled = false,
            ...props
        },
        ref
    ) => {
        const hasAdd = showAdd && !!onAdd;
        // Valeur sécurisée : Radix Select n'accepte pas la chaîne vide
        const safeValue = value === '' ? undefined : value;

        return (
            <div
                ref={ref}
                className={cn(
                    // Conteneur unique — une seule bordure pour les deux éléments
                    'flex items-stretch h-10 w-full',
                    'rounded-xl border border-input bg-background shadow-sm',
                    'focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring/50',
                    'transition-all duration-150',
                    disabled && 'opacity-50 pointer-events-none',
                    className
                )}
            >
                {/* Select Radix — prend tout l'espace disponible */}
                <Select
                    value={safeValue}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    {...props}
                >
                    <SelectTrigger
                        className={cn(
                            // Annule les styles de bordure/fond — le conteneur parent les gère
                            'flex-1 border-0 shadow-none bg-transparent',
                            'rounded-none focus:ring-0 focus:ring-offset-0',
                            'h-full min-h-0 py-0',
                            // Arrondi seulement côté gauche
                            hasAdd ? 'rounded-l-xl rounded-r-none' : 'rounded-xl',
                            triggerClassName
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent position="popper" side="bottom" className="max-h-[300px]">
                        {children}
                    </SelectContent>
                </Select>

                {/* Bouton "+" — intégré dans le même conteneur */}
                {hasAdd && (
                    <>
                        {/* Séparateur vertical */}
                        <div className="w-px bg-border self-stretch flex-shrink-0" />

                        {/* Bouton + */}
                        <button
                            type="button"
                            title={addTooltip}
                            disabled={disabled}
                            onClick={onAdd}
                            className={cn(
                                'flex items-center justify-center flex-shrink-0',
                                'w-10 h-full',
                                // Arrondi seulement côté droit
                                'rounded-r-xl rounded-l-none',
                                'text-primary bg-transparent',
                                'hover:bg-primary/5',
                                'active:scale-95 transition-all duration-150',
                                'focus-visible:outline-none',
                                'disabled:pointer-events-none disabled:opacity-40'
                            )}
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>
        );
    }
);

SelectWithAdd.displayName = 'SelectWithAdd';

export { SelectWithAdd, SelectItem };
