import React, { useState, useMemo, useEffect } from 'react';
import { 
    format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
    addDays, isSameMonth, isSameDay, startOfDay, endOfDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function DateRangeCalendar({ 
    mode = 'week', 
    onModeChange, 
    value = { start: null, end: null }, 
    onChange,
    className
}) {
    // Affichage actuel du calendrier (mois visible)
    const [viewDate, setViewDate] = useState(() => value.start || new Date());
    
    // Pour le mode custom, gérer la sélection en 2 temps (start puis end)
    const [customSelectionStart, setCustomSelectionStart] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);

    // Reset viewDate quand la valeur externe change de mois
    useEffect(() => {
        if (value.start) {
            setViewDate(value.start);
            setCustomSelectionStart(null);
        }
    }, [value.start]);

    // Helpers navigation mois
    const nextMonth = () => setViewDate(addMonths(viewDate, 1));
    const prevMonth = () => setViewDate(subMonths(viewDate, 1));

    // Construction de la grille du calendrier
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(viewDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = useMemo(() => {
        const days = [];
        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    }, [startDate, endDate]);

    // Gestion du survol (Hover) pour le feedback visuel
    const getHoverClasses = (day) => {
        if (!hoverDate) return '';
        
        if (mode === 'day') {
            return isSameDay(day, hoverDate) ? 'bg-primary/20' : '';
        }
        if (mode === 'week') {
            const hStart = startOfWeek(hoverDate, { weekStartsOn: 1 });
            const hEnd = endOfWeek(hoverDate, { weekStartsOn: 1 });
            if (day >= hStart && day <= hEnd) return 'bg-primary/20';
        }
        if (mode === '14d') {
            const hStart = startOfWeek(hoverDate, { weekStartsOn: 1 });
            const hEnd = endOfDay(addDays(hStart, 13));
            if (day >= hStart && day <= hEnd) return 'bg-primary/20';
        }
        if (mode === 'month') {
            const hStart = startOfMonth(hoverDate);
            const hEnd = endOfMonth(hoverDate);
            if (day >= hStart && day <= hEnd) return 'bg-primary/20';
        }
        if (mode === 'custom' && customSelectionStart) {
            const start = customSelectionStart < hoverDate ? customSelectionStart : hoverDate;
            const end = customSelectionStart < hoverDate ? hoverDate : customSelectionStart;
            if (day >= start && day <= end) return 'bg-primary/20';
        }
        return '';
    };

    // Vérifier si un jour fait partie de la période active officielle ou de la sélection en cours
    const isSelected = (day) => {
        if (mode === 'custom' && customSelectionStart) {
            return isSameDay(day, customSelectionStart);
        }
        if (!value.start || !value.end) return false;
        return day >= startOfDay(value.start) && day <= endOfDay(value.end);
    };

    const handleDayClick = (day) => {
        if (mode === 'day') {
            onChange?.({ start: startOfDay(day), end: endOfDay(day) }, 'day');
        } 
        else if (mode === 'week') {
            onChange?.({ start: startOfWeek(day, { weekStartsOn: 1 }), end: endOfWeek(day, { weekStartsOn: 1 }) }, 'week');
        } 
        else if (mode === '14d') {
            const start = startOfWeek(day, { weekStartsOn: 1 });
            const end = endOfDay(addDays(start, 13));
            onChange?.({ start, end }, '14d');
        }
        else if (mode === 'month') {
            onChange?.({ start: startOfMonth(day), end: endOfMonth(day) }, 'month');
        } 
        else if (mode === 'custom') {
            if (!customSelectionStart) {
                // Etape 1: sélection du début
                setCustomSelectionStart(day);
            } else {
                // Etape 2: sélection de la fin
                const start = customSelectionStart < day ? customSelectionStart : day;
                const end = customSelectionStart < day ? day : customSelectionStart;
                onChange?.({ start: startOfDay(start), end: endOfDay(end) }, 'custom');
                setCustomSelectionStart(null);
            }
        }
    };

    const handleModeSwitch = (newMode) => {
        onModeChange?.(newMode);
        setCustomSelectionStart(null);
    };

    // Titre dynamique dans le sélecteur
    const calendarTitle = format(viewDate, 'MMMM yyyy', { locale: fr });

    return (
        <div className={cn("w-80 bg-card border border-border rounded-xl shadow-sm overflow-hidden", className)}>
            {/* Tabs des Modes */}
            {onModeChange && (
                <div className="flex flex-wrap items-center justify-between p-1 gap-1 border-b border-border bg-muted/20">
                    {Object.entries({
                        day: 'Jour',
                        week: 'Sem.',
                        '14d': '14 J.',
                        month: 'Mois',
                        custom: 'Perso.',
                    }).map(([m, label]) => (
                        <button
                             type="button"
                             key={m}
                             onClick={() => handleModeSwitch(m)}
                             className={cn(
                                 "flex-1 px-1.5 py-1 text-[10px] font-bold rounded-md transition-all text-center whitespace-nowrap",
                                 mode === m 
                                     ? "bg-background shadow-sm text-primary ring-1 ring-border" 
                                     : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                             )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* En-tête Calendrier (Mois/Année) */}
            <div className="flex items-center justify-between px-4 py-3">
                <button type="button" onClick={prevMonth} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-bold capitalize text-foreground">
                    {calendarTitle}
                </span>
                <button type="button" onClick={nextMonth} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Jours de la semaine (L M M J V S D) */}
            <div className="grid grid-cols-7 gap-1 px-4 mb-2">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={i} className="text-center text-[10px] font-bold text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grille des jours */}
            <div 
                className="grid grid-cols-7 gap-y-1 gap-x-0 px-4 pb-4"
                onMouseLeave={() => setHoverDate(null)}
            >
                {calendarDays.map((day) => {
                    const isCurrentMonth = isSameMonth(day, viewDate);
                    const selected = isSelected(day);
                    const hoverClasses = getHoverClasses(day);
                    const isToday = isSameDay(day, new Date());

                    // Highlight styles pour la période sélectionnée
                    let selectionStyle = '';
                    if (selected) {
                        let isStart = false;
                        let isEnd = false;
                        
                        if (mode === 'custom' && customSelectionStart) {
                            isStart = isSameDay(day, customSelectionStart);
                            isEnd = isSameDay(day, customSelectionStart);
                        } else {
                            isStart = value.start && isSameDay(day, value.start);
                            isEnd = value.end && isSameDay(day, value.end);
                        }
                        
                        if (mode === 'day' || (mode === 'custom' && customSelectionStart)) {
                            selectionStyle = 'bg-primary text-primary-foreground font-bold shadow-sm rounded-md';
                        } else {
                            selectionStyle = 'bg-primary/10 text-primary font-semibold';
                            if (isStart && isEnd) selectionStyle = 'bg-primary text-primary-foreground font-bold shadow-sm rounded-md';
                            else if (isStart) selectionStyle += ' bg-primary text-primary-foreground font-bold rounded-l-md';
                            else if (isEnd) selectionStyle += ' bg-primary text-primary-foreground font-bold rounded-r-md';
                        }
                    } else {
                        selectionStyle = 'rounded-md text-foreground hover:bg-muted';
                        if (!isCurrentMonth) selectionStyle = 'text-muted-foreground/40 rounded-md';
                    }

                    const todayMarker = isToday && !selected ? 'ring-1 ring-primary/50 text-primary font-bold' : '';

                    return (
                        <button
                            type="button"
                            key={day.toISOString()}
                            onMouseEnter={() => setHoverDate(day)}
                            onClick={() => handleDayClick(day)}
                            className={cn(
                                "h-8 flex items-center justify-center text-xs transition-colors",
                                selectionStyle,
                                hoverClasses && !selected && (hoverClasses + (mode === 'day' ? ' rounded-md' : '')),
                                todayMarker
                            )}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
            
            {mode === 'custom' && (
                <div className="px-4 py-3 border-t border-border bg-muted/10 text-xs text-center text-muted-foreground font-medium">
                    {customSelectionStart 
                        ? "Sélectionnez la date de fin..." 
                        : "Sélectionnez la date de début..."}
                </div>
            )}
        </div>
    );
}
