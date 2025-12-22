# Epic 6: Persistence & Polish

## Overview

Add LocalStorage persistence, reset functionality, loading states, and error handling.

## Stories

---

## Story 6.1: LocalStorage Persistence

### Status: Draft

### Story

- As a user
- I want my configuration to persist across browser sessions
- so that I don't lose my work when I close the tab

### Acceptance Criteria (ACs)

1. Store state is serialized to LocalStorage on every change
2. On app load, state is hydrated from LocalStorage if available
3. Uploaded fonts are stored as base64 or blob URLs (handled separately from JSON state)
4. LocalStorage key is `font-previewer-state`
5. Corrupted LocalStorage data is handled gracefully (reset to defaults)

### Tasks / Subtasks

- [ ] Task 1: Configure Zustand persist middleware (AC: 1, 2, 4)
  - [ ] Already added in Story 1.3
  - [ ] Verify persist middleware is working
  - [ ] Test refresh preserves state
- [ ] Task 2: Handle uploaded font data (AC: 3)
  - [ ] Store base64 font data in localFontData property
  - [ ] Rehydrate fonts on app load
  - [ ] Register fonts with FontFace API on hydration
- [ ] Task 3: Handle corrupted data (AC: 5)
  - [ ] Wrap hydration in try/catch
  - [ ] If parse fails, reset to defaults
  - [ ] Show toast notification about reset
- [ ] Task 4: Create useLocalStorage hook
  - [ ] Create src/hooks/useLocalStorage.ts
  - [ ] Utility for direct LocalStorage access if needed

### Dev Technical Guidance

```typescript
// Zustand persist with error handling
const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({ /* ... */ }),
    {
      name: 'font-previewer-state',
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate:', error);
          // Reset to defaults handled by store
        }
      },
    }
  )
);
```

---

## Story 6.2: Reset Configuration

### Status: Draft

### Story

- As a user
- I want to reset my configuration to defaults
- so that I can start fresh

### Acceptance Criteria (ACs)

1. A "Reset" button appears in the sidebar header
2. Clicking Reset shows a confirmation dialog
3. Confirming clears LocalStorage and resets store to defaults
4. Default state includes: 1 variation, default fonts (system), default colors, Hero component selected

### Tasks / Subtasks

- [ ] Task 1: Create confirmation dialog
  - [ ] Create src/components/ui/ConfirmDialog.tsx
  - [ ] Modal with message and confirm/cancel buttons
  - [ ] Accessible (focus trap, escape to close)
- [ ] Task 2: Add Reset button to Sidebar (AC: 1)
  - [ ] Add button in sidebar header
  - [ ] Icon: refresh/reset icon
- [ ] Task 3: Implement reset flow (AC: 2, 3)
  - [ ] Click shows ConfirmDialog
  - [ ] Confirm calls store.reset()
  - [ ] Clear LocalStorage manually
- [ ] Task 4: Define default state (AC: 4)
  - [ ] Already in src/store/defaults.ts
  - [ ] Verify defaults are correct

### Dev Technical Guidance

```typescript
// Reset action
reset: () => {
  localStorage.removeItem('font-previewer-state');
  set(getDefaultState());
};
```

---

## Story 6.3: Loading States & Error Handling

### Status: Draft

### Story

- As a user
- I want to see loading indicators and error messages
- so that I understand what's happening and can recover from issues

### Acceptance Criteria (ACs)

1. Font loading shows a spinner or skeleton in the preview
2. Google Fonts API errors show a user-friendly message with retry option
3. File upload errors (size, format) show inline validation messages
4. EyeDropper errors show a toast notification
5. Canvas shows a helpful empty state when no components are selected

### Tasks / Subtasks

- [ ] Task 1: Create Toast notification system (AC: 2, 4)
  - [ ] Create src/components/ui/Toast.tsx
  - [ ] Create useToast hook or context
  - [ ] Position in bottom-right
  - [ ] Auto-dismiss after 5 seconds
- [ ] Task 2: Add font loading indicator (AC: 1)
  - [ ] Track loading state per font
  - [ ] Show spinner in FontSelector
  - [ ] Show skeleton text in preview while loading
- [ ] Task 3: Add API error handling (AC: 2)
  - [ ] Catch Google Fonts fetch errors
  - [ ] Show toast with error message
  - [ ] Add retry button
- [ ] Task 4: Add upload error handling (AC: 3)
  - [ ] Show inline error in FontUploader
  - [ ] Clear error on new attempt
- [ ] Task 5: Add empty state (AC: 5)
  - [ ] When no components selected
  - [ ] Show helpful message with illustration
  - [ ] Suggest selecting a component

### Dev Technical Guidance

```typescript
// useToast hook
const { showToast } = useToast();

showToast({
  type: 'error',
  message: 'Failed to load fonts. Please try again.',
  action: { label: 'Retry', onClick: retryFetch },
});
```

---

## Story 6.4: Final UI Polish

### Status: Draft

### Story

- As a user
- I want the interface to feel polished and professional
- so that I enjoy using the tool

### Acceptance Criteria (ACs)

1. Smooth transitions when switching views or variations
2. Consistent spacing, colors, and typography in UI chrome
3. Hover states on all interactive elements
4. Focus states meet accessibility requirements
5. Responsive behavior at 900px breakpoint
6. No console errors in production build

### Tasks / Subtasks

- [ ] Task 1: Add transitions (AC: 1)
  - [ ] View toggle transition
  - [ ] Variation switch transition
  - [ ] Sidebar section collapse transition
- [ ] Task 2: Audit spacing and colors (AC: 2)
  - [ ] Consistent padding/margins
  - [ ] Unified color palette for UI
  - [ ] Typography scale for UI text
- [ ] Task 3: Add hover states (AC: 3)
  - [ ] Buttons: background change
  - [ ] Swatches: scale up slightly
  - [ ] Cards: shadow increase
  - [ ] Links: underline or color change
- [ ] Task 4: Verify focus states (AC: 4)
  - [ ] All focusable elements have visible ring
  - [ ] Focus order is logical
  - [ ] Skip link for keyboard users (optional)
- [ ] Task 5: Test responsive behavior (AC: 5)
  - [ ] Test at 900px breakpoint
  - [ ] Sidebar stacks or collapses
  - [ ] Canvas adapts
- [ ] Task 6: Clean up console (AC: 6)
  - [ ] Remove console.log statements
  - [ ] Fix any React warnings
  - [ ] Run production build, check for errors

### Dev Technical Guidance

Tailwind transitions:
```html
<button class="transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500">
```

Focus ring utility:
```css
@layer utilities {
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
}
```

---

## Story Progress Notes

### Story 6.1
- Agent Model Used: -
- Completion Notes: -

### Story 6.2
- Agent Model Used: -
- Completion Notes: -

### Story 6.3
- Agent Model Used: -
- Completion Notes: -

### Story 6.4
- Agent Model Used: -
- Completion Notes: -
