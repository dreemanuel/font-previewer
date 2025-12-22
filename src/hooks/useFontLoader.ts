import { useState, useCallback, useEffect } from 'react'
import { loadGoogleFont, isFontLoaded, isFontLoading } from '../lib/fonts'

interface FontLoadState {
  isLoading: boolean
  isLoaded: boolean
  error: string | null
}

/**
 * Hook for loading and tracking Google Font loading state
 */
export function useFontLoader() {
  const [fontStates, setFontStates] = useState<Record<string, FontLoadState>>({})

  const loadFont = useCallback(async (fontFamily: string) => {
    // Skip system fonts
    if (fontFamily === 'system-ui') return

    // Check if already loaded
    if (isFontLoaded(fontFamily)) {
      setFontStates(prev => ({
        ...prev,
        [fontFamily]: { isLoading: false, isLoaded: true, error: null }
      }))
      return
    }

    // Check if already loading
    if (isFontLoading(fontFamily)) {
      return
    }

    // Start loading
    setFontStates(prev => ({
      ...prev,
      [fontFamily]: { isLoading: true, isLoaded: false, error: null }
    }))

    try {
      await loadGoogleFont(fontFamily)
      setFontStates(prev => ({
        ...prev,
        [fontFamily]: { isLoading: false, isLoaded: true, error: null }
      }))
    } catch (error) {
      setFontStates(prev => ({
        ...prev,
        [fontFamily]: {
          isLoading: false,
          isLoaded: false,
          error: error instanceof Error ? error.message : 'Failed to load font'
        }
      }))
    }
  }, [])

  const getFontState = useCallback((fontFamily: string): FontLoadState => {
    if (fontFamily === 'system-ui') {
      return { isLoading: false, isLoaded: true, error: null }
    }
    return fontStates[fontFamily] ?? { isLoading: false, isLoaded: false, error: null }
  }, [fontStates])

  return { loadFont, getFontState }
}

/**
 * Hook that loads a specific font on mount
 */
export function useFont(fontFamily: string) {
  const { loadFont, getFontState } = useFontLoader()

  useEffect(() => {
    if (fontFamily && fontFamily !== 'system-ui') {
      loadFont(fontFamily)
    }
  }, [fontFamily, loadFont])

  return getFontState(fontFamily)
}

export { useFontPreloader } from './useFontPreloader'
