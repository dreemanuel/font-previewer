# DEVLOG - December 22, 2025 - Dark Mode, Font Sizes & Google Fonts API

## Session Information
- **Date:** December 22, 2025
- **Topics:** Dark mode toggle, font size controls, Google Fonts API integration
- **Status:** COMPLETE (with 1 known bug)
- **Branch:** main
- **Duration:** ~2 hours

## What Was Accomplished

- ✅ Implemented dark mode toggle with localStorage persistence
- ✅ Added font size selector for all typography tokens (12px - 96px)
- ✅ Integrated Google Fonts API (1900+ fonts available)
- ✅ Added category filters (serif, sans-serif, display, handwriting, monospace)
- ✅ Fixed system-ui font loading error (was trying to load from Google Fonts)
- ✅ Added data migration for existing localStorage (font sizes)
- ✅ Created GitHub issue for dark mode bug (#1)
- ✅ Created ROADMAP.md with future feature ideas
- ✅ Renamed master branch to main
- ✅ Deployed to Vercel (https://font-previewer-coral.vercel.app)
- ✅ Added Google Fonts API key to Vercel environment
- ✅ Created comprehensive README with user guide
- 🐛 Dark mode toggle bug remains (UI doesn't visually change despite code working)

## Features Delivered

### 1. Dark Mode Toggle
- **File:** `src/hooks/useDarkMode.ts`
- **Lines:** 1-56
- **Description:** Custom hook for dark/light theme switching
- **Implementation:**
  - Uses Tailwind's `darkMode: 'class'` strategy
  - Persists preference to localStorage
  - Respects system `prefers-color-scheme` as default
  - Toggle button in sidebar header (Moon/Sun icons)

### 2. Font Size Selector
- **File:** `src/components/typography/TokenRow.tsx`
- **Lines:** 88-100
- **Description:** Dropdown to select font size for each typography token
- **Options:** 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96px
- **Defaults:** H1=48px, H2=36px, H3=24px, P1=18px, P2=14px

### 3. Google Fonts API Integration
- **Files:**
  - `src/lib/googleFontsApi.ts` (1-103)
  - `src/hooks/useGoogleFontsApi.ts` (1-85)
  - `src/components/typography/FontSelector.tsx` (updated)
- **Description:** Full Google Fonts library with search and category filters
- **Features:**
  - 1900+ fonts available
  - Category filters: All, Sans Serif, Serif, Display, Handwriting, Monospace
  - Font count display
  - Falls back to curated 65-font list if no API key

### 4. Data Migration
- **File:** `src/store/useDesignStore.ts`
- **Lines:** 174-186
- **Description:** Migrates existing localStorage data to include font sizes
- **Version:** Storage version bumped to 2

## Bugs Fixed

### Bug #1: System-UI Font Loading Error
- **Symptom:** Console error "Failed to load font: system-ui" and MIME type mismatch
- **Root Cause:** Code was trying to load 'system-ui' from Google Fonts API, but it's a CSS keyword
- **Solution:** Added checks in `loadGoogleFont()` and `FontSelector` to skip system fonts
- **Files Modified:**
  - `src/lib/fonts.ts:77-81`
  - `src/components/typography/FontSelector.tsx:64-66`
- **Testing:** Verified no more console errors when selecting System Font

## Known Issues

### Issue #1: Dark Mode Toggle Not Visually Working
- **GitHub Issue:** [#1](https://github.com/dreemanuel/font-previewer/issues/1)
- **Symptom:** Toggle changes icon, localStorage updates, but UI stays dark
- **Console Evidence:** Code IS working correctly - class toggles properly
- **Suspected Causes:**
  - Browser extension (Dark Reader)
  - Browser flag `chrome://flags/#enable-force-dark`
  - OS-level dark mode override
- **Status:** Logged as GitHub issue for future investigation

## Files Modified

**Summary:**
```
.env.example (new, +7 lines)
.env (new, +2 lines) - gitignored
ROADMAP.md (new, +220 lines)
README.md (new, +126 lines)
tailwind.config.js (+1 line)
src/hooks/useDarkMode.ts (new, +56 lines)
src/hooks/useGoogleFontsApi.ts (new, +85 lines)
src/hooks/useFontPreloader.ts (new, +33 lines)
src/lib/googleFontsApi.ts (new, +103 lines)
src/lib/fonts.ts (+5 lines)
src/store/types.ts (+4 lines)
src/store/defaults.ts (+5 lines)
src/store/useDesignStore.ts (+25 lines)
src/components/typography/TokenRow.tsx (+20 lines)
src/components/typography/FontSelector.tsx (rewritten, 246 lines)
src/components/typography/TypographySection.tsx (+8 lines)
src/components/layout/Sidebar.tsx (+15 lines)
src/components/layout/AppLayout.tsx (+1 line)
src/components/layout/Canvas.tsx (dark mode classes)
+ 20 other component files (dark mode classes added)
```

## Git Status

- **Last Commit:** `610f607` - "docs: add README with user guide"
- **Current Branch:** `main`
- **Uncommitted Changes:** None (clean working tree)
- **Remote:** Pushed to origin/main

## Deployment

- **Platform:** Vercel
- **URL:** https://font-previewer-coral.vercel.app
- **Status:** Live and working
- **Environment Variables:** `VITE_GOOGLE_FONTS_API_KEY` configured
- **Auto-Deploy:** Enabled (pushes to main auto-deploy)

## Documentation Created

1. **ROADMAP.md** - Future features roadmap including:
   - Font weight, line height, letter spacing controls
   - CSS/design tokens export
   - Google & GitHub SSO authentication
   - Cloud save & sharing
   - Community gallery

2. **README.md** - Project documentation with:
   - Feature overview
   - Installation guide
   - User guide (typography, colors, components, variations)
   - Tech stack
   - Deployment instructions

3. **GitHub Issue #1** - Dark mode bug tracking

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Icons | Lucide React |
| Deployment | Vercel |

## Next Steps (For Future Sessions)

### Priority 1: Fix Dark Mode Bug
- Test in incognito mode without extensions
- Check if browser/OS is forcing dark mode
- Verify Tailwind dark mode CSS is generated correctly

### Priority 2: Phase 1 Features (from ROADMAP.md)
1. Font weight selector
2. CSS export functionality
3. Line height control
4. Letter spacing control

### Priority 3: Phase 2+ Features
- More component templates
- Share via URL
- Design tokens export

## Quick Start for Next Session

**Commands:**
```bash
cd /home/andre/Documents/_personal-projects/font-previewer
npm run dev
```

**What to read first:**
1. This DEVLOG
2. `/ROADMAP.md` - Feature roadmap
3. GitHub Issue #1 - Dark mode bug details

**Testing URLs:**
- Local: http://localhost:5173
- Production: https://font-previewer-coral.vercel.app

---

**Session completed:** December 22, 2025

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
