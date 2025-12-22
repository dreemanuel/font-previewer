# Font Previewer - Brainstorming Session

**Date:** December 22, 2025
**Participants:** User (Product Owner), Claude (BMAD Analyst Agent)
**Phase:** Brainstorming → Project Briefing

---

## Session Overview

This document records the brainstorming session that established the vision, scope, and key decisions for the Font Previewer project.

---

## Initial Vision Statement

> "I would like to create a web app that acts as a preview tool for fonts, font pairings, and colors. The target users are graphic designers and web developers."

---

## Competitive Landscape Analysis

### Font Pairing Tools Reviewed

| Tool | Approach | Strengths | Gaps |
|------|----------|-----------|------|
| [Fontjoy](https://fontjoy.com/) | AI-powered one-click generation | Fast discovery, ML-based | No color integration, limited customization |
| [FontPair](https://www.fontpair.co/) | Curated pairings gallery | Hand-picked quality, Figma plugin | Static examples, no side-by-side comparison |
| [Pair & Compare](https://www.pairandcompare.net/) | Interactive playground | Full control, local fonts support | Font-only, no color/component preview |
| [FontVS](https://fontvs.com/) | Side-by-side comparison | Drag-drop uploads, variable font axes | No design context, just raw text |
| [Typetester](https://www.typetester.org/) | Column comparison | 2800+ fonts, professional | Dated UI, no component previews |

### Color Palette Tools Reviewed

| Tool | Approach | Strengths | Gaps |
|------|----------|-----------|------|
| [Coolors](https://coolors.co/) | Spacebar generator + visualizer | Fast, accessibility checks, real design preview | Typography is secondary |
| [Khroma](https://www.khroma.co/) | AI learns your preferences | Personalized, shows typography samples | Separate from font selection |
| [PaletteMaker](https://palettemaker.com/) | Preview on real designs | Logo, UI, poster templates | Fixed templates, no font control |

### Key Market Gap Identified

**Nobody combines all three:**
1. Typography system (H1-P2 tokens)
2. Color palette with tokens (main, alt, bg-light, etc.)
3. Real component previews with side-by-side comparison

This is the differentiator. Designers currently jump between 2-3 tools.

---

## Feature Requirements Discussed

### Typography System
- **Design Tokens:** H1, H2, H3, P1, P2
- **Font Sources:** Google Fonts dropdown OR local file upload
- **Custom Text:** User can enter custom text for any token
- **Lorem Ipsum Generator:** Random text generator with "Longer" and "Shorter" buttons that appear after generation

### Color Palette System
- **Color Count:** 1-8 colors
- **Color Picker:** Desktop color picker tool (pick from screen)
- **Optional Feature:** Color palette can be left blank; defaults to near-black and near-white
- **Color Tokens (Fixed Set):**
  - `main` - Primary brand color
  - `alt` - Secondary/accent color
  - `bg-light` - Light background
  - `bg-dark` - Dark background
  - `text` - Primary text color
  - `text-inv` - Inverted text (for dark backgrounds)

### Component Preview System
- **Pre-designed Templates:** 14 component templates shipping with MVP
- **Categories:**
  - Marketing/Landing Page (Hero, Features, Testimonial, Pricing, CTA, Footer)
  - Content/Blog (Article Header, Article Body, Blog Card, Author Bio)
  - UI Elements (Navigation, Product Card, User Profile, Form Section)

### Comparison System
- **Variations:** 2-4 side-by-side columns
- **Each variation:** Completely different font/color combo
- **View Modes:** Grid View (components stacked) and Full Page View

---

## UI/UX Structure Explored

### Three Options Considered

**Option A: "Component Gallery" Approach**
- Select component type → Select variations → Grid of cards
- Pros: Focused, clean comparison
- Cons: One component type at a time

**Option B: "Design System Preview" Approach**
- Full page template showing all tokens
- Compare by duplicating entire page
- Pros: See everything in context
- Cons: Overwhelming, harder to isolate changes

**Option C: "Workspace + Canvas" Approach (Figma-like)**
- Drag-and-drop component blocks onto canvas
- Fork to new variations, compare in tabs
- Pros: Maximum flexibility
- Cons: Higher complexity, longer learning curve

### Decision: Hybrid A+B for MVP

**"Focused Component Grid with Full Page Preview"**

Flow:
1. Setup Phase (token inputs - fonts + colors)
2. Component Selection - Pick 1-3 component types
3. Variation Builder - Choose 2-4 columns
4. Grid Preview - Side-by-side components
5. Full Page Mode - Toggle to see all stacked

**Future Enhancement:** Option C as toggleable advanced mode

---

## Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Layout | Sidebar + Canvas | Designer-friendly, real-time preview |
| Color Palette | Optional | Not all users need it; defaults provided |
| Default Colors | Near-black, near-white | Avoid pure #000000 and #FFFFFF |
| Typography Sets | No saving | Keep MVP simple |
| Color Tokens | Fixed set of 6 | Consistency, simplicity |
| Variations | Different combos | Each variation = unique font+color set |
| Components | 14 pre-designed | Covers common use cases |
| Custom Components | Future feature | Users can add HTML/CSS later |
| Export | Not needed | MVP is for preview only |
| Responsive Preview | Not needed | Desktop-focused tool |
| Collaboration | Solo tool | No sharing features |
| Persistence | LocalStorage | With future account upgrade path |

---

## Component Templates Finalized

### Marketing/Landing Page (6)
1. **Hero Section** - Large headline, subtext, CTA button
2. **Features Grid** - 3-4 feature cards with icons
3. **Testimonial** - Quote, author, photo
4. **Pricing Table** - 2-3 tier comparison
5. **CTA Banner** - Bold call-to-action strip
6. **Footer** - Links, copyright, social icons

### Content/Blog (4)
7. **Article Header** - Title, meta, featured image
8. **Article Body** - H2, H3, paragraphs, blockquote
9. **Blog Card** - Thumbnail, title, excerpt, date
10. **Author Bio** - Avatar, name, description

### UI Elements (4)
11. **Navigation Bar** - Logo, menu items, buttons
12. **Product Card** - Image, title, price, button
13. **User Profile Card** - Avatar, name, stats
14. **Form Section** - Labels, inputs, button

---

## Out of Scope (MVP)

- Export/download features
- Responsive/mobile previews
- Collaboration/team sharing
- User accounts (LocalStorage only for MVP)
- Custom HTML/CSS component templates
- Auto-generate palette from existing colors

---

## Future Enhancements Identified

1. **Workspace + Canvas Mode** - Figma-like drag-and-drop interface
2. **User Accounts** - Saved preferences and font combinations
3. **Custom Components** - User-defined HTML/CSS templates
4. **Auto-generate Palette** - Suggest colors based on 1+ selected colors
5. **Export Features** - CSS variables, PDF report, shareable links

---

## Next Steps

Proceed to Project Briefing Phase:
1. Create Project Brief document
2. Create PRD with epics and stories
3. Create Frontend Architecture spec
4. Break down into development stories

---

## Sources Referenced

- [Fontjoy](https://fontjoy.com/)
- [FontPair](https://www.fontpair.co/)
- [Pair & Compare](https://www.pairandcompare.net/)
- [FontVS](https://fontvs.com/)
- [Typetester](https://www.typetester.org/)
- [Coolors](https://coolors.co/)
- [Khroma](https://www.khroma.co/)
- [PaletteMaker](https://palettemaker.com/)
