# Epic 2: Typography System

## Overview

Enable users to configure typography tokens with Google Fonts or uploaded fonts, enter custom text, and generate lorem ipsum.

## Stories

---

## Story 2.1: Typography Token UI

### Status: Draft

### Story

- As a user
- I want to see input fields for H1, H2, H3, P1, P2 typography tokens
- so that I can configure my typography system

### Acceptance Criteria (ACs)

1. Sidebar Typography section displays 5 token rows (H1, H2, H3, P1, P2)
2. Each row shows the token label and current font selection
3. Each row has a dropdown/button to open font selection
4. Each row has a text input for custom preview text
5. Tokens are visually distinguished (H1 as primary, P2 as smallest)

### Tasks / Subtasks

- [ ] Task 1: Create typography components structure
  - [ ] Create src/components/typography/TypographySection.tsx
  - [ ] Create src/components/typography/TokenRow.tsx
  - [ ] Create src/components/typography/index.ts
- [ ] Task 2: Implement TypographySection (AC: 1)
  - [ ] Map over 5 tokens
  - [ ] Render TokenRow for each
  - [ ] Add section header
- [ ] Task 3: Implement TokenRow (AC: 2, 3, 4, 5)
  - [ ] Display token label (H1, H2, etc.)
  - [ ] Show current font name
  - [ ] Add button to open font selector
  - [ ] Add text input for custom text
  - [ ] Style tokens with visual hierarchy
- [ ] Task 4: Connect to Zustand store
  - [ ] Read typography state from store
  - [ ] Wire up text input to update store
- [ ] Task 5: Replace sidebar placeholder with component

### Dev Technical Guidance

- Use flexbox for token row layout: label | font button | text input
- Visual hierarchy: larger font-size labels for H1/H2, smaller for P1/P2
- Text input should expand to fill available space

---

## Story 2.2: Google Fonts Integration

### Status: Draft

### Story

- As a user
- I want to search and select fonts from Google Fonts
- so that I can use web fonts in my design system

### Acceptance Criteria (ACs)

1. Font selector displays a searchable list of Google Fonts
2. Font list is fetched from Google Fonts API and cached in memory
3. Selecting a font updates the token in the store
4. Selected font is loaded via dynamic CSS link injection
5. Font loading state is indicated (spinner or text)
6. Canvas preview updates when font loads

### Tasks / Subtasks

- [ ] Task 1: Create font utilities
  - [ ] Create src/lib/fonts.ts
  - [ ] Implement fetchGoogleFonts() with caching
  - [ ] Implement loadGoogleFont() CSS injection
- [ ] Task 2: Create useFontLoader hook
  - [ ] Create src/hooks/useFontLoader.ts
  - [ ] Track loading state per font
  - [ ] Expose loadFont, isLoading functions
- [ ] Task 3: Create FontSelector component (AC: 1, 2)
  - [ ] Create src/components/typography/FontSelector.tsx
  - [ ] Implement searchable dropdown
  - [ ] Fetch fonts on mount (or lazy on open)
  - [ ] Filter by search query
- [ ] Task 4: Implement font selection (AC: 3, 4)
  - [ ] Wire onChange to store action
  - [ ] Call loadGoogleFont on selection
- [ ] Task 5: Add loading indicator (AC: 5)
  - [ ] Show spinner while font loads
  - [ ] Update UI when font ready
- [ ] Task 6: Verify canvas updates (AC: 6)
  - [ ] Ensure components re-render with new font

### Dev Technical Guidance

```typescript
// Google Fonts CSS API (no API key needed)
const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}&display=swap`;

