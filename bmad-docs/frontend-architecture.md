# Font Previewer Frontend Architecture Document

## Table of Contents

- [Introduction](#introduction)
- [Overall Frontend Philosophy & Patterns](#overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](#detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](#component-breakdown--implementation-details)
- [State Management In-Depth](#state-management-in-depth)
- [API Interaction Layer](#api-interaction-layer)
- [Build, Bundling, and Deployment](#build-bundling-and-deployment)
- [Frontend Testing Strategy](#frontend-testing-strategy)
- [Accessibility Implementation Details](#accessibility-implementation-details)
- [Performance Considerations](#performance-considerations)
- [Browser Support](#browser-support)
- [Change Log](#change-log)

---

## Introduction

This document details the frontend architecture for Font Previewer, a client-side SPA for previewing typography and color systems. The application has no backend; all data is stored in the browser's LocalStorage.

- **Link to PRD:** `bmad-docs/prd.md`
- **Link to Project Brief:** `bmad-docs/project-brief.md`

---

## Overall Frontend Philosophy & Patterns

### Framework & Core Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool and dev server |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| Zustand | 4.x | Lightweight state management |
| Lucide React | Latest | Icon library |

### Component Architecture

- **Atomic Design Principles:** Components organized as atoms (Button, Input), molecules (ColorSwatch, FontSelector), organisms (Sidebar, Canvas), templates (AppLayout)
- **Presentational vs Container:** Presentational components receive props; container components connect to Zustand store
- **Composition over Inheritance:** Build complex UI from simple, composable pieces

### State Management Strategy

- **Zustand Store:** Single store with slices for typography, colors, components, variations
- **No prop drilling:** Components access store directly via hooks
- **Derived state:** Computed using selectors to avoid redundant state

### Data Flow

```
User Action → Zustand Action → Store Update → Component Re-render → Canvas Preview
                                    ↓
                              LocalStorage Sync
```

### Styling Approach

- **Tailwind CSS:** Primary styling method using utility classes
- **CSS Variables:** Design tokens exposed as CSS custom properties for component templates
- **Component Classes:** Complex patterns extracted to `@apply` directives in `globals.css`

### Key Design Patterns

- **Provider Pattern:** App-level providers for theme/context if needed
- **Custom Hooks:** `useDesignStore`, `useFontLoader`, `useEyeDropper`, `useLoremIpsum`
- **Render Props / Children:** Flexible component composition
- **Controlled Components:** Form inputs controlled via state

---

## Detailed Frontend Directory Structure

```plaintext
font-previewer/
├── bmad-agent/                    # BMAD methodology agents and templates
├── bmad-docs/                     # Project documentation
│   ├── brainstorming-session-2025-12-22.md
│   ├── project-brief.md
│   ├── prd.md
│   └── frontend-architecture.md
├── public/
│   └── favicon.svg
├── src/
│   ├── components/                # React components
│   │   ├── ui/                    # Base UI atoms (Button, Input, Popover, etc.)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Popover.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   └── index.ts
│   │   ├── layout/                # Layout components
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Canvas.tsx
│   │   │   └── index.ts
│   │   ├── typography/            # Typography configuration components
│   │   │   ├── TypographySection.tsx
│   │   │   ├── TokenRow.tsx
│   │   │   ├── FontSelector.tsx
│   │   │   ├── FontUploader.tsx
│   │   │   └── LoremGenerator.tsx
│   │   ├── colors/                # Color palette components
│   │   │   ├── ColorsSection.tsx
│   │   │   ├── PaletteBuilder.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   ├── TokenAssignment.tsx
│   │   │   └── EyeDropperButton.tsx
│   │   ├── components-select/     # Component selection UI
│   │   │   ├── ComponentsSection.tsx
│   │   │   └── ComponentToggle.tsx
│   │   ├── preview/               # Canvas preview components
│   │   │   ├── PreviewCanvas.tsx
│   │   │   ├── VariationColumn.tsx
│   │   │   ├── ViewToggle.tsx
│   │   │   └── VariationTabs.tsx
│   │   └── templates/             # 14 component templates
│   │       ├── marketing/
│   │       │   ├── Hero.tsx
│   │       │   ├── FeaturesGrid.tsx
│   │       │   ├── Testimonial.tsx
│   │       │   ├── PricingTable.tsx
│   │       │   ├── CtaBanner.tsx
│   │       │   └── Footer.tsx
│   │       ├── content/
│   │       │   ├── ArticleHeader.tsx
│   │       │   ├── ArticleBody.tsx
│   │       │   ├── BlogCard.tsx
│   │       │   └── AuthorBio.tsx
│   │       ├── ui-elements/
│   │       │   ├── Navigation.tsx
│   │       │   ├── ProductCard.tsx
│   │       │   ├── UserProfileCard.tsx
│   │       │   └── FormSection.tsx
│   │       └── index.ts           # Template registry
│   ├── hooks/                     # Custom React hooks
│   │   ├── useFontLoader.ts       # Google Fonts loading logic
│   │   ├── useLocalFont.ts        # Local font file loading
│   │   ├── useEyeDropper.ts       # EyeDropper API wrapper
│   │   ├── useLoremIpsum.ts       # Lorem ipsum generation
│   │   └── useLocalStorage.ts     # LocalStorage sync
│   ├── store/                     # Zustand state management
│   │   ├── useDesignStore.ts      # Main store with all slices
│   │   ├── types.ts               # Store TypeScript interfaces
│   │   └── defaults.ts            # Default state values
│   ├── lib/                       # Utility functions
│   │   ├── fonts.ts               # Font loading utilities
│   │   ├── colors.ts              # Color manipulation utilities
│   │   ├── lorem.ts               # Lorem ipsum generator
│   │   └── storage.ts             # LocalStorage helpers
│   ├── types/                     # Global TypeScript types
│   │   └── index.ts
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── globals.css                # Global styles and Tailwind directives
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

### Notes on Structure

- **templates/**: Each of the 14 preview components is a self-contained file that receives typography and color tokens as props or via context
- **hooks/**: Custom hooks encapsulate complex logic (font loading, API calls) keeping components clean
- **store/**: Single Zustand store file with typed slices; `defaults.ts` contains initial state

---

## Component Breakdown & Implementation Details

### Component Naming & Organization

- **Naming Convention:** PascalCase for files and component names (e.g., `FontSelector.tsx`)
- **Organization:** Feature-based directories under `src/components/`

### Key Component Specifications

#### Component: `AppLayout`

- **Purpose:** Root layout component with Sidebar + Canvas structure
- **Source File:** `src/components/layout/AppLayout.tsx`
- **Props:** None (uses store directly)
- **Key UI Elements:**
```html
<div class="flex h-screen">
  <Sidebar class="w-80 flex-shrink-0" />
  <Canvas class="flex-1 overflow-auto" />
</div>
```

#### Component: `Sidebar`

- **Purpose:** Configuration panel with Typography, Colors, Components sections
- **Source File:** `src/components/layout/Sidebar.tsx`
- **Props:** None
- **Key UI Elements:**
```html
<aside class="w-80 h-full bg-gray-50 border-r overflow-y-auto">
  <header><!-- Logo, Reset button --></header>
  <TypographySection />
  <ColorsSection />
  <ComponentsSection />
  <VariationTabs />
</aside>
```

#### Component: `Canvas`

- **Purpose:** Preview area showing component templates with applied design tokens
- **Source File:** `src/components/layout/Canvas.tsx`
- **Props:** None
- **Key UI Elements:**
```html
<main class="flex-1 bg-white overflow-auto">
  <header><!-- View toggle, variation columns control --></header>
  <div class="grid" style="grid-template-columns: repeat(variationCount, 1fr)">
    {variations.map(v => <VariationColumn key={v.id} variation={v} />)}
  </div>
</main>
```

#### Component: `FontSelector`

- **Purpose:** Searchable dropdown for Google Fonts selection
- **Source File:** `src/components/typography/FontSelector.tsx`
- **Props:**
  | Prop | Type | Required | Default | Description |
  |------|------|----------|---------|-------------|
  | `tokenId` | `TypographyToken` | Yes | - | Which token this selector controls |
  | `value` | `string` | Yes | - | Current font family name |
  | `onChange` | `(font: string) => void` | Yes | - | Callback when font changes |
- **Internal State:**
  | State | Type | Initial | Description |
  |-------|------|---------|-------------|
  | `search` | `string` | `''` | Search query |
  | `isOpen` | `boolean` | `false` | Dropdown open state |
  | `fonts` | `string[]` | `[]` | Filtered font list |

#### Component: `ColorSwatch`

- **Purpose:** Clickable color swatch with picker popover
- **Source File:** `src/components/colors/ColorSwatch.tsx`
- **Props:**
  | Prop | Type | Required | Default | Description |
  |------|------|----------|---------|-------------|
  | `color` | `string` | Yes | - | Hex color value |
  | `onChange` | `(color: string) => void` | Yes | - | Callback when color changes |
  | `onDelete` | `() => void` | No | - | Delete callback (omit if not deletable) |

#### Component: `Hero` (Template)

- **Purpose:** Marketing hero section preview component
- **Source File:** `src/components/templates/marketing/Hero.tsx`
- **Props:**
  | Prop | Type | Required | Description |
  |------|------|----------|-------------|
  | `typography` | `TypographyConfig` | Yes | Typography token values |
  | `colors` | `ColorConfig` | Yes | Color token values |
- **Key UI Elements:**
```html
<section style="background: colors.bgLight; color: colors.text">
  <h1 style="font-family: typography.h1.font">{typography.h1.text}</h1>
  <p style="font-family: typography.p1.font">{typography.p1.text}</p>
  <button style="background: colors.main; color: colors.textInv">Get Started</button>
</section>
```

---

## State Management In-Depth

### Zustand Store Structure

**File:** `src/store/useDesignStore.ts`

```typescript
interface DesignState {
  // Typography
  typography: {
    h1: TokenConfig;
    h2: TokenConfig;
    h3: TokenConfig;
    p1: TokenConfig;
    p2: TokenConfig;
  };

  // Colors
  palette: string[];                    // Array of hex colors
  colorTokens: {
    main: string;
    alt: string;
    bgLight: string;
    bgDark: string;
    text: string;
    textInv: string;
  };

  // Components
  selectedComponents: ComponentId[];    // Array of selected template IDs

  // Variations
  variations: Variation[];              // Array of variation configs
  activeVariationId: string;            // Currently editing variation

  // View
  viewMode: 'grid' | 'fullpage';

  // Actions
  setTypographyToken: (token: TypographyToken, config: Partial<TokenConfig>) => void;
  addPaletteColor: (color: string) => void;
  removePaletteColor: (index: number) => void;
  updatePaletteColor: (index: number, color: string) => void;
  setColorToken: (token: ColorToken, color: string) => void;
  toggleComponent: (componentId: ComponentId) => void;
  addVariation: () => void;
  removeVariation: (id: string) => void;
  setActiveVariation: (id: string) => void;
  updateVariation: (id: string, config: Partial<VariationConfig>) => void;
  setViewMode: (mode: 'grid' | 'fullpage') => void;
  reset: () => void;
}

interface TokenConfig {
  font: string;           // Font family name
  source: 'google' | 'local';
  text: string;           // Custom preview text
  localFontData?: string; // Base64 font data if uploaded
}

interface Variation {
  id: string;
  name: string;
  typography: DesignState['typography'];
  colorTokens: DesignState['colorTokens'];
}
```

### Key Selectors

```typescript
// Get typography config for active variation
const selectActiveTypography = (state) => {
  const active = state.variations.find(v => v.id === state.activeVariationId);
  return active?.typography ?? state.typography;
};

// Get colors for active variation
const selectActiveColors = (state) => {
  const active = state.variations.find(v => v.id === state.activeVariationId);
  return active?.colorTokens ?? state.colorTokens;
};

// Get all fonts that need loading
const selectFontsToLoad = (state) => {
  const fonts = new Set<string>();
  state.variations.forEach(v => {
    Object.values(v.typography).forEach(t => {
      if (t.source === 'google') fonts.add(t.font);
    });
  });
  return Array.from(fonts);
};
```

### LocalStorage Persistence

```typescript
// In store creation
const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      // ... state and actions
    }),
    {
      name: 'font-previewer-state',
      partialize: (state) => ({
        // Exclude functions, only persist data
        typography: state.typography,
        palette: state.palette,
        colorTokens: state.colorTokens,
        selectedComponents: state.selectedComponents,
        variations: state.variations,
        activeVariationId: state.activeVariationId,
        viewMode: state.viewMode,
      }),
    }
  )
);
```

---

## API Interaction Layer

### Google Fonts Integration

**File:** `src/lib/fonts.ts`

```typescript
const GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';

// Fetch font list (cached in memory)
let cachedFonts: string[] | null = null;

export async function fetchGoogleFonts(): Promise<string[]> {
  if (cachedFonts) return cachedFonts;

  const response = await fetch(`${GOOGLE_FONTS_API}?key=${API_KEY}&sort=popularity`);
  const data = await response.json();
  cachedFonts = data.items.map((item: any) => item.family);
  return cachedFonts;
}

// Load a specific font
export function loadGoogleFont(fontFamily: string): void {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}
```

**Note:** Google Fonts API key should be stored in environment variable `VITE_GOOGLE_FONTS_API_KEY`. For MVP, we can use the CSS API which doesn't require a key.

### Local Font Loading

**File:** `src/hooks/useLocalFont.ts`

```typescript
export function useLocalFont() {
  const loadLocalFont = async (file: File): Promise<{ name: string; data: string }> => {
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    const validTypes = ['.ttf', '.otf', '.woff', '.woff2'];
    const ext = file.name.substring(file.name.lastIndexOf('.'));
    if (!validTypes.includes(ext)) {
      throw new Error('Invalid font format');
    }

    const buffer = await file.arrayBuffer();
    const font = new FontFace(file.name, buffer);
    await font.load();
    document.fonts.add(font);

    // Convert to base64 for storage
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    return { name: file.name, data: base64 };
  };

  return { loadLocalFont };
}
```

### Error Handling

- Google Fonts API errors: Show toast notification, retry button
- Font loading errors: Show inline error, fallback to system font
- File upload errors: Show inline validation message
- EyeDropper errors: Show toast notification

---

## Build, Bundling, and Deployment

### Build Process & Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

### Environment Variables

```
VITE_GOOGLE_FONTS_API_KEY=optional_api_key
```

### Key Bundling Optimizations

- **Code Splitting:** Vite handles route-based splitting automatically; component templates can be lazy-loaded
- **Tree Shaking:** Ensured by ES modules and Vite/Rollup
- **Font Preloading:** Critical fonts can be preloaded in `index.html`

### Deployment Target

- **Platform:** Vercel
- **Deployment Method:** Automatic deploys from Git (main branch)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework Preset:** Vite (auto-detected)
- Static files only, no server required

---

## Frontend Testing Strategy

### Component Testing

- **Tools:** Vitest + React Testing Library
- **Location:** `*.test.tsx` co-located with components
- **Focus:** Props rendering, user interactions, state updates

### Key Test Cases

1. Typography token updates reflect in store
2. Color picker changes update palette
3. Component selection toggles in canvas
4. Variation switching updates sidebar
5. LocalStorage persistence/hydration

### Manual Testing Checklist

- [ ] Google Fonts search and selection
- [ ] Local font upload (valid/invalid files)
- [ ] EyeDropper in Chrome/Edge
- [ ] Color picker interactions
- [ ] Variation comparison view
- [ ] Reset confirmation and behavior
- [ ] LocalStorage persistence across refresh

---

## Accessibility Implementation Details

### Semantic HTML

- Use `<header>`, `<main>`, `<aside>`, `<section>` appropriately
- Buttons use `<button>`, not `<div>` with onClick
- Form inputs have associated `<label>` elements

### ARIA Implementation

- Popovers: `role="dialog"`, `aria-modal="true"`
- Dropdowns: `role="listbox"`, `aria-expanded`
- Color swatches: `aria-label` with color value

### Keyboard Navigation

- All interactive elements focusable via Tab
- Dropdowns navigable with Arrow keys
- Escape closes popovers/dropdowns
- Enter/Space activates buttons

### Focus Management

- Focus trapped in color picker popovers
- Focus returns to trigger when popover closes
- Visible focus indicators (ring-2 ring-blue-500)

---

## Performance Considerations

### Font Loading

- Load fonts on-demand when selected
- Show skeleton/placeholder during font load
- Cache loaded fonts in document.fonts

### Image Optimization

- Use placeholder SVGs for avatar/image placeholders in templates
- No actual images in MVP

### Minimizing Re-renders

- Zustand's shallow comparison prevents unnecessary updates
- Memoize expensive computations with `useMemo`
- Use `React.memo` for template components

### Debouncing

- Debounce search input in FontSelector (300ms)
- Debounce LocalStorage writes (500ms)

---

## Browser Support

### Target Browsers

- Chrome 95+ (latest 2 versions)
- Firefox 100+ (latest 2 versions)
- Safari 15+ (latest 2 versions)
- Edge 95+ (latest 2 versions)

### Feature Detection

```typescript
// EyeDropper API
const isEyeDropperSupported = 'EyeDropper' in window;

// FontFace API (widely supported)
const isFontFaceSupported = 'FontFace' in window;
```

### Polyfills

- None required for target browsers
- Graceful fallback for EyeDropper (disabled button with tooltip)

---

## Change Log

| Change | Date | Version | Description | Author |
| ------ | ---- | ------- | ----------- | ------ |
| Initial creation | 2025-12-22 | 1.0 | Complete frontend architecture | Claude (BMAD Architect) |
