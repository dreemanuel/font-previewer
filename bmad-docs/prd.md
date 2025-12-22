# Font Previewer Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Enable designers and developers to prototype complete typography systems (H1-P2 tokens) using Google Fonts or uploaded fonts
- Provide an intuitive color palette builder with semantic token assignment
- Render typography and colors in realistic component contexts
- Support side-by-side comparison of 2-4 design variations
- Deliver a fast, client-side-only experience with LocalStorage persistence

### Background Context

The design tooling landscape is fragmented. Font pairing tools like Fontjoy and FontPair focus solely on typography. Color tools like Coolors and Khroma handle palettes in isolation. Designers must manually combine these in mockups or code prototypes to see how typography and colors work together in real UI contexts.

Font Previewer bridges this gap by unifying typography tokens, color palettes, and component previews in a single interface. Users can rapidly iterate on design system choices and compare variations side-by-side without leaving the tool.

---

## Requirements

### Functional

- FR1: Users shall select fonts for 5 typography tokens (H1, H2, H3, P1, P2) from Google Fonts or upload local font files
- FR2: Users shall enter custom preview text for each typography token
- FR3: Users shall generate random lorem ipsum text with "Longer" and "Shorter" controls
- FR4: Users shall build a color palette containing 1-8 colors using a color picker or hex input
- FR5: Users shall assign palette colors to 6 fixed semantic tokens (main, alt, bg-light, bg-dark, text, text-inv)
- FR6: Color palette shall be optional; system provides near-black/near-white defaults when skipped
- FR7: Users shall pick colors from their desktop using the EyeDropper API (with fallback for unsupported browsers)
- FR8: Users shall select from 14 pre-designed component templates for preview
- FR9: Components shall render using user-defined typography and color tokens
- FR10: Users shall create 2-4 design variations with independent font/color configurations
- FR11: Users shall view variations side-by-side in a grid layout
- FR12: Users shall toggle between Grid View (components per variation) and Full Page View (all components stacked)
- FR13: User configuration shall persist to LocalStorage automatically
- FR14: Users shall reset/clear their configuration to start fresh

### Non Functional

- NFR1: Application shall be fully client-side with no backend dependencies
- NFR2: Application shall function offline after initial load (excluding Google Fonts fetch)
- NFR3: Initial page load shall complete in under 3 seconds on standard broadband
- NFR4: UI shall remain responsive during font loading (show loading states)
- NFR5: Uploaded font files shall be limited to 5MB maximum per file
- NFR6: Application shall support latest 2 versions of Chrome, Firefox, Safari, and Edge
- NFR7: Application shall be keyboard-navigable for all primary interactions
- NFR8: Color contrast in default UI shall meet WCAG AA standards

---

## User Interface Design Goals

### Overall UX Vision

A clean, professional interface with a **Sidebar + Canvas** layout. The sidebar contains all configuration controls (typography, colors, component selection). The canvas shows a real-time preview that updates as settings change. The experience should feel like a focused design tool, not a complex IDE.

### Key Interaction Paradigms

- **Real-time Preview:** Changes in sidebar immediately reflect in canvas
- **Progressive Disclosure:** Start simple (pick fonts), optionally add colors, then select components
- **Side-by-side Comparison:** Variations displayed as adjacent columns for direct comparison
- **Non-destructive Editing:** Easy to reset or switch between configurations

### Core Screens and Views

1. **Setup View (Default)** - Sidebar visible, single variation in canvas
2. **Comparison View** - Multi-column layout showing 2-4 variations side-by-side
3. **Full Page Preview** - All selected components stacked vertically per variation

### Accessibility: WCAG AA

- Keyboard navigation for all interactive elements
- Sufficient color contrast in UI chrome
- Focus indicators on interactive elements
- Screen reader labels for icon-only buttons

### Branding

- Modern, minimal aesthetic
- Neutral grays for UI chrome to not compete with user's color choices
- Clean sans-serif system font for UI (not user-selected fonts)
- Subtle shadows and borders for depth

