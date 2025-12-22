# Epic 1: Foundation & Core Setup

## Overview

Establish the project infrastructure, base layout, and foundational components. This epic delivers a functional shell with Sidebar + Canvas layout and placeholder content.

## Stories

---

## Story 1.1: Project Initialization

### Status: Draft

### Story

- As a developer
- I want the project scaffolded with React, Vite, TypeScript, and Tailwind
- so that I have a working development environment

### Acceptance Criteria (ACs)

1. Vite + React + TypeScript project created with `npm create vite@latest`
2. Tailwind CSS installed and configured with base styles
3. Zustand installed for state management
4. Lucide React installed for icons
5. ESLint and Prettier configured for code quality
6. Project runs with `npm run dev` and shows a placeholder page
7. Build succeeds with `npm run build`

### Tasks / Subtasks

- [ ] Task 1: Create Vite project (AC: 1)
  - [ ] Run `npm create vite@latest font-previewer -- --template react-ts`
  - [ ] Verify project structure
- [ ] Task 2: Install and configure Tailwind CSS (AC: 2)
  - [ ] Install tailwindcss, postcss, autoprefixer
  - [ ] Create tailwind.config.js and postcss.config.js
  - [ ] Add Tailwind directives to globals.css
- [ ] Task 3: Install dependencies (AC: 3, 4)
  - [ ] Install zustand
  - [ ] Install lucide-react
- [ ] Task 4: Configure ESLint and Prettier (AC: 5)
  - [ ] Configure ESLint for React/TypeScript
  - [ ] Add Prettier config
  - [ ] Add lint script to package.json
- [ ] Task 5: Create placeholder App component (AC: 6)
  - [ ] Update App.tsx with "Font Previewer" placeholder
  - [ ] Verify dev server works
- [ ] Task 6: Verify build (AC: 7)
  - [ ] Run npm run build
  - [ ] Fix any TypeScript errors

### Dev Technical Guidance

- Use Vite's official React TypeScript template
- Configure Tailwind with default preset plus custom colors for near-black/near-white
- ESLint config should extend `@typescript-eslint/recommended` and `react-hooks`

---

## Story 1.2: Base Layout Structure

### Status: Draft

### Story

- As a user
- I want to see a Sidebar + Canvas layout
- so that I can configure settings on the left and see previews on the right

### Acceptance Criteria (ACs)

1. App displays a fixed-width sidebar (320px) on the left
2. Canvas area fills remaining viewport width
3. Layout is responsive down to 900px viewport (sidebar stacks below on smaller screens)
4. Sidebar has sections for Typography, Colors, and Components (placeholder content)
5. Canvas shows a centered placeholder message

### Tasks / Subtasks

- [ ] Task 1: Create layout components structure (AC: 1, 2)
  - [ ] Create src/components/layout/AppLayout.tsx
  - [ ] Create src/components/layout/Sidebar.tsx
  - [ ] Create src/components/layout/Canvas.tsx
  - [ ] Create src/components/layout/index.ts barrel export
- [ ] Task 2: Implement AppLayout with flex container (AC: 1, 2)
  - [ ] Set up flex container with h-screen
  - [ ] Sidebar with w-80 flex-shrink-0
  - [ ] Canvas with flex-1 overflow-auto
- [ ] Task 3: Add responsive behavior (AC: 3)
  - [ ] Add breakpoint at 900px (md:)
  - [ ] Stack layout on smaller screens
- [ ] Task 4: Add sidebar sections (AC: 4)
  - [ ] Create Typography section placeholder
  - [ ] Create Colors section placeholder
  - [ ] Create Components section placeholder
  - [ ] Style with dividers between sections
- [ ] Task 5: Add canvas placeholder (AC: 5)
  - [ ] Center placeholder text
  - [ ] Style with gray background

### Dev Technical Guidance

- Use Tailwind's flex utilities for layout
- Sidebar should have overflow-y-auto for scrolling content
- Use semantic HTML: `<aside>` for sidebar, `<main>` for canvas

---

## Story 1.3: Global State Store Setup

### Status: Draft

### Story

- As a developer
- I want a Zustand store managing typography, colors, and component state
- so that all parts of the app share configuration data

### Acceptance Criteria (ACs)

1. Zustand store created at `src/store/useDesignStore.ts`
2. Store contains typography state (5 tokens with font, text, source properties)
3. Store contains color state (palette array, token assignments)
4. Store contains component selection state (array of selected component IDs)
5. Store contains variation state (array of variation configs)
6. Actions exist to update each state slice
7. Store is typed with TypeScript interfaces

### Tasks / Subtasks

- [ ] Task 1: Create store types (AC: 7)
  - [ ] Create src/store/types.ts
  - [ ] Define TokenConfig interface
  - [ ] Define ColorTokens interface
  - [ ] Define Variation interface
  - [ ] Define DesignState interface
- [ ] Task 2: Create defaults (AC: 2, 3, 4, 5)
  - [ ] Create src/store/defaults.ts
  - [ ] Define default typography (system fonts)
  - [ ] Define default colors (near-black, near-white)
  - [ ] Define default components (Hero selected)
  - [ ] Define default variation
- [ ] Task 3: Create Zustand store (AC: 1, 6)
  - [ ] Create src/store/useDesignStore.ts
  - [ ] Implement typography actions
  - [ ] Implement color actions
  - [ ] Implement component actions
  - [ ] Implement variation actions
  - [ ] Implement reset action
- [ ] Task 4: Add LocalStorage persistence
  - [ ] Add persist middleware from zustand/middleware
  - [ ] Configure partialize to exclude functions
  - [ ] Set storage key to 'font-previewer-state'

### Dev Technical Guidance

```typescript
// Example store structure
interface TokenConfig {
  font: string;
  source: 'google' | 'local';
  text: string;
  localFontData?: string;
}

interface DesignState {
  typography: Record<'h1' | 'h2' | 'h3' | 'p1' | 'p2', TokenConfig>;
  palette: string[];
  colorTokens: Record<'main' | 'alt' | 'bgLight' | 'bgDark' | 'text' | 'textInv', string>;
  selectedComponents: string[];
  variations: Variation[];
  activeVariationId: string;
  viewMode: 'grid' | 'fullpage';
  // ... actions
}
```

---

## Story Progress Notes

### Story 1.1
- Agent Model Used: -
- Completion Notes: -

### Story 1.2
- Agent Model Used: -
- Completion Notes: -

### Story 1.3
- Agent Model Used: -
- Completion Notes: -
