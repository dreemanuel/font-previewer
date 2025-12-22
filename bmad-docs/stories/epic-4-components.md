# Epic 4: Component Preview System

## Overview

Build 14 component templates that render with user-defined typography and color tokens.

## Stories

---

## Story 4.1: Component Selection UI

### Status: Draft

### Story

- As a user
- I want to select which components to preview
- so that I can focus on relevant design contexts

### Acceptance Criteria (ACs)

1. Sidebar Components section lists all 14 component templates
2. Components are grouped by category (Marketing, Content, UI)
3. Each component has a checkbox or toggle for selection
4. Selected components appear in the canvas preview
5. At least one component must be selected (default: Hero)

### Tasks / Subtasks

- [ ] Task 1: Create component selection components
  - [ ] Create src/components/components-select/ComponentsSection.tsx
  - [ ] Create src/components/components-select/ComponentToggle.tsx
  - [ ] Create src/components/components-select/index.ts
- [ ] Task 2: Define component registry (AC: 1, 2)
  - [ ] Create src/components/templates/index.ts
  - [ ] Define component metadata (id, name, category)
  - [ ] Group by Marketing, Content, UI
- [ ] Task 3: Implement ComponentsSection (AC: 2)
  - [ ] Render category headers
  - [ ] Map components per category
  - [ ] Collapsible sections (optional)
- [ ] Task 4: Implement ComponentToggle (AC: 3, 4, 5)
  - [ ] Checkbox with component name
  - [ ] Toggle selection in store
  - [ ] Prevent unchecking last component
- [ ] Task 5: Replace sidebar placeholder

### Dev Technical Guidance

```typescript
// Component registry
const componentRegistry = [
  { id: 'hero', name: 'Hero Section', category: 'marketing' },
  { id: 'features', name: 'Features Grid', category: 'marketing' },
  // ... etc
];
```

---

## Story 4.2: Marketing Components

### Status: Draft

### Story

- As a user
- I want to preview my design in marketing page components
- so that I can evaluate landing page typography and colors

### Acceptance Criteria (ACs)

1. Hero component renders with H1 (headline), P1 (subtext), and a CTA button using color tokens
2. Features Grid component renders 3 feature cards with H3 (title) and P2 (description)
3. Testimonial component renders with P1 (quote), P2 (author name), and color tokens
4. Pricing Table component renders 2-3 tier cards with H2 (tier name), P1 (price), P2 (features list)
5. CTA Banner component renders with H2 (headline) and button using color tokens
6. Footer component renders with P2 (links, copyright) using color tokens

### Tasks / Subtasks

- [ ] Task 1: Create marketing templates directory
  - [ ] Create src/components/templates/marketing/
- [ ] Task 2: Create Hero component (AC: 1)
  - [ ] Create Hero.tsx
  - [ ] H1 headline with typography token
  - [ ] P1 subtext
  - [ ] CTA button with main color
  - [ ] bgLight background
- [ ] Task 3: Create FeaturesGrid component (AC: 2)
  - [ ] Create FeaturesGrid.tsx
  - [ ] 3 feature cards
  - [ ] H3 titles, P2 descriptions
  - [ ] Icon placeholders
- [ ] Task 4: Create Testimonial component (AC: 3)
  - [ ] Create Testimonial.tsx
  - [ ] Quote with P1
  - [ ] Author name with P2
  - [ ] Avatar placeholder
- [ ] Task 5: Create PricingTable component (AC: 4)
  - [ ] Create PricingTable.tsx
  - [ ] 3 tier cards
  - [ ] H2 tier name, P1 price, P2 features
  - [ ] Highlight featured tier with main color
- [ ] Task 6: Create CtaBanner component (AC: 5)
  - [ ] Create CtaBanner.tsx
  - [ ] H2 headline
  - [ ] Button with main color
  - [ ] bgDark background
- [ ] Task 7: Create Footer component (AC: 6)
  - [ ] Create Footer.tsx
  - [ ] Link columns with P2
  - [ ] Copyright text

### Dev Technical Guidance

All components receive props:
```typescript
interface TemplateProps {
  typography: {
    h1: { font: string; text: string };
    h2: { font: string; text: string };
    h3: { font: string; text: string };
    p1: { font: string; text: string };
    p2: { font: string; text: string };
  };
  colors: {
    main: string;
    alt: string;
    bgLight: string;
    bgDark: string;
    text: string;
    textInv: string;
  };
}
```

---

## Story 4.3: Content Components

### Status: Draft

### Story

- As a user
- I want to preview my design in blog/article components
- so that I can evaluate content typography

### Acceptance Criteria (ACs)

1. Article Header component renders with H1 (title), P2 (meta info like date/author)
2. Article Body component renders with H2, H3 (section headings), P1 (body text), and a blockquote
3. Blog Card component renders with H3 (title), P2 (excerpt, date), and thumbnail placeholder
4. Author Bio component renders with H3 (name), P2 (bio text), and avatar placeholder

### Tasks / Subtasks