### Target Device and Platforms

- **Primary:** Desktop web browsers (1024px+ viewport)
- **Secondary:** Tablet landscape (900px+)
- Mobile is out of scope for MVP

---

## Technical Assumptions

### Repository Structure: Single Repo

Standard single-repo SPA structure.

### Service Architecture

Static Single Page Application (SPA) with no backend. Hosted on **Vercel** with automatic deployments from Git.

### Tech Stack

- **Framework:** React 18+ with Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Font Loading:** Google Fonts API (client-side CSS injection)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Package Manager:** npm

### Testing Requirements

- **Unit Tests:** Vitest for utility functions and hooks
- **Component Tests:** React Testing Library for key components
- **E2E Tests:** Not required for MVP (manual testing sufficient)
- **Manual Testing:** Primary QA method

### Additional Technical Assumptions and Requests

- Google Fonts list shall be fetched once and cached in memory
- EyeDropper API shall be feature-detected; unsupported browsers show a color input fallback
- Uploaded fonts shall be loaded via FontFace API
- LocalStorage key: `font-previewer-state`
- Default colors: near-black `#1a1a1a`, near-white `#f5f5f5`

---

## Epics

1. **Epic 1: Foundation & Core Setup** - Establish project structure, routing, and base UI layout
2. **Epic 2: Typography System** - Font selection, Google Fonts integration, custom text, lorem ipsum
3. **Epic 3: Color Palette System** - Color picker, palette builder, token assignment, defaults
4. **Epic 4: Component Preview System** - 14 component templates, token-based rendering
5. **Epic 5: Comparison & Variations** - Multiple variations, side-by-side view, full page view
6. **Epic 6: Persistence & Polish** - LocalStorage, reset functionality, loading states, error handling

---

## Epic 1: Foundation & Core Setup

Establish the project infrastructure, base layout, and foundational components. This epic delivers a functional shell with Sidebar + Canvas layout and placeholder content.

### Story 1.1: Project Initialization

As a developer,
I want the project scaffolded with React, Vite, TypeScript, and Tailwind,
so that I have a working development environment.

#### Acceptance Criteria

- 1: Vite + React + TypeScript project created with `npm create vite@latest`
- 2: Tailwind CSS installed and configured with base styles
- 3: Zustand installed for state management
- 4: Lucide React installed for icons
- 5: ESLint and Prettier configured for code quality
- 6: Project runs with `npm run dev` and shows a placeholder page
- 7: Build succeeds with `npm run build`

### Story 1.2: Base Layout Structure

As a user,
I want to see a Sidebar + Canvas layout,
so that I can configure settings on the left and see previews on the right.

#### Acceptance Criteria

- 1: App displays a fixed-width sidebar (320px) on the left
- 2: Canvas area fills remaining viewport width
- 3: Layout is responsive down to 900px viewport (sidebar collapses to icon-only or stacks below)
- 4: Sidebar has sections for Typography, Colors, and Components (placeholder content)
- 5: Canvas shows a centered placeholder message

### Story 1.3: Global State Store Setup

As a developer,
I want a Zustand store managing typography, colors, and component state,
so that all parts of the app share configuration data.

#### Acceptance Criteria

- 1: Zustand store created at `src/store/useDesignStore.ts`
- 2: Store contains typography state (5 tokens with font, text, source properties)
- 3: Store contains color state (palette array, token assignments)
- 4: Store contains component selection state (array of selected component IDs)
- 5: Store contains variation state (array of variation configs)
- 6: Actions exist to update each state slice
- 7: Store is typed with TypeScript interfaces

---

## Epic 2: Typography System

Enable users to configure typography tokens with Google Fonts or uploaded fonts, enter custom text, and generate lorem ipsum.

### Story 2.1: Typography Token UI

As a user,
I want to see input fields for H1, H2, H3, P1, P2 typography tokens,
so that I can configure my typography system.

#### Acceptance Criteria

