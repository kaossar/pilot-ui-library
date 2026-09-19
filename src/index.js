// Base UI Components - ONLY components that actually exist
export * from './components/button.jsx';
export * from './components/input.jsx';
export * from './components/label.jsx';
export * from './components/textarea.jsx';
export * from './components/select.jsx';
export * from './components/select-field.jsx';
export * from './components/checkbox.jsx';
export * from './components/switch.jsx';
export * from './components/radio-group.jsx';
export * from './components/radio-group-field.jsx';
export * from './components/multi-select.jsx';
export * from './components/autocomplete-input.jsx';

// Layout Components
export * from './components/card.jsx';
export * from './components/separator.jsx';
export * from './components/tabs.jsx';

// Feedback Components
export * from './components/alert.jsx';
export * from './components/badge.jsx';
export * from './components/status-badge.jsx';
export * from './components/skeleton.jsx';
export * from './components/tooltip.jsx';

// ── Composants Fondamentaux V1 (Go-Live 15/07/2026) ──────────────────────────
// Ces composants sont obligatoires sur tous les écrans du SaaS (Definition of Done)
export * from './components/empty-state.jsx';      // États vides — listes sans données
export * from './components/page-loader.jsx';      // États de chargement — remplace "Chargement..."
export * from './components/api-error-state.jsx';  // États d'erreur — remplace console.error()
export * from './components/toast.jsx';            // Notifications — useToast() + ToastProvider

// Overlay Components
export * from './components/dialog.jsx';
export * from './components/sheet.jsx';

export * from './components/confirm-dialog.jsx';
export * from './components/dropdown-menu.jsx';
export * from './components/popover.jsx';

// Data Display
export * from './components/table.jsx';
export * from './components/avatar.jsx';

// Specialized Components
export * from './components/add-button.jsx';
export * from './components/select-with-add.jsx';
export * from './components/AddressAutocomplete.jsx';
export * from './components/AddressAutocompleteField.jsx';
export * from './components/icons.jsx';
export * from './components/toggle.jsx';
export * from './components/ClientStatusBadge.jsx';
export * from './components/date-range-calendar.jsx';
export * from './components/date-range-picker.jsx';

// Utilities
export { cn } from './lib/utils.js';
export * from './components/date-picker.jsx';
