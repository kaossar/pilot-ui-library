# Generic UI Component Library

A reusable, theme-agnostic UI component library built with React, Tailwind CSS, and Radix UI.

## 🎯 Philosophy

This library is designed to be **completely generic** and **theme-agnostic**. All styling is controlled via CSS variables, making it easy to:
- Use in multiple projects with different brands
- Switch themes dynamically
- Customize colors without touching component code

# Generic UI Component Library

A reusable, theme-agnostic UI component library built with React, Tailwind CSS, and Radix UI.

## 🎯 Philosophy

This library is designed to be **completely generic** and **theme-agnostic**. All styling is controlled via CSS variables, making it easy to:
- Use in multiple projects with different brands
- Switch themes dynamically
- Customize colors without touching component code

## 🚀 Quick Start

### Installation

This library is currently used as a local package. To use it in your project:

1. Install dependencies in the ui-library folder:
```bash
cd ui-library
npm install
```

2. Import components in your project:
```javascript
import { Button, Card, Input } from './ui-library/src';
```

3. Import the base styles:
```javascript
import './ui-library/src/styles/index.css';
```

### Theming

All colors are defined via CSS variables. Create your theme in your project's CSS file:

```css
/* In your project's CSS (e.g., frontend/src/index.css) */
:root {
  --primary: 220 100% 50%;              /* Your brand primary color */
  --primary-foreground: 0 0% 100%;
  --secondary: 220 100% 13%;
  --accent: 142 71% 45%;
  --destructive: 0 84% 60%;
  --success: 142 71% 45%;
  --warning: 38 92% 50%;
  --radius: 1.25rem;                    /* Border radius */
  /* ... etc */
}
```
2. Import the ui-library base styles:
```javascript
import '../ui-library/src/styles/index.css';
```

3. Your theme will automatically override the defaults!

## 📁 Structure

```
ui-library/
├── src/
│   ├── components/
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── badge.jsx
│   │   ├── avatar.jsx
│   │   └── tooltip.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── styles/
│   │   └── index.css          ← Neutral default theme
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Usage Examples

### Button
```jsx
import { Button } from './ui-library/src';

<Button variant="primary" size="lg">
  Click me
</Button>

<Button variant="destructive" loading>
  Deleting...
</Button>
```

### Card
```jsx
import { Card, CardHeader, CardTitle, CardContent } from './ui-library/src';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

### Input
```jsx
import { Input } from './ui-library/src';
import { Search } from 'lucide-react';

<Input 
  prefix={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>
```

## 🌈 Theme Variables Reference

Required CSS variables for theming:

```css
:root {
  /* Colors (in HSL format without 'hsl()') */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 220 100% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 100% 13%;
  --secondary-foreground: 0 0% 100%;
  --accent: 142 71% 45%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 142 71% 45%;
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 100%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 220 100% 50%;
  
  /* Border radius */
  --radius: 0.5rem;
}
```

## 📝 License

MIT - Feel free to use in any project

## 🤝 Contributing

This is a generic library. When adding components:
1. Use CSS variables for all colors
2. Avoid hardcoded brand-specific values
3. Follow the existing component patterns
4. Document usage examples
