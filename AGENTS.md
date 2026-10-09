<!-- PILOT UI Library Agent Governance -->
# PILOT UI Library — Référentiel Obligatoire pour Agents IA

> **OBLIGATION ABSOLUE :**
> Lire [CONTRIBUTING.md](./CONTRIBUTING.md) et [../pilot-docs/rules.md](../pilot-docs/rules.md) avant toute intervention sur cette bibliothèque.
> `pilot-ui-library` est le design system officiel et partagé de l'écosystème PILOT (React 19 + Tailwind CSS).

---

## Règles d'Architecture & NO-GO (Violations = Rejet Automatique)

1. **Zéro Appel Réseau** : Interdiction absolue d'importer `fetch`, `axios`, `@supabase/*` ou d'effectuer la moindre requête HTTP. Les composants sont 100 % présentationnels.
2. **Zéro Dépendance Applicative** : La bibliothèque ne doit JAMAIS importer du code de `pilot-frontend`, `pilot-backend` ou `pilot-mobile`. Elle est complètement autonome.
3. **Thème Tactique Exclusif** : Zéro couleur hexadécimale brute codée en dur. Utiliser exclusivement les tokens de couleurs et classes Tailwind définis dans `tailwind.config.js` (palette tactique, kaki `#4A5C2A`, contrastes élevés).
4. **Accessibilité Réglementaire (WCAG AA)** :
   - Tous les éléments interactifs (`Button`, `Modal`, `Input`, `Dropdown`) doivent avoir des attributs `aria-*` explicites.
   - Gestion stricte du focus clavier (`focus-visible:ring-2`) et piège de focus sur les modales.
5. **Propriétés Immutables & Typage** : Les props de composants doivent être explicitement typées avec des interfaces TypeScript ou des PropTypes stricts sans `any`.
6. **Langue des Commentaires** : 100 % des commentaires et de la documentation JSDoc rédigés en français.

---

## Commandes de Vérification
```bash
npm run build        # Compilation des composants sans erreur
```