- 1: Sidebar Typography section displays 5 token rows (H1, H2, H3, P1, P2)
- 2: Each row shows the token label and current font selection
- 3: Each row has a dropdown/button to open font selection
- 4: Each row has a text input for custom preview text
- 5: Tokens are visually distinguished (H1 as primary, P2 as smallest)

### Story 2.2: Google Fonts Integration

As a user,
I want to search and select fonts from Google Fonts,
so that I can use web fonts in my design system.

#### Acceptance Criteria

- 1: Font selector displays a searchable list of Google Fonts
- 2: Font list is fetched from Google Fonts API and cached in memory
- 3: Selecting a font updates the token in the store
- 4: Selected font is loaded via dynamic CSS link injection
- 5: Font loading state is indicated (spinner or text)
- 6: Canvas preview updates when font loads

### Story 2.3: Local Font Upload

As a user,
I want to upload font files from my computer,
so that I can test custom or purchased fonts.

#### Acceptance Criteria

- 1: Each token row has an "Upload" button alongside Google Fonts selector
- 2: Upload accepts .ttf, .otf, .woff, .woff2 files
- 3: Uploaded files are limited to 5MB
- 4: Font is loaded using FontFace API
- 5: Uploaded font name appears in the token's font selection
- 6: Canvas preview updates when uploaded font loads
- 7: Error message shown for invalid or oversized files

### Story 2.4: Custom Text Input

As a user,
I want to enter custom preview text for each token,
so that I can see how my actual content looks with these fonts.

#### Acceptance Criteria

- 1: Each token row has a text input field
- 2: Text input has placeholder text suggesting example content
- 3: Typing updates the store in real-time
- 4: Canvas preview shows the custom text (or default lorem if empty)
- 5: Text input supports multiline for paragraph tokens (P1, P2)

### Story 2.5: Lorem Ipsum Generator

As a user,
I want to generate random lorem ipsum text,
so that I can quickly fill preview content.

#### Acceptance Criteria

- 1: Each token row has a "Random" button to generate lorem ipsum
- 2: Clicking Random fills the text input with appropriate length lorem (short for headings, longer for paragraphs)
- 3: After generation, "Longer" and "Shorter" buttons appear
- 4: Clicking Longer adds more lorem ipsum text
- 5: Clicking Shorter reduces lorem ipsum text (minimum 3 words)
- 6: Lorem ipsum is generated client-side (no API call)

---

## Epic 3: Color Palette System

Enable users to build a color palette, assign colors to semantic tokens, and use a desktop color picker.

### Story 3.1: Color Palette Builder UI

As a user,
I want to add colors to a palette,
so that I can define my color scheme.

#### Acceptance Criteria

- 1: Sidebar Colors section displays the current palette (1-8 swatches)
- 2: An "Add Color" button adds a new color (default: random or gray)
- 3: Each swatch is clickable to open a color picker/input
- 4: Each swatch has a delete button (except when only 1 color remains)
- 5: Colors update in the store when changed
- 6: Palette is limited to maximum 8 colors (Add button disabled at limit)

### Story 3.2: Color Picker Input

As a user,
I want to pick colors using a color picker,
so that I can precisely choose my palette colors.

#### Acceptance Criteria

- 1: Clicking a color swatch opens a color picker popover
- 2: Color picker allows hex input, HSL sliders, or visual picker
- 3: Color changes are reflected in real-time
- 4: Clicking outside the popover closes it
- 5: Keyboard navigation works (Tab, Enter, Escape)

### Story 3.3: Desktop Eyedropper Tool

As a user,
I want to pick colors from anywhere on my screen,
so that I can sample colors from existing designs.

#### Acceptance Criteria

- 1: An "Eyedropper" button appears near the color palette
- 2: Clicking Eyedropper activates the browser's EyeDropper API
- 3: Selected color is added to the palette
- 4: Browser support is detected; unsupported browsers show the button disabled with tooltip
- 5: Any EyeDropper errors are handled gracefully

### Story 3.4: Color Token Assignment

