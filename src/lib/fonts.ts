// Popular Google Fonts list (curated to avoid API key requirement)
// Sorted by popularity
export const GOOGLE_FONTS = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Inter',
  'Roboto Condensed',
  'Source Sans 3',
  'Oswald',
  'Raleway',
  'Noto Sans',
  'Ubuntu',
  'Roboto Mono',
  'Nunito',
  'Playfair Display',
  'Merriweather',
  'Rubik',
  'PT Sans',
  'Roboto Slab',
  'Work Sans',
  'Quicksand',
  'Mulish',
  'Barlow',
  'Nunito Sans',
  'Fira Sans',
  'Inconsolata',
  'Karla',
  'Lora',
  'Libre Franklin',
  'Josefin Sans',
  'Manrope',
  'Crimson Text',
  'DM Sans',
  'Libre Baskerville',
  'Hind',
  'Arimo',
  'Cabin',
  'Oxygen',
  'Heebo',
  'EB Garamond',
  'Outfit',
  'Space Grotesk',
  'Archivo',
  'Overpass',
  'IBM Plex Sans',
  'IBM Plex Mono',
  'IBM Plex Serif',
  'Source Code Pro',
  'Cormorant Garamond',
  'Bitter',
  'Lexend',
  'Space Mono',
  'Sora',
  'Red Hat Display',
  'Public Sans',
  'Figtree',
  'Be Vietnam Pro',
  'Urbanist',
  'Albert Sans',
  'Plus Jakarta Sans',
  'Onest',
  'Geist',
] as const

export type GoogleFontName = typeof GOOGLE_FONTS[number]

// Track loaded fonts to avoid duplicate loading
const loadedFonts = new Set<string>()
const loadingFonts = new Map<string, Promise<void>>()

/**
 * Load a Google Font by injecting a CSS link
 */
export function loadGoogleFont(fontFamily: string): Promise<void> {
  // Skip system fonts - they're CSS keywords, not Google Fonts
  if (fontFamily === 'system-ui' || fontFamily.startsWith('system')) {
    return Promise.resolve()
  }

  // Already loaded
  if (loadedFonts.has(fontFamily)) {
    return Promise.resolve()
  }

  // Currently loading
  if (loadingFonts.has(fontFamily)) {
    return loadingFonts.get(fontFamily)!
  }

  const promise = new Promise<void>((resolve, reject) => {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap`
    link.rel = 'stylesheet'

    link.onload = () => {
      loadedFonts.add(fontFamily)
      loadingFonts.delete(fontFamily)
      resolve()
    }

    link.onerror = () => {
      loadingFonts.delete(fontFamily)
      reject(new Error(`Failed to load font: ${fontFamily}`))
    }

    document.head.appendChild(link)
  })

  loadingFonts.set(fontFamily, promise)
  return promise
}

/**
 * Check if a font is currently loaded
 */
export function isFontLoaded(fontFamily: string): boolean {
  return loadedFonts.has(fontFamily)
}

/**
 * Check if a font is currently loading
 */
export function isFontLoading(fontFamily: string): boolean {
  return loadingFonts.has(fontFamily)
}

/**
 * Search fonts by query
 */
export function searchFonts(query: string): string[] {
  if (!query.trim()) return [...GOOGLE_FONTS]

  const lowerQuery = query.toLowerCase()
  return GOOGLE_FONTS.filter(font =>
    font.toLowerCase().includes(lowerQuery)
  )
}
