import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { DateRangeCalendar } from './date-range-calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function DateRangePicker({
    mode = 'week',
    onModeChange,
    value = { start: null, end: null },
    onChange,
    placeholder = "Sélectionner une période",
    className,
    align = "start"
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (newValue, triggerMode) => {
        onChange?.(newValue, triggerMode);
        if (triggerMode !== 'custom') {
            setIsOpen(false);
        } else {
            // En mode custom, on ferme la popover quand les DEUX dates sont sélectionnées
            // Notre composant DateRangeCalendar renvoie onChange uniquement quand les 2 sont là.
            setIsOpen(false);
        }
    };

    // Génération du label dynamique selon le mode et les dates
    const getDisplayLabel = () => {
        if (!value.start || !value.end) return placeholder;

        if (mode === 'day') {
            return format(value.start, "EEEE d MMMM yyyy", { locale: fr });
        }
        if (mode === 'month') {
            return format(value.start, "MMMM yyyy", { locale: fr });
        }
        
        // week & custom
        const sameMonth = value.start.getMonth() === value.end.getMonth();
        if (sameMonth) {
            return `${format(value.start, 'd')} au ${format(value.end, "d MMMM yyyy", { locale: fr })}`;
        }
        return `${format(value.start, "d MMM", { locale: fr })} au ${format(value.end, "d MMM yyyy", { locale: fr })}`;
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button 
                    className={cn(
                        "flex items-center gap-3 min-w-[260px] justify-between px-4 py-2 bg-card border border-border rounded-lg shadow-sm hover:border-primary/50 hover:bg-muted/30 transition-all text-sm font-semibold text-foreground group",
                        className
                    )}
                >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <CalendarIcon size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                        <span className="capitalize truncate min-w-0">{getDisplayLabel()}</span>
                    </div>
                    {onModeChange && (
                        <span className="text-xs text-muted-foreground font-normal bg-muted px-1.5 py-0.5 rounded">
                            {mode === 'month' ? 'Mois' : 'Personnalisé'}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={align}>
                <DateRangeCalendar
                    mode={mode}
                    onModeChange={onModeChange}
                    value={value}
                    onChange={handleChange}
                    className="border-0 shadow-none"
                />
            </PopoverContent>
        </Popover>
    );
}
