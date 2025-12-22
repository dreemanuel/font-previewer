# Epic 3: Color Palette System

## Overview

Enable users to build a color palette, assign colors to semantic tokens, and use a desktop color picker.

## Stories

---

## Story 3.1: Color Palette Builder UI

### Status: Draft

### Story

- As a user
- I want to add colors to a palette
- so that I can define my color scheme

### Acceptance Criteria (ACs)

1. Sidebar Colors section displays the current palette (1-8 swatches)
2. An "Add Color" button adds a new color (default: random or gray)
3. Each swatch is clickable to open a color picker/input
4. Each swatch has a delete button (except when only 1 color remains)
5. Colors update in the store when changed
6. Palette is limited to maximum 8 colors (Add button disabled at limit)

### Tasks / Subtasks

- [ ] Task 1: Create color components structure
  - [ ] Create src/components/colors/ColorsSection.tsx
  - [ ] Create src/components/colors/PaletteBuilder.tsx
  - [ ] Create src/components/colors/ColorSwatch.tsx
  - [ ] Create src/components/colors/index.ts
- [ ] Task 2: Implement PaletteBuilder (AC: 1, 2, 6)
  - [ ] Display swatches from store
  - [ ] Add Color button
  - [ ] Disable at 8 colors
- [ ] Task 3: Implement ColorSwatch (AC: 3, 4, 5)
  - [ ] Display color box
  - [ ] Click to open picker (next story)
  - [ ] Delete button with confirmation
  - [ ] Hide delete if only 1 color
- [ ] Task 4: Connect to store
  - [ ] addPaletteColor action
  - [ ] removePaletteColor action
  - [ ] updatePaletteColor action
- [ ] Task 5: Replace sidebar placeholder

### Dev Technical Guidance

- Swatches should be squares ~40x40px with rounded corners
- Use a grid layout for swatches (2-4 per row)
- Default new color: #808080 (gray)

---

## Story 3.2: Color Picker Input

### Status: Draft

### Story

- As a user
- I want to pick colors using a color picker
- so that I can precisely choose my palette colors

### Acceptance Criteria (ACs)

1. Clicking a color swatch opens a color picker popover
2. Color picker allows hex input, HSL sliders, or visual picker
3. Color changes are reflected in real-time
4. Clicking outside the popover closes it
5. Keyboard navigation works (Tab, Enter, Escape)

### Tasks / Subtasks

- [ ] Task 1: Create ColorPicker component (AC: 1, 2)
  - [ ] Create src/components/ui/ColorPicker.tsx
  - [ ] Hex input field
  - [ ] HSL sliders (Hue, Saturation, Lightness)
  - [ ] Color preview swatch
- [ ] Task 2: Create Popover component (AC: 4, 5)
  - [ ] Create src/components/ui/Popover.tsx
  - [ ] Position relative to trigger
  - [ ] Close on outside click
  - [ ] Close on Escape
  - [ ] Trap focus inside
- [ ] Task 3: Integrate with ColorSwatch (AC: 1, 3)
  - [ ] Open popover on swatch click
  - [ ] Pass onChange to ColorPicker
  - [ ] Update store on change
- [ ] Task 4: Add keyboard navigation (AC: 5)
  - [ ] Tab through inputs/sliders
  - [ ] Enter to confirm
  - [ ] Escape to cancel

### Dev Technical Guidance

```typescript
// Simple HSL to Hex conversion
const hslToHex = (h: number, s: number, l: number): string => {
  // ... conversion logic
};

// Hex to HSL
const hexToHsl = (hex: string): [number, number, number] => {
  // ... conversion logic
};
```

Consider using a lightweight color picker library if time-constrained.

---

## Story 3.3: Desktop Eyedropper Tool

### Status: Draft

### Story

- As a user
- I want to pick colors from anywhere on my screen
- so that I can sample colors from existing designs

### Acceptance Criteria (ACs)

1. An "Eyedropper" button appears near the color palette
2. Clicking Eyedropper activates the browser's EyeDropper API
3. Selected color is added to the palette
4. Browser support is detected; unsupported browsers show the button disabled with tooltip
5. Any EyeDropper errors are handled gracefully

### Tasks / Subtasks

- [ ] Task 1: Create useEyeDropper hook (AC: 2, 4, 5)
  - [ ] Create src/hooks/useEyeDropper.ts
  - [ ] Detect EyeDropper API support
  - [ ] Implement open() function
  - [ ] Handle AbortError (user cancelled)
  - [ ] Handle other errors