As a user,
I want to assign palette colors to semantic tokens,
so that my component previews use consistent colors.

#### Acceptance Criteria

- 1: Colors section shows 6 token assignment rows (main, alt, bg-light, bg-dark, text, text-inv)
- 2: Each row has a dropdown to select from palette colors
- 3: Token assignments update in the store
- 4: Unassigned tokens fall back to first suitable palette color
- 5: Canvas preview updates when token assignments change

### Story 3.5: Default Color Palette

As a user,
I want the color palette to be optional with sensible defaults,
so that I can preview typography without configuring colors.

#### Acceptance Criteria

- 1: If user has not added colors, defaults are applied: near-black (#1a1a1a), near-white (#f5f5f5)
- 2: Default token assignments: main=#1a1a1a, alt=#1a1a1a, bg-light=#f5f5f5, bg-dark=#1a1a1a, text=#1a1a1a, text-inv=#f5f5f5
- 3: User can clear palette to restore defaults
- 4: Defaults are visually indicated as "default" in the UI

---

## Epic 4: Component Preview System

Build 14 component templates that render with user-defined typography and color tokens.

### Story 4.1: Component Selection UI

As a user,
I want to select which components to preview,
so that I can focus on relevant design contexts.

#### Acceptance Criteria

- 1: Sidebar Components section lists all 14 component templates
- 2: Components are grouped by category (Marketing, Content, UI)
- 3: Each component has a checkbox or toggle for selection
- 4: Selected components appear in the canvas preview
- 5: At least one component must be selected (default: Hero)

### Story 4.2: Marketing Components

As a user,
I want to preview my design in marketing page components,
so that I can evaluate landing page typography and colors.

#### Acceptance Criteria

- 1: Hero component renders with H1 (headline), P1 (subtext), and a CTA button using color tokens
- 2: Features Grid component renders 3 feature cards with H3 (title) and P2 (description)
- 3: Testimonial component renders with P1 (quote), P2 (author name), and color tokens
- 4: Pricing Table component renders 2-3 tier cards with H2 (tier name), P1 (price), P2 (features list)
- 5: CTA Banner component renders with H2 (headline) and button using color tokens
- 6: Footer component renders with P2 (links, copyright) using color tokens

### Story 4.3: Content Components

As a user,
I want to preview my design in blog/article components,
so that I can evaluate content typography.

#### Acceptance Criteria

- 1: Article Header component renders with H1 (title), P2 (meta info like date/author)
- 2: Article Body component renders with H2, H3 (section headings), P1 (body text), and a blockquote
- 3: Blog Card component renders with H3 (title), P2 (excerpt, date), and thumbnail placeholder
- 4: Author Bio component renders with H3 (name), P2 (bio text), and avatar placeholder

### Story 4.4: UI Element Components

As a user,
I want to preview my design in UI element components,
so that I can evaluate interface typography and colors.

#### Acceptance Criteria

- 1: Navigation component renders with logo placeholder, P2 (menu items), and button using color tokens
- 2: Product Card component renders with H3 (product name), P2 (price), button, and image placeholder
- 3: User Profile Card component renders with H3 (name), P2 (stats/bio), and avatar placeholder
- 4: Form Section component renders with P2 (labels), input fields, and submit button using color tokens

### Story 4.5: Token-Based Component Rendering

As a developer,
I want components to consume typography and color tokens from the store,
so that preview updates automatically when settings change.

#### Acceptance Criteria

- 1: All components read typography tokens from the Zustand store
- 2: All components read color tokens from the Zustand store
- 3: Typography is applied via inline styles or CSS variables
- 4: Colors are applied via inline styles or CSS variables
- 5: Components re-render when store values change
- 6: Font loading states are handled (fallback font until loaded)

---

## Epic 5: Comparison & Variations

Enable users to create multiple design variations and compare them side-by-side.

### Story 5.1: Variation Management

As a user,
I want to create multiple design variations,
so that I can compare different font/color combinations.

#### Acceptance Criteria

- 1: An "Add Variation" button creates a new variation (max 4)
- 2: Each variation has independent typography and color settings
- 3: Variations are numbered or named (Variation 1, Variation 2, etc.)
- 4: A "Delete Variation" button removes a variation (minimum 1 must remain)
- 5: Sidebar shows which variation is currently being edited
- 6: Clicking a variation tab/button switches the sidebar to edit that variation

### Story 5.2: Side-by-Side Grid View

As a user,
I want to see variations displayed side-by-side,
so that I can directly compare design choices.

#### Acceptance Criteria

- 1: Canvas displays variation columns (2 columns for 2 variations, 3 for 3, 4 for 4)
- 2: Each column shows the same selected components with that variation's settings
- 3: Columns have equal width and scroll independently
- 4: Variation name/number is displayed at the top of each column
- 5: Grid view is the default view mode

### Story 5.3: Full Page View Toggle

As a user,
I want to toggle to a full page view,
so that I can see components stacked vertically as a complete page.

#### Acceptance Criteria

- 1: A "Full Page" toggle button appears in the canvas header
- 2: Full Page view shows all selected components stacked vertically
- 3: In multi-variation mode, full pages are displayed side-by-side
- 4: Toggle state is preserved when switching variations
- 5: User can switch back to Grid View

---

## Epic 6: Persistence & Polish

Add LocalStorage persistence, reset functionality, loading states, and error handling.

### Story 6.1: LocalStorage Persistence

As a user,
I want my configuration to persist across browser sessions,
so that I don't lose my work when I close the tab.

#### Acceptance Criteria

- 1: Store state is serialized to LocalStorage on every change
- 2: On app load, state is hydrated from LocalStorage if available
- 3: Uploaded fonts are stored as base64 or blob URLs (handled separately from JSON state)
- 4: LocalStorage key is `font-previewer-state`
- 5: Corrupted LocalStorage data is handled gracefully (reset to defaults)

### Story 6.2: Reset Configuration

As a user,
I want to reset my configuration to defaults,
so that I can start fresh.

#### Acceptance Criteria

- 1: A "Reset" button appears in the sidebar header
- 2: Clicking Reset shows a confirmation dialog
- 3: Confirming clears LocalStorage and resets store to defaults
- 4: Default state includes: 1 variation, default fonts (system), default colors, Hero component selected

### Story 6.3: Loading States & Error Handling

As a user,
I want to see loading indicators and error messages,
so that I understand what's happening and can recover from issues.

#### Acceptance Criteria

- 1: Font loading shows a spinner or skeleton in the preview
- 2: Google Fonts API errors show a user-friendly message with retry option
- 3: File upload errors (size, format) show inline validation messages
- 4: EyeDropper errors show a toast notification
- 5: Canvas shows a helpful empty state when no components are selected

### Story 6.4: Final UI Polish

As a user,
I want the interface to feel polished and professional,
so that I enjoy using the tool.

#### Acceptance Criteria

- 1: Smooth transitions when switching views or variations
- 2: Consistent spacing, colors, and typography in UI chrome
- 3: Hover states on all interactive elements
- 4: Focus states meet accessibility requirements
- 5: Responsive behavior at 900px breakpoint
- 6: No console errors in production build

---

## Change Log

| Change | Date | Version | Description | Author |
| ------ | ---- | ------- | ----------- | ------ |
| Initial creation | 2025-12-22 | 1.0 | Complete PRD with 6 epics and 20 stories | Claude (BMAD Analyst) |

---

## Checklist Results Report

PRD has been created following BMAD methodology. All epics are logically sequential and stories are sized for single-session AI agent execution.

---

## Design Architect Prompt

This PRD provides the complete requirements for Font Previewer. Please review and create the UI/UX Specification focusing on the Sidebar + Canvas layout, component templates, and comparison views.

---

## Architect Prompt

This PRD provides the complete requirements for Font Previewer. Please create the Frontend Architecture Document specifying React component structure, Zustand store design, Google Fonts integration, and component template implementation patterns.