- [ ] Task 1: Create content templates directory
  - [ ] Create src/components/templates/content/
- [ ] Task 2: Create ArticleHeader component (AC: 1)
  - [ ] Create ArticleHeader.tsx
  - [ ] H1 title
  - [ ] P2 meta (date, author, read time)
  - [ ] Featured image placeholder
- [ ] Task 3: Create ArticleBody component (AC: 2)
  - [ ] Create ArticleBody.tsx
  - [ ] H2 section heading
  - [ ] P1 body paragraphs
  - [ ] H3 subsection heading
  - [ ] Blockquote with alt color accent
- [ ] Task 4: Create BlogCard component (AC: 3)
  - [ ] Create BlogCard.tsx
  - [ ] Thumbnail placeholder
  - [ ] H3 title
  - [ ] P2 excerpt and date
  - [ ] Hover state with main color
- [ ] Task 5: Create AuthorBio component (AC: 4)
  - [ ] Create AuthorBio.tsx
  - [ ] Avatar placeholder
  - [ ] H3 author name
  - [ ] P2 bio text
  - [ ] Social links placeholder

### Dev Technical Guidance

Blog components should look like typical blog layouts:
- Article body should have max-width for readability (~700px)
- Blog cards work in grid layout

---

## Story 4.4: UI Element Components

### Status: Draft

### Story

- As a user
- I want to preview my design in UI element components
- so that I can evaluate interface typography and colors

### Acceptance Criteria (ACs)

1. Navigation component renders with logo placeholder, P2 (menu items), and button using color tokens
2. Product Card component renders with H3 (product name), P2 (price), button, and image placeholder
3. User Profile Card component renders with H3 (name), P2 (stats/bio), and avatar placeholder
4. Form Section component renders with P2 (labels), input fields, and submit button using color tokens

### Tasks / Subtasks

- [ ] Task 1: Create UI elements templates directory
  - [ ] Create src/components/templates/ui-elements/
- [ ] Task 2: Create Navigation component (AC: 1)
  - [ ] Create Navigation.tsx
  - [ ] Logo placeholder
  - [ ] Menu items with P2
  - [ ] CTA button with main color
- [ ] Task 3: Create ProductCard component (AC: 2)
  - [ ] Create ProductCard.tsx
  - [ ] Image placeholder
  - [ ] H3 product name
  - [ ] P2 price and description
  - [ ] Add to cart button
- [ ] Task 4: Create UserProfileCard component (AC: 3)
  - [ ] Create UserProfileCard.tsx
  - [ ] Avatar placeholder
  - [ ] H3 name
  - [ ] P2 stats (followers, posts, etc.)
  - [ ] Follow button
- [ ] Task 5: Create FormSection component (AC: 4)
  - [ ] Create FormSection.tsx
  - [ ] P2 labels
  - [ ] Input fields with border
  - [ ] Submit button with main color
  - [ ] Form layout

### Dev Technical Guidance

UI elements should look like real UI components:
- Navigation should span full width
- Cards should have shadows and rounded corners
- Form inputs should have focus states

---

## Story 4.5: Token-Based Component Rendering

### Status: Draft

### Story

- As a developer
- I want components to consume typography and color tokens from the store
- so that preview updates automatically when settings change

### Acceptance Criteria (ACs)

1. All components read typography tokens from the Zustand store
2. All components read color tokens from the Zustand store
3. Typography is applied via inline styles or CSS variables
4. Colors are applied via inline styles or CSS variables
5. Components re-render when store values change
6. Font loading states are handled (fallback font until loaded)

### Tasks / Subtasks

- [ ] Task 1: Create template wrapper/context
  - [ ] Create TemplateProvider or use store directly
  - [ ] Expose typography and colors to all templates
- [ ] Task 2: Implement token consumption (AC: 1, 2, 3, 4)
  - [ ] Each template reads from props or context
  - [ ] Apply font-family via style prop
  - [ ] Apply colors via style prop
- [ ] Task 3: Verify reactivity (AC: 5)
  - [ ] Change typography in sidebar
  - [ ] Verify canvas updates immediately
  - [ ] Change colors, verify update
- [ ] Task 4: Handle font loading (AC: 6)
  - [ ] Show system font while Google Font loads
  - [ ] Smooth transition when font loads
  - [ ] Consider skeleton loading for text

### Dev Technical Guidance

Two approaches:
1. **Props passing**: Canvas passes typography/colors to each component
2. **CSS Variables**: Set variables at container level, components inherit

Recommend CSS variables for cleaner component code:
```css
.preview-container {
  --font-h1: 'Playfair Display', serif;
  --color-main: #3B82F6;
}
```

---

## Story Progress Notes

### Story 4.1
- Agent Model Used: -
- Completion Notes: -

### Story 4.2
- Agent Model Used: -
- Completion Notes: -

### Story 4.3
- Agent Model Used: -
- Completion Notes: -

### Story 4.4
- Agent Model Used: -
- Completion Notes: -

### Story 4.5
- Agent Model Used: -
- Completion Notes: -