- [ ] Task 2: Create EyeDropperButton component (AC: 1, 3, 4)
  - [ ] Create src/components/colors/EyeDropperButton.tsx
  - [ ] Render button with eyedropper icon
  - [ ] Disable if not supported
  - [ ] Show tooltip explaining why disabled
- [ ] Task 3: Integrate with palette (AC: 3)
  - [ ] On color pick, add to palette
  - [ ] Or update selected swatch if one is active

### Dev Technical Guidance

```typescript
// EyeDropper API
const useEyeDropper = () => {
  const isSupported = 'EyeDropper' in window;

  const pickColor = async (): Promise<string | null> => {
    if (!isSupported) return null;

    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      return result.sRGBHex;
    } catch (e) {
      if (e.name === 'AbortError') return null; // User cancelled
      throw e;
    }
  };

  return { isSupported, pickColor };
};
```

---

## Story 3.4: Color Token Assignment

### Status: Draft

### Story

- As a user
- I want to assign palette colors to semantic tokens
- so that my component previews use consistent colors

### Acceptance Criteria (ACs)

1. Colors section shows 6 token assignment rows (main, alt, bg-light, bg-dark, text, text-inv)
2. Each row has a dropdown to select from palette colors
3. Token assignments update in the store
4. Unassigned tokens fall back to first suitable palette color
5. Canvas preview updates when token assignments change

### Tasks / Subtasks

- [ ] Task 1: Create TokenAssignment component (AC: 1, 2)
  - [ ] Create src/components/colors/TokenAssignment.tsx
  - [ ] Render 6 rows with labels
  - [ ] Dropdown showing palette swatches
- [ ] Task 2: Wire to store (AC: 3)
  - [ ] setColorToken action
  - [ ] Read colorTokens from store
- [ ] Task 3: Implement fallback logic (AC: 4)
  - [ ] If token not assigned, use first palette color
  - [ ] Light tokens prefer lighter colors
  - [ ] Dark tokens prefer darker colors
- [ ] Task 4: Verify preview updates (AC: 5)
  - [ ] Components read from colorTokens
  - [ ] Re-render on change

### Dev Technical Guidance

Token semantic meanings:
- `main`: Primary brand color (buttons, links)
- `alt`: Secondary/accent color
- `bgLight`: Light background
- `bgDark`: Dark background
- `text`: Primary text color
- `textInv`: Text on dark backgrounds

---

## Story 3.5: Default Color Palette

### Status: Draft

### Story

- As a user
- I want the color palette to be optional with sensible defaults
- so that I can preview typography without configuring colors

### Acceptance Criteria (ACs)

1. If user has not added colors, defaults are applied: near-black (#1a1a1a), near-white (#f5f5f5)
2. Default token assignments: main=#1a1a1a, alt=#1a1a1a, bg-light=#f5f5f5, bg-dark=#1a1a1a, text=#1a1a1a, text-inv=#f5f5f5
3. User can clear palette to restore defaults
4. Defaults are visually indicated as "default" in the UI

### Tasks / Subtasks

- [ ] Task 1: Define defaults in store (AC: 1, 2)
  - [ ] Update src/store/defaults.ts
  - [ ] Near-black: #1a1a1a
  - [ ] Near-white: #f5f5f5
  - [ ] Default token assignments
- [ ] Task 2: Add "Reset to Defaults" button (AC: 3)
  - [ ] Add button to ColorsSection
  - [ ] Clear palette and token assignments
  - [ ] Reapply defaults
- [ ] Task 3: Show default indicator (AC: 4)
  - [ ] Display "(default)" label when using defaults
  - [ ] Hide when user has customized

### Dev Technical Guidance

Check if palette equals default to show indicator:
```typescript
const isDefaultPalette = (palette: string[]) =>
  palette.length === 2 &&
  palette[0] === '#1a1a1a' &&
  palette[1] === '#f5f5f5';
```

---

## Story Progress Notes

### Story 3.1
- Agent Model Used: -
- Completion Notes: -

### Story 3.2
- Agent Model Used: -
- Completion Notes: -

### Story 3.3
- Agent Model Used: -
- Completion Notes: -

### Story 3.4
- Agent Model Used: -
- Completion Notes: -

### Story 3.5
- Agent Model Used: -
- Completion Notes: -
