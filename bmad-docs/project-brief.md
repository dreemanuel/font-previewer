# Project Brief: Font Previewer

## Introduction / Problem Statement

Graphic designers and web developers frequently need to evaluate typography and color choices before implementing them in projects. Currently, this process requires jumping between multiple disconnected tools:
- Font pairing tools (Fontjoy, FontPair) for typography selection
- Color palette generators (Coolors, Khroma) for color schemes
- Manual mockups or code prototypes to see how they work together

This fragmented workflow is inefficient and makes it difficult to compare design system variations side-by-side. **Font Previewer** solves this by providing a unified tool where users can:
1. Define typography tokens (H1, H2, H3, P1, P2)
2. Build color palettes with semantic tokens
3. Preview both in real component contexts
4. Compare multiple design variations side-by-side

## Vision & Goals

- **Vision:** Become the go-to tool for designers and developers to quickly prototype and compare typography and color systems before committing to implementation.

- **Primary Goals:**
  - Goal 1: Enable users to define and preview a complete typography system (5 heading/paragraph tokens) using Google Fonts or uploaded fonts
  - Goal 2: Allow users to build color palettes (1-8 colors) and assign them to semantic design tokens
  - Goal 3: Provide 14 pre-designed component templates that render with user-defined typography and colors
  - Goal 4: Support side-by-side comparison of 2-4 design variations
  - Goal 5: Persist user work in LocalStorage for session continuity

- **Success Metrics (Initial Ideas):**
  - Users can create a complete design system preview in under 5 minutes
  - Users can compare 2+ variations without page reloads or navigation
  - Zero backend infrastructure costs (fully client-side)

## Target Audience / Users

**Primary Users:**
1. **Graphic Designers** - Need to prototype typography and color choices before creating final mockups in Figma/Sketch
2. **Web Developers** - Want to test font pairings and color schemes before writing CSS

**User Characteristics:**
- Familiar with design terminology (tokens, palettes, typography hierarchy)
- Use Google Fonts regularly
- May have local fonts they want to test
- Value speed and visual feedback over complex configuration

## Key Features / Scope (High-Level Ideas for MVP)

### Typography Setup
- Feature 1: Typography token configuration (H1, H2, H3, P1, P2)
- Feature 2: Google Fonts integration with searchable dropdown
- Feature 3: Local font file upload support
- Feature 4: Custom text input per token
- Feature 5: Lorem ipsum generator with length controls (Longer/Shorter)

### Color Palette Setup
- Feature 6: Color palette builder (1-8 colors)
- Feature 7: Desktop color picker (eyedropper tool)
- Feature 8: Color token assignment (main, alt, bg-light, bg-dark, text, text-inv)
- Feature 9: Optional palette - defaults to near-black/near-white if skipped

### Component Preview
- Feature 10: 14 pre-designed component templates across 3 categories
- Feature 11: Components render with user-defined typography and colors
- Feature 12: Grid View - selected components displayed per variation

### Comparison System
- Feature 13: Create 2-4 design variations
- Feature 14: Side-by-side variation columns
- Feature 15: Full Page View toggle - all components stacked vertically

### Persistence
- Feature 16: LocalStorage persistence for current session

## Post MVP Features / Scope and Ideas

- Feature: User accounts for saving font combinations and palettes
- Feature: Workspace + Canvas mode (Figma-like drag-and-drop interface)
- Feature: Custom HTML/CSS component templates
- Feature: Auto-generate complementary colors from 1+ selected colors
- Feature: Export options (CSS variables, PDF report, shareable links)
- Feature: Responsive preview modes (mobile, tablet, desktop)
- Feature: Font weight/style variations per token

## Known Technical Constraints or Preferences

- **Constraints:**
  - Must be fully client-side (no backend for MVP)
  - Must work offline after initial load
  - Must support modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
  - Desktop color picker requires browser EyeDropper API (Chrome 95+, Edge 95+; graceful fallback for unsupported browsers)

- **Initial Architectural Preferences:**
  - **Repository Structure:** Single repo (not a monorepo)
  - **Service Architecture:** Static SPA (no server)
  - **Framework:** React + Vite
  - **Styling:** Tailwind CSS
  - **State Management:** Zustand (lightweight, fits client-side-only architecture)
  - **Language:** TypeScript
  - **Hosting:** Vercel (zero-config deployment for Vite apps)

- **Risks:**
  - Google Fonts API rate limits (mitigate with client-side caching)
  - EyeDropper API browser support (Chrome/Edge only; provide color input fallback)
  - Large font file uploads may impact performance (limit file size, lazy load)

- **User Preferences:**
  - Sidebar + Canvas layout for real-time preview
  - Near-black (#1a1a1a) and near-white (#f5f5f5) as default colors, not pure black/white
  - No typography set saving in MVP (direct configuration only)

## Relevant Research

See [Brainstorming Session - December 22, 2025](./brainstorming-session-2025-12-22.md) for:
- Full competitive analysis
- Feature exploration and decision rationale
- Component template breakdown

---

## PM Prompt

This Project Brief provides the full context for Font Previewer. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements as your mode 1 programming allows.
