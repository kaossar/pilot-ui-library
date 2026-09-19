import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { MapPin, Loader } from 'lucide-react';
import { Input, Card } from '../index.js';

/**
 * Composant d'autocomplétion d'adresse utilisant l'API Adresse (data.gouv.fr)
 * 
 * @param {Object} props
 * @param {string} props.initialValue - Valeur initiale de l'adresse
 * @param {Function} props.onSelect - Callback appelé lors de la sélection d'une adresse
 * @param {boolean} props.includeCoordinates - Si true, retourne aussi lat/long
 * @param {string} props.placeholder - Placeholder de l'input
 * @param {string} props.className - Classes CSS additionnelles
 * @param {string} [props.label] - Label optionnel pour l'input
 * @param {boolean} [props.required] - Si le champ est requis
 */
export const AddressAutocomplete = ({
    initialValue = '',
    onSelect,
    includeCoordinates = false,
    placeholder,
    className = "",
    label,
    required
}) => {
    const { t } = useTranslation();
    const defaultPlaceholder = placeholder || t('common.placeholders.searchAddress');
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Mettre à jour la query si initialValue change (ex: mode édition)
    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    // Fermer les suggestions si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSearch = async (input) => {
        setQuery(input);

        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=5`);
            setSuggestions(data.features);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Erreur API Adresse:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (feature) => {
        const { label, postcode, city, context } = feature.properties;
        const [longitude, latitude] = feature.geometry.coordinates;
        const street = feature.properties.name;

        setQuery(label);
        setShowSuggestions(false);

        const result = {
            address: street, // Rue + Numéro
            postalCode: postcode,
            city: city,
            fullAddress: label,
            context: context
        };

        if (includeCoordinates) {
            result.latitude = latitude;
            result.longitude = longitude;
        }

        if (onSelect) {
            onSelect(result);
        }
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <Input
                label={label}
                required={required}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => query.length >= 3 && setShowSuggestions(true)}
                placeholder={defaultPlaceholder}
                autoComplete="off"
                prefix={loading ? <Loader className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            />

            {showSuggestions && suggestions.length > 0 && (
                <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((feature) => (
                        <div
                            key={feature.properties.id}
                            onClick={() => handleSelect(feature)}
                            className="px-4 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                        >
                            <div className="font-medium text-slate-800 text-sm">
                                {feature.properties.label}
                            </div>
                            <div className="text-xs text-slate-500">
                                {feature.properties.context}
                            </div>
                        </div>
                    ))}
                    <div className="px-2 py-1 bg-slate-50 text-right">
                        <span className="text-[10px] text-slate-400">data.gouv.fr</span>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AddressAutocomplete;
