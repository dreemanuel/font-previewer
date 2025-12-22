# Epic 5: Comparison & Variations

## Overview

Enable users to create multiple design variations and compare them side-by-side.

## Stories

---

## Story 5.1: Variation Management

### Status: Draft

### Story

- As a user
- I want to create multiple design variations
- so that I can compare different font/color combinations

### Acceptance Criteria (ACs)

1. An "Add Variation" button creates a new variation (max 4)
2. Each variation has independent typography and color settings
3. Variations are numbered or named (Variation 1, Variation 2, etc.)
4. A "Delete Variation" button removes a variation (minimum 1 must remain)
5. Sidebar shows which variation is currently being edited
6. Clicking a variation tab/button switches the sidebar to edit that variation

### Tasks / Subtasks

- [ ] Task 1: Update store for variations (AC: 2)
  - [ ] Ensure each Variation has its own typography and colorTokens
  - [ ] Add activeVariationId to track current editing
- [ ] Task 2: Create VariationTabs component (AC: 3, 5, 6)
  - [ ] Create src/components/preview/VariationTabs.tsx
  - [ ] Render tabs for each variation
  - [ ] Highlight active variation
  - [ ] Click to switch active variation
- [ ] Task 3: Add variation actions (AC: 1, 4)
  - [ ] "Add Variation" button
  - [ ] Copy current variation settings to new
  - [ ] "Delete" button on each tab (except last)
  - [ ] Limit to 4 variations
- [ ] Task 4: Wire sidebar to active variation
  - [ ] Typography section reads/writes active variation
  - [ ] Colors section reads/writes active variation
- [ ] Task 5: Add VariationTabs to Sidebar

### Dev Technical Guidance

```typescript
// When adding a variation, clone current settings
const addVariation = () => {
  const current = variations.find(v => v.id === activeVariationId);
  const newVariation = {
    id: crypto.randomUUID(),
    name: `Variation ${variations.length + 1}`,
    typography: { ...current.typography },
    colorTokens: { ...current.colorTokens },
  };
  set({ variations: [...variations, newVariation] });
};
```

---

## Story 5.2: Side-by-Side Grid View

### Status: Draft

### Story

- As a user
- I want to see variations displayed side-by-side
- so that I can directly compare design choices

### Acceptance Criteria (ACs)

1. Canvas displays variation columns (2 columns for 2 variations, 3 for 3, 4 for 4)
2. Each column shows the same selected components with that variation's settings
3. Columns have equal width and scroll independently
4. Variation name/number is displayed at the top of each column
5. Grid view is the default view mode

### Tasks / Subtasks

- [ ] Task 1: Create VariationColumn component (AC: 2, 4)
  - [ ] Create src/components/preview/VariationColumn.tsx
  - [ ] Render variation header with name
  - [ ] Render selected components with variation's tokens
- [ ] Task 2: Update PreviewCanvas for grid (AC: 1, 3)
  - [ ] Create/update src/components/preview/PreviewCanvas.tsx
  - [ ] CSS Grid with dynamic columns
  - [ ] Each column scrolls independently (overflow-y-auto)
- [ ] Task 3: Pass variation config to templates (AC: 2)
  - [ ] Each column passes its typography/colors to components
  - [ ] Components render with correct tokens
- [ ] Task 4: Set default view mode (AC: 5)
  - [ ] Store viewMode defaults to 'grid'

### Dev Technical Guidance

```css
/* Grid with dynamic columns */
.preview-grid {
  display: grid;
  grid-template-columns: repeat(var(--variation-count), 1fr);
  height: 100%;
}

.variation-column {
  overflow-y: auto;
  border-right: 1px solid #e5e7eb;
}
```

---

## Story 5.3: Full Page View Toggle

### Status: Draft

### Story

- As a user
- I want to toggle to a full page view
- so that I can see components stacked vertically as a complete page

### Acceptance Criteria (ACs)

1. A "Full Page" toggle button appears in the canvas header
2. Full Page view shows all selected components stacked vertically
3. In multi-variation mode, full pages are displayed side-by-side
4. Toggle state is preserved when switching variations
5. User can switch back to Grid View

### Tasks / Subtasks

- [ ] Task 1: Create ViewToggle component (AC: 1, 5)
  - [ ] Create src/components/preview/ViewToggle.tsx
  - [ ] Toggle button or segmented control
  - [ ] Icons for Grid and Full Page
- [ ] Task 2: Implement Full Page View (AC: 2)
  - [ ] When viewMode is 'fullpage', stack all components
  - [ ] No gaps between components (continuous page)
  - [ ] Full-width components
- [ ] Task 3: Handle multi-variation full page (AC: 3)
  - [ ] Each variation column shows full page
  - [ ] Columns side-by-side
- [ ] Task 4: Persist toggle state (AC: 4)
  - [ ] viewMode stored in Zustand
  - [ ] Preserved in LocalStorage
- [ ] Task 5: Add ViewToggle to Canvas header

### Dev Technical Guidance

```typescript
// View modes
type ViewMode = 'grid' | 'fullpage';

// In Canvas component
{viewMode === 'grid' ? (
  // Each component in a card with spacing
) : (
  // Components stacked with no gaps
)}
```

---

## Story Progress Notes

### Story 5.1
- Agent Model Used: -
- Completion Notes: -

### Story 5.2
- Agent Model Used: -
- Completion Notes: -

### Story 5.3
- Agent Model Used: -
- Completion Notes: -
