import { useState, useEffect, useCallback } from 'react'
import {
  fetchGoogleFonts,
  searchGoogleFonts,
  filterByCategory,
  type GoogleFont,
  type FontCategory,
} from '../lib/googleFontsApi'

interface UseGoogleFontsApiState {
  fonts: GoogleFont[]
  filteredFonts: GoogleFont[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  category: FontCategory
}

interface UseGoogleFontsApiReturn extends UseGoogleFontsApiState {
  setSearchQuery: (query: string) => void
  setCategory: (category: FontCategory) => void
  refetch: () => void
}

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY as string | undefined

export function useGoogleFontsApi(): UseGoogleFontsApiReturn {
  const [state, setState] = useState<UseGoogleFontsApiState>({
    fonts: [],
    filteredFonts: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    category: 'all',
  })

  const fetchFonts = useCallback(async () => {
    if (!API_KEY) {
      setState(prev => ({
        ...prev,
        error: 'Google Fonts API key not configured. Add VITE_GOOGLE_FONTS_API_KEY to your .env file.',
        isLoading: false,
      }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const fonts = await fetchGoogleFonts(API_KEY)
      setState(prev => ({
        ...prev,
        fonts,
        filteredFonts: fonts,
        isLoading: false,
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch fonts',
        isLoading: false,
      }))
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchFonts()
  }, [fetchFonts])

  // Filter fonts when search or category changes
  useEffect(() => {
    let result = state.fonts

    if (state.category !== 'all') {
      result = filterByCategory(result, state.category)
    }

    if (state.searchQuery) {
      result = searchGoogleFonts(result, state.searchQuery)
    }

    setState(prev => ({ ...prev, filteredFonts: result }))
  }, [state.fonts, state.searchQuery, state.category])

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }))
  }, [])

  const setCategory = useCallback((category: FontCategory) => {
    setState(prev => ({ ...prev, category }))
  }, [])

  return {
    ...state,
    setSearchQuery,
    setCategory,
    refetch: fetchFonts,
  }
}

/**
 * Check if API key is configured
 */
export function isApiKeyConfigured(): boolean {
  return !!API_KEY
}
