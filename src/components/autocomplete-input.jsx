import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils.js';

/**
 * AutocompleteInput - Generic autocomplete input component
 * 
 * @param {Object} props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Callback when value changes
 * @param {string} props.placeholder - Input placeholder text
 * @param {React.ReactNode} props.icon - Icon component to display (optional)
 * @param {Function} props.fetchSuggestions - Async function to fetch suggestions
 * @param {number} props.debounceMs - Debounce delay in milliseconds (default: 300)
 * @param {number} props.minChars - Minimum characters before fetching (default: 2)
 * @param {string} props.className - Additional CSS classes
 */
export const AutocompleteInput = ({
    value,
    onChange,
    placeholder,
    icon: Icon,
    fetchSuggestions,
    debounceMs = 300,
    minChars = 2,
    className
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch suggestions with debounce
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.length < minChars) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        debounceRef.current = setTimeout(async () => {
            try {
                const results = await fetchSuggestions(value);
                setSuggestions(results);
                setIsOpen(results.length > 0);
                setHighlightedIndex(-1);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, debounceMs);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [value, fetchSuggestions, debounceMs, minChars]);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!isOpen || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelect(suggestions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
            )}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (suggestions.length > 0) setIsOpen(true);
                }}
                placeholder={placeholder}
                className={cn(
                    "w-full h-11 sm:h-12 rounded-lg border-2 border-slate-200",
                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none",
                    "transition-all text-sm sm:text-base",
                    Icon ? "pl-9 sm:pl-10 pr-10" : "px-4",
                    className
                )}
                autoComplete="off"
            />
            {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
            )}

            {/* Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((option, index) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={cn(
                                "w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors",
                                "border-b border-slate-100 last:border-b-0",
                                index === highlightedIndex && "bg-blue-50"
                            )}
                        >
                            <div className="font-medium text-slate-900 text-sm">
                                {option.label}
                            </div>
                            {option.subtitle && (
                                <div className="text-xs text-slate-500 mt-0.5">
                                    {option.subtitle}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
