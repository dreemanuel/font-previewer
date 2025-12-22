# Font Previewer

A visual tool for previewing and comparing typography combinations across real UI components. Test Google Fonts, local fonts, and color palettes to create cohesive design systems.

**Live Demo:** [font-previewer-coral.vercel.app](https://font-previewer-coral.vercel.app)

## Features

- **1900+ Google Fonts** - Full Google Fonts library with category filters
- **Local Font Upload** - Test your own .ttf, .otf, .woff, .woff2 files
- **Typography Tokens** - Configure H1, H2, H3, P1, P2 with different fonts and sizes
- **Color Palette Builder** - Create palettes with color picker or eyedropper
- **14 UI Templates** - Preview fonts across real-world components (hero, nav, cards, forms, etc.)
- **Multiple Variations** - Create up to 4 variations and compare side-by-side
- **Auto-Save** - All settings persist to localStorage

## Quick Start

```bash
# Clone the repo
git clone https://github.com/dreemanuel/font-previewer.git
cd font-previewer

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Enable Full Google Fonts Library (Optional)

By default, the app uses a curated list of 65 popular fonts. To access all 1900+ fonts:

1. Get a free API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Web Fonts Developer API"
3. Create `.env` file:
   ```
   VITE_GOOGLE_FONTS_API_KEY=your_api_key_here
   ```
4. Restart the dev server

## User Guide

### Setting Up Typography

1. **Select a Font** - Click the font dropdown for any token (H1, H2, H3, P1, P2)
2. **Choose Size** - Use the size dropdown (12px - 96px)
3. **Add Custom Text** - Type in the text field or click the dice icon for lorem ipsum
4. **Upload Local Fonts** - Click the upload icon to test your own font files

### Building Color Palettes

1. **Add Colors** - Click "Add Color" in the Colors section
2. **Pick Colors** - Use the color picker or eyedropper tool
3. **Assign Tokens** - Map colors to semantic tokens (main, alt, background, text, etc.)

### Previewing Components

1. **Select Templates** - Check/uncheck components in the Components section
2. **Switch Views** - Toggle between Grid and Full Page view
3. **Compare Variations** - Create multiple variations and use Compare mode

### Creating Variations

1. **Add Variation** - Click "+" in the Variations section (max 4)
2. **Switch Between** - Click variation tabs to edit each one
3. **Compare** - Click "Compare" button to view all variations side-by-side

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Icons | Lucide React |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── colors/          # Color picker, palette builder
│   ├── components-select/  # Template selector
│   ├── layout/          # Sidebar, Canvas
│   ├── templates/       # 14 UI preview components
│   ├── typography/      # Font selector, token rows
│   └── variations/      # Variation management
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (fonts, API)
└── store/               # Zustand store
```

## Deployment

The app auto-deploys to Vercel on push to `main`. For manual deployment:

```bash
vercel --prod
```

Remember to add `VITE_GOOGLE_FONTS_API_KEY` in Vercel's environment variables.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned features including:
- Font weight & line height controls
- CSS/design tokens export
- Google & GitHub SSO authentication
- Cloud save & sharing

## License

MIT
