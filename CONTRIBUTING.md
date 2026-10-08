# Guide de Contribution - Gouvernance des Dépendances (PILOT)

Afin de préserver la stabilité, la sécurité (SOC2) et d'éviter les bugs de rendu complexes (duplication de framework comme React), l'écosystème PILOT applique une politique stricte de gestion des dépendances critiques.

---

## 1. Les Dépendances Critiques

Les dépendances critiques de l'organisation comprennent :
* **Rendu & UI** : `react`, `react-dom`, `next`
* **Compilation & Langage** : `typescript`, `vite`
* **Contrôle Qualité & Tests** : `eslint`, `vitest`, `playwright`

---

## 2. Règle d'Alignement Strict

1. **Applications (frontend, main-courante, etc.)** :
   * Les versions de `react` et `react-dom` doivent être fixées de manière **exacte** (ex: `19.2.4`) dans tous les fichiers `package.json` applicatifs.
   * Aucune plage sémantique (comme `^` ou `~`) n'est tolérée pour ces dépendances critiques.

2. **Bibliothèques partagées (pilot-ui-library, etc.)** :
   * Les versions de `react` et `react-dom` doivent être déclarées uniquement dans les `peerDependencies` sous forme de plage de compatibilité majeure (ex: `^19.0.0` ou `>=19 <20`).
   * Il est interdit de verrouiller une version de patch exacte sur une peerDependency.

---

## 3. Matrice de Compatibilité Technologique

Voici la matrice de référence pour les composants clés de la stack PILOT :

| Composant | Version cible | Méthode de validation | Niveau de criticité |
| :--- | :--- | :--- | :--- |
| **React** | `19.2.4` | Build + smoke tests | Niveau 1 (Strict) |
| **React DOM** | `19.2.4` | Build + smoke tests | Niveau 1 (Strict) |
| **Next.js** | `16.x` | Compatibilité officielle | Niveau 1 (Strict) |
| **TypeScript** | `5.9.x` | Compilation statique | Niveau 1 (Strict) |
| **Vite** | Version actuelle | Validation locale / Build | Niveau 2 (Important) |
| **Vitest / Jest** | Version actuelle | Tests automatisés | Niveau 2 (Important) |
| **Storybook** | Version actuelle | Vérification UI | Niveau 2 (Important) |

---

## 4. Validation et Contrôle en CI/CD

Chaque dépôt de l'écosystème PILOT intègre de manière bloquante dans son pipeline de CI/CD :
1. La vérification de la conformité statique du `package.json` par rapport aux standards de l'ingénierie :
   ```bash
   node ../pilot-engineering/bin/cli.js
   ```
2. La vérification physique de l'arborescence installée de `node_modules` pour interdire tout doublon physique :
   ```bash
   npm ls react react-dom --all
   ```

### 🚫 Règle de Non-Bipolarisation des Dépendances (`--legacy-peer-deps`)
* L'utilisation de `--legacy-peer-deps` est **strictement interdite** aussi bien en local qu'en CI.
* Tout conflit de `peerDependencies` doit être résolu à la source dans le fichier `package.json` du projet ou de la bibliothèque concernée.
* Les installations en CI doivent utiliser exclusivement `npm ci`.

---

## 5. Processus de Revue des Dépendances Critiques (Review Board)

Toute montée de version majeure ou évolution d'une dépendance critique ne doit **jamais** être réalisée de manière isolée dans un sous-projet. Elle doit faire l'objet d'un processus formel :
1. **Ouverture d'une RFC** (Request For Comments) technique décrivant le changement et l'impact.
2. **Approbation obligatoire** par au moins :
   * **1 Tech Lead / Principal Engineer**
   * **1 Senior Engineer** du domaine concerné.
3. **Synchronisation** de la Pull Request sur l'ensemble des dépôts de l'écosystème avec mise à jour du paquet central `@pilot/dependency-policy`.

---

## 6. Stratégie de Rollback (Plan de Secours)

En cas d'incident critique lié à une dépendance ou à une migration (ex: régression majeure après montée de version de React 19) :
1. **Rétablir le tag git stable précédent** sur la branche `main` du dépôt applicatif concerné.
2. **Forcer une réinstallation propre** via le fichier `package-lock.json` immuable avec `npm ci` (garantissant l'état exact antérieur).
3. En cas de défaut de la librairie partagée : **republier immédiatement la dernière version stable de `pilot-ui-library`** et mettre à jour le `package.json` de l'application.
4. **Désactiver temporairement Renovate** pour la stack concernée (ex: `react-stack`) le temps de la résolution.
