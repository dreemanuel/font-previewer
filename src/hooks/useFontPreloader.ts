import { useEffect } from 'react'
import { useDesignStore } from '../store'
import { loadGoogleFont, isFontLoaded } from '../lib/fonts'

/**
 * Preloads all Google Fonts used across all variations.
 * This ensures fonts are available when switching between variations.
 */
export function useFontPreloader() {
  const variations = useDesignStore((s) => s.variations)

  useEffect(() => {
    // Collect all unique fonts from all variations
    const fonts = new Set<string>()

    variations.forEach((variation) => {
      Object.values(variation.typography).forEach((token) => {
        if (token.source === 'google' && token.font !== 'system-ui') {
          fonts.add(token.font)
        }
      })
    })

    // Load fonts that aren't already loaded
    fonts.forEach((font) => {
      if (!isFontLoaded(font)) {
        loadGoogleFont(font).catch(() => {
          // Silent fail - font will show as system font
        })
      }
    })
  }, [variations])
}
