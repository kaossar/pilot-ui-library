import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { cn } from '../lib/utils';

/**
 * MultiSelect Component with Optional Integrated Label
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of {value, label} objects
 * @param {Array} props.value - Array of selected values
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} [props.placeholder] - Placeholder text
 * @param {Function} [props.renderOption] - Custom option renderer
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.helperText] - Optional helper/error text
 * @param {boolean} [props.required] - Mark field as required
 * @param {boolean} [props.error] - Error state
 * 
 * @example
 * // Classic usage (backward compatible)
 * <MultiSelect 
 *   options={[{value: '1', label: 'Option 1'}]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * 
 * // Modern usage with integrated label
 * <MultiSelect 
 *   label="Select Tags"
 *   options={tags}
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   required
 * />
 */
export const MultiSelect = ({
    options = [],
    value = [],
    onChange,
    placeholder = "Sélectionner...",
    renderOption = null,
    className = "",
    label,
    helperText,
    required,
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const selectId = useRef(Math.random().toString(36).substr(2, 9)).current;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const toggleOption = (optionValue) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    };

    const getDisplayText = () => {
        if (value.length === 0) return placeholder;
        if (value.length === 1) {
            const selected = options.find(opt => opt.value === value[0]);
            return selected?.label || value[0];
        }
        return `${value.length} sélectionné${value.length > 1 ? 's' : ''}`;
    };

    const selectComponent = (
        <div ref={containerRef} className={cn("relative", !label && className)}>
            {/* Trigger button */}
            <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full justify-between font-normal",
                    error && "border-destructive focus:ring-destructive"
                )}
            >
                <span className={value.length === 0 ? 'text-slate-400' : 'text-slate-900'}>
                    {getDisplayText()}
                </span>
                <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </Button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => {
                        const isSelected = value.includes(option.value);
                        return (
                            <div
                                key={option.value}
                                onClick={() => toggleOption(option.value)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors",
                                    isSelected && "bg-blue-50"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 border rounded flex items-center justify-center shrink-0",
                                    isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300"
                                )}>
                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {renderOption ? renderOption(option) : (
                                        <span className="text-sm">{option.label}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

    // If no label, render classic multi-select
    if (!label) {
        return selectComponent;
    }

    // Modern multi-select with integrated label
    return (
        <div className={cn("w-full", className)}>
            <label htmlFor={selectId} className="text-sm font-medium leading-none mb-2 block">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </label>
            {selectComponent}
            {helperText && (
                <p className={cn(
                    "mt-1.5 text-xs px-1",
                    error ? "text-destructive" : "text-muted-foreground"
                )}>
                    {helperText}
                </p>
            )}
        </div>
    );
};
