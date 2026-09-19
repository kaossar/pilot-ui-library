import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapPin, Loader } from 'lucide-react';
import { Input } from './input';
import { Card } from './card';
import { cn } from '../lib/utils';

/**
 * AddressAutocomplete - Complete address form with autocomplete
 * 
 * Features:
 * - Address autocomplete using api-adresse.data.gouv.fr
 * - Automatic filling of postal code and city
 * - Returns structured address data with coordinates
 * - Customizable layout (inline or stacked)
 * 
 * @param {string} addressValue - Controlled value for address input
 * @param {string} postalCodeValue - Controlled value for postal code input
 * @param {string} cityValue - Controlled value for city input
 * @param {string} latitudeValue - Controlled value for latitude input
 * @param {string} longitudeValue - Controlled value for longitude input
 * @param {function} onAddressChange - Callback when address changes
 * @param {function} onPostalCodeChange - Callback when postal code changes
 * @param {function} onCityChange - Callback when city changes
 * @param {function} onLatitudeChange - Callback when latitude changes
 * @param {function} onLongitudeChange - Callback when longitude changes
 * @param {function} onSelect - Callback when address is selected (returns full data)
 * @param {boolean} showCoordinates - Show latitude/longitude fields (default: false)
 * @param {boolean} includeCoordinates - Include lat/long in onSelect result (default: true)
 * @param {string} layout - Layout mode: 'inline' or 'stacked' (default: 'stacked')
 * @param {boolean} required - Mark fields as required
 * @param {boolean} disabled - Disable all inputs
 */
export const AddressAutocompleteField = ({
    addressValue = '',
    postalCodeValue = '',
    cityValue = '',
    latitudeValue = '',
    longitudeValue = '',
    onAddressChange,
    onPostalCodeChange,
    onCityChange,
    onLatitudeChange,
    onLongitudeChange,
    onSelect,
    showCoordinates = false,
    includeCoordinates = true,
    layout = 'stacked',
    required = false,
    disabled = false
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async (input) => {
        onAddressChange?.(input);

        if (input.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(input)}&limit=5`
            );
            setSuggestions(data.features);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Address API error:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (feature) => {
        const { label, name, postcode, city, context } = feature.properties;
        const [longitude, latitude] = feature.geometry.coordinates;

        console.log('🔍 API Data:', { label, name, postcode, city });

        // API already provides 'name' with street address only (e.g., "45 Rue Judaïque")
        // No need to extract from label
        const streetAddress = name;

        console.log('📍 Street address:', streetAddress);

        // Update all fields
        onAddressChange?.(streetAddress);
        onPostalCodeChange?.(postcode || '');
        onCityChange?.(city || '');
        if (showCoordinates) {
            onLatitudeChange?.(latitude?.toString() || '');
            onLongitudeChange?.(longitude?.toString() || '');
        }
        setShowSuggestions(false);

        const result = {
            address: streetAddress, // Street + Number only
            postalCode: postcode,
            city: city,
            fullAddress: label,
            context: context
        };

        if (includeCoordinates) {
            result.latitude = latitude;
            result.longitude = longitude;
        }

        onSelect?.(result);
    };

    return (
        <div ref={wrapperRef} className="space-y-4">
            {/* Address field with autocomplete */}
            <div className="relative">
                <Input
                    label="Adresse"
                    type="text"
                    value={addressValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => addressValue.length >= 3 && setShowSuggestions(true)}
                    placeholder="Rechercher une adresse..." // Sert aussi pour le label flottant si vide ? Non, Input gère ça.
                    autoComplete="off"
                    required={required}
                    disabled={disabled}
                    prefix={loading ? <Loader className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                />

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
                        {suggestions.map((feature) => (
                            <div
                                key={feature.properties.id}
                                onClick={() => handleSelect(feature)}
                                className="px-4 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
                            >
                                <div className="font-medium text-slate-800 text-sm">
                                    {feature.properties.label}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {feature.properties.context}
                                </div>
                            </div>
                        ))}
                    </Card>
                )}
            </div>

            {/* Postal Code and City fields */}
            <div className={cn(
                "grid gap-4",
                layout === 'inline' ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
            )}>
                <div>
                    <Input
                        label="Code postal"
                        id="postalCode"
                        type="text"
                        value={postalCodeValue}
                        onChange={(e) => onPostalCodeChange?.(e.target.value)}
                        placeholder="75001"
                        required={required}
                        disabled={disabled}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Input
                        label="Ville"
                        id="city"
                        type="text"
                        value={cityValue}
                        onChange={(e) => onCityChange?.(e.target.value)}
                        placeholder="Paris"
                        required={required}
                        disabled={disabled}
                        className="mt-1"
                    />
                </div>
            </div>

            {/* Optional Coordinates fields */}
            {showCoordinates && (
                <div className={cn(
                    "grid gap-4",
                    layout === 'inline' ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
                )}>
                    <div>
                        <Input
                            label="Latitude"
                            id="latitude"
                            type="number"
                            step="any"
                            value={latitudeValue}
                            onChange={(e) => onLatitudeChange?.(e.target.value)}
                            placeholder="48.8566"
                            disabled={disabled}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Input
                            label="Longitude"
                            id="longitude"
                            type="number"
                            step="any"
                            value={longitudeValue}
                            onChange={(e) => onLongitudeChange?.(e.target.value)}
                            placeholder="2.3522"
                            disabled={disabled}
                            className="mt-1"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
