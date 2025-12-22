# Font Previewer - Future Updates Roadmap

This document tracks planned features and improvements for the Font Previewer app.

---

## 🐛 Known Bugs

### Dark Mode Toggle Not Working
- **Issue**: [#1](https://github.com/dreemanuel/font-previewer/issues/1)
- **Status**: Investigating
- **Description**: Toggle changes icon but UI stays in dark mode. Code is working (class toggles correctly), suspected browser/OS override or CSS issue.

---

## 🚀 Planned Features

### Typography Enhancements

#### Font Weight Selector
- Add weight options (100-900) for each typography token
- Show available weights based on selected font
- Preview weights in real-time

#### Line Height Control
- Adjustable line-height for each token
- Presets: tight, normal, relaxed, loose
- Custom numeric input

#### Letter Spacing Control
- Adjustable letter-spacing/tracking
- Presets and custom values
- Useful for headings vs body text

#### Variable Fonts Support
- Detect and support variable font axes
- Sliders for weight, width, slant, etc.
- Full variable font exploration

---

### Export & Sharing

#### CSS Export
- Export as CSS custom properties (variables)
- Export as plain CSS
- Export as SCSS variables
- Copy to clipboard or download file

#### Design Tokens Export
- JSON format for design systems
- Figma Tokens compatible format
- Style Dictionary format

#### Share Variations
- Generate shareable URL with encoded settings
- Import settings from URL
- Quick sharing for collaboration

#### Image/PDF Export
- Screenshot current preview
- Export as PDF for presentations
- High-resolution export options

---

### Component Templates

#### More Template Categories
- **Marketing**: Landing pages, CTAs, banners
- **Dashboard**: Stats cards, tables, charts
- **E-commerce**: Product listings, cart, checkout
- **Blog**: Article layouts, comment sections
- **App UI**: Login forms, settings, profiles

#### Custom Templates
- Upload custom HTML templates
- Define typography token mappings
- Save custom templates locally

---

### Color Features

#### Color Harmony Generator
- Complementary colors
- Analogous colors
- Triadic/tetradic schemes
- Auto-generate from base color

#### Accessibility Checker
- WCAG contrast ratio checking
- AA/AAA compliance indicators
- Suggestions for improving contrast

#### Color Palette Import
- Import from Coolors
- Import from Adobe Color
- Import from image (color extraction)

---

### Font Discovery

#### Font Pairing Suggestions
- AI-powered pairing recommendations
- Popular pairing presets
- Pairing by style/mood

#### Recently Used Fonts
- Track recently selected fonts
- Quick access in font selector
- Favorites/bookmarks

#### Font Preview in Selector
- Live preview text in font list
- Adjustable preview size
- Custom preview text

---

### Preview Enhancements

#### Responsive Preview
- Mobile/tablet/desktop breakpoints
- Custom viewport sizes
- Side-by-side responsive comparison

#### Animation Preview
- Preview text with animations
- Fade, slide, typewriter effects
- Test reading experience

#### Print Stylesheet Preview
- Preview print-optimized styles
- Adjust for print media

---

### Authentication & User Accounts

#### Social Sign-In (SSO)
- Google OAuth sign-in
- GitHub OAuth sign-in
- Optional - users can still use app without account

#### User Dashboard
- View all saved combinations
- Organize with folders/tags
- Quick access to recent work

#### Cloud Save & Sync
- Save variations to user account
- Sync across devices automatically
- Offline support with sync on reconnect

#### Sharing & Collaboration
- Share combinations via public link
- Private sharing with specific users
- Fork/duplicate shared combinations
- Community gallery of popular combinations

---

### Data & Persistence

#### Import/Export Configurations
- Export all settings as JSON
- Import previous configurations
- Backup and restore

#### Version History
- Track changes to variations
- Restore previous versions
- Compare versions

---

## 📋 Priority Order (Suggested)

### Phase 1 - Core Improvements
1. ~~Font size selector~~ ✅ (Completed)
2. ~~Google Fonts API integration~~ ✅ (Completed)
3. Fix dark mode toggle bug
4. Font weight selector
5. CSS export

### Phase 2 - Enhanced Controls
6. Line height control
7. Letter spacing control
8. More component templates
9. Recently used fonts

### Phase 3 - Sharing & Export
10. Share via URL
11. Design tokens export
12. Image export

### Phase 4 - Advanced Features
13. Color harmony generator
14. Accessibility checker
15. Font pairing suggestions
16. Responsive preview

### Phase 5 - User Accounts & Social
17. Google & GitHub SSO authentication
18. Cloud save (database backend)
19. User dashboard
20. Public sharing & community gallery

---

## 💡 Ideas for Later

- Browser extension for testing fonts on any website
- Figma plugin integration
- VS Code extension
- CLI tool for generating CSS from config
- API for programmatic access
- Team collaboration features
- Font comparison mode (side-by-side fonts)
- Typography scale generator (modular scale)
- Reading time estimator based on font/size
- Dyslexia-friendly font suggestions

---

## Contributing

Feel free to open issues or PRs for any of these features! Priority will be given based on user feedback and practical utility.

---

*Last updated: December 2024*
