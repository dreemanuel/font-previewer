// Google Fonts API integration
// API Documentation: https://developers.google.com/fonts/docs/developer_api

export interface GoogleFont {
  family: string
  variants: string[]
  subsets: string[]
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace'
  version: string
  lastModified: string
  files: Record<string, string>
}

export interface GoogleFontsApiResponse {
  kind: string
  items: GoogleFont[]
}

export type FontCategory = GoogleFont['category'] | 'all'

// Cache for API response
let fontsCache: GoogleFont[] | null = null
let fontsCacheTime: number = 0
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

/**
 * Fetch all fonts from Google Fonts API
 */
export async function fetchGoogleFonts(apiKey: string): Promise<GoogleFont[]> {
  // Return cached data if valid
  if (fontsCache && Date.now() - fontsCacheTime < CACHE_DURATION) {
    return fontsCache
  }

  const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Invalid API key or API not enabled. Please check your Google Fonts API key.')
    }
    throw new Error(`Failed to fetch fonts: ${response.statusText}`)
  }

  const data: GoogleFontsApiResponse = await response.json()

  // Cache the results
  fontsCache = data.items
  fontsCacheTime = Date.now()

  return data.items
}

/**
 * Search fonts by name
 */
export function searchGoogleFonts(fonts: GoogleFont[], query: string): GoogleFont[] {
  if (!query.trim()) return fonts

  const lowerQuery = query.toLowerCase()
  return fonts.filter(font =>
    font.family.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Filter fonts by category
 */
export function filterByCategory(fonts: GoogleFont[], category: FontCategory): GoogleFont[] {
  if (category === 'all') return fonts
  return fonts.filter(font => font.category === category)
}

/**
 * Get popular fonts (first N fonts, already sorted by popularity from API)
 */
export function getPopularFonts(fonts: GoogleFont[], limit: number = 100): GoogleFont[] {
  return fonts.slice(0, limit)
}

/**
 * Load a Google Font stylesheet
 */
export function loadGoogleFontStylesheet(family: string, weights: string[] = ['400', '500', '600', '700']): void {
  const existingLink = document.querySelector(`link[data-font="${family}"]`)
  if (existingLink) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights.join(';')}&display=swap`
  link.dataset.font = family

  document.head.appendChild(link)
}

// Track which fonts have been loaded
const loadedFonts = new Set<string>()

/**
 * Check if a font is loaded
 */
export function isGoogleFontLoaded(family: string): boolean {
  return loadedFonts.has(family)
}

/**
 * Mark a font as loaded
 */
export function markFontAsLoaded(family: string): void {
  loadedFonts.add(family)
}