// Create and inject link element
const link = document.createElement('link');
link.href = fontUrl;
link.rel = 'stylesheet';
document.head.appendChild(link);
```

For the font list, we can use a static list of popular fonts (~200) to avoid API key requirements, or fetch from the API with a key in env var.

---

## Story 2.3: Local Font Upload

### Status: Draft

### Story

- As a user
- I want to upload font files from my computer
- so that I can test custom or purchased fonts

### Acceptance Criteria (ACs)

1. Each token row has an "Upload" button alongside Google Fonts selector
2. Upload accepts .ttf, .otf, .woff, .woff2 files
3. Uploaded files are limited to 5MB
4. Font is loaded using FontFace API
5. Uploaded font name appears in the token's font selection
6. Canvas preview updates when uploaded font loads
7. Error message shown for invalid or oversized files

### Tasks / Subtasks

- [ ] Task 1: Create useLocalFont hook (AC: 2, 3, 4)
  - [ ] Create src/hooks/useLocalFont.ts
  - [ ] Validate file type and size
  - [ ] Load font with FontFace API
  - [ ] Convert to base64 for storage
- [ ] Task 2: Create FontUploader component (AC: 1, 5, 7)
  - [ ] Create src/components/typography/FontUploader.tsx
  - [ ] Add file input (hidden) with button trigger
  - [ ] Show uploaded font name
  - [ ] Show error messages
- [ ] Task 3: Integrate into TokenRow
  - [ ] Add FontUploader alongside FontSelector
  - [ ] Toggle between Google/Local mode
- [ ] Task 4: Update store with local font data
  - [ ] Store font name and base64 data
  - [ ] Set source to 'local'
- [ ] Task 5: Verify canvas updates (AC: 6)
  - [ ] Restore fonts from LocalStorage on load

### Dev Technical Guidance

```typescript
// FontFace API usage
const loadLocalFont = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const font = new FontFace(file.name, buffer);
  await font.load();
  document.fonts.add(font);
  return font.family;
};
```

Store base64 carefully - large fonts can bloat LocalStorage.

---

## Story 2.4: Custom Text Input

### Status: Draft

### Story

- As a user
- I want to enter custom preview text for each token
- so that I can see how my actual content looks with these fonts

### Acceptance Criteria (ACs)

1. Each token row has a text input field
2. Text input has placeholder text suggesting example content
3. Typing updates the store in real-time
4. Canvas preview shows the custom text (or default lorem if empty)
5. Text input supports multiline for paragraph tokens (P1, P2)

### Tasks / Subtasks

- [ ] Task 1: Enhance TokenRow text input (AC: 1, 2, 5)
  - [ ] Add placeholder per token type
  - [ ] Use textarea for P1/P2
  - [ ] Use input for H1/H2/H3
- [ ] Task 2: Wire to store (AC: 3)
  - [ ] Call setTypographyToken on change
  - [ ] Debounce updates (300ms)
- [ ] Task 3: Update preview components (AC: 4)
  - [ ] Read text from store
  - [ ] Fall back to default lorem if empty

### Dev Technical Guidance

Placeholders:
- H1: "Your headline here"
- H2: "Section title"
- H3: "Subsection heading"
- P1: "Body text paragraph..."
- P2: "Secondary text, captions..."

---

## Story 2.5: Lorem Ipsum Generator

### Status: Draft

### Story

- As a user
- I want to generate random lorem ipsum text
- so that I can quickly fill preview content

### Acceptance Criteria (ACs)

1. Each token row has a "Random" button to generate lorem ipsum
2. Clicking Random fills the text input with appropriate length lorem
3. After generation, "Longer" and "Shorter" buttons appear
4. Clicking Longer adds more lorem ipsum text
5. Clicking Shorter reduces lorem ipsum text (minimum 3 words)
6. Lorem ipsum is generated client-side (no API call)

### Tasks / Subtasks

- [ ] Task 1: Create lorem ipsum utility
  - [ ] Create src/lib/lorem.ts
  - [ ] Implement generateLorem(length: 'short' | 'medium' | 'long')
  - [ ] Include static lorem ipsum word bank
- [ ] Task 2: Create useLoremIpsum hook
  - [ ] Create src/hooks/useLoremIpsum.ts
  - [ ] Track current length state
  - [ ] Expose generate, longer, shorter functions
- [ ] Task 3: Create LoremGenerator component (AC: 1, 2, 3, 4, 5)
  - [ ] Create src/components/typography/LoremGenerator.tsx
  - [ ] Random button
  - [ ] Longer/Shorter buttons (conditional)
  - [ ] Wire to store
- [ ] Task 4: Integrate into TokenRow
  - [ ] Add LoremGenerator next to text input
  - [ ] Handle button states

### Dev Technical Guidance

```typescript
// Lorem lengths by token type
const loremLengths = {
  h1: 4,    // 4 words
  h2: 6,    // 6 words
  h3: 8,    // 8 words
  p1: 30,   // 30 words
  p2: 20,   // 20 words
};
```

Static lorem words array avoids network requests.

---

## Story Progress Notes

### Story 2.1
- Agent Model Used: -
- Completion Notes: -

### Story 2.2
- Agent Model Used: -
- Completion Notes: -

### Story 2.3
- Agent Model Used: -
- Completion Notes: -

### Story 2.4
- Agent Model Used: -
- Completion Notes: -

### Story 2.5
- Agent Model Used: -
- Completion Notes: -
