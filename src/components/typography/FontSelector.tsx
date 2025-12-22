import { useState, useRef, useEffect } from 'react'
import { Search, Check, Loader2, X } from 'lucide-react'
import { searchFonts, loadGoogleFont, isFontLoaded } from '../../lib/fonts'
import { useGoogleFontsApi, isApiKeyConfigured } from '../../hooks/useGoogleFontsApi'
import type { FontCategory } from '../../lib/googleFontsApi'

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
  onClose: () => void
}

const categories: { value: FontCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'display', label: 'Display' },
  { value: 'handwriting', label: 'Handwriting' },
  { value: 'monospace', label: 'Monospace' },
]

export function FontSelector({ value, onChange, onClose }: FontSelectorProps) {
  const [loadingFont, setLoadingFont] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Use API if configured, otherwise use local state for curated list
  const apiEnabled = isApiKeyConfigured()
  const {
    filteredFonts: apiFonts,
    isLoading: apiLoading,
    error: apiError,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
  } = useGoogleFontsApi()

  // Local search state for curated list fallback
  const [localSearch, setLocalSearch] = useState('')
  const curatedFonts = searchFonts(localSearch)

  // Determine which fonts to show
  const fontsToShow = apiEnabled ? apiFonts : curatedFonts
  const isLoading = apiEnabled ? apiLoading : false
  const error = apiEnabled ? apiError : null

  // Focus search input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSelectFont = async (font: string) => {
    // Don't try to load system-ui from Google Fonts
    if (font !== 'system-ui' && !isFontLoaded(font)) {
      setLoadingFont(font)
      try {
        await loadGoogleFont(font)
      } catch (error) {
        console.error('Failed to load font:', error)
      }
      setLoadingFont(null)
    }
    onChange(font)
    onClose()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (apiEnabled) {
      setSearchQuery(query)
    } else {
      setLocalSearch(query)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20 dark:bg-black/50">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Select Font</h3>
            {apiEnabled && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {fontsToShow.length} fonts available
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={apiEnabled ? searchQuery : localSearch}
              onChange={handleSearchChange}
              placeholder="Search fonts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter (only with API) */}
          {apiEnabled && (
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    category === cat.value
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto">
          {/* Error State */}
          {error && (
            <div className="px-4 py-8 text-center">
              <p className="text-red-500 dark:text-red-400 text-sm mb-2">{error}</p>
              {!apiEnabled && (
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Using curated font list instead
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="px-4 py-8 text-center">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading fonts...</p>
            </div>
          )}

          {/* Font List */}
          {!isLoading && !error && (
            <>
              {/* System Font Option */}
              <button
                onClick={() => handleSelectFont('system-ui')}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  value === 'system-ui' ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                }`}
              >
                <span className="text-gray-700 dark:text-gray-200">System Font</span>
                {value === 'system-ui' && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

              {/* Google Fonts */}
              {fontsToShow.map((font) => {
                const fontFamily = typeof font === 'string' ? font : font.family
                const fontCategory = typeof font === 'string' ? undefined : font.category

                return (
                  <button
                    key={fontFamily}
                    onClick={() => handleSelectFont(fontFamily)}
                    disabled={loadingFont === fontFamily}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 ${
                      value === fontFamily ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span
                        className="text-gray-700 dark:text-gray-200"
                        style={{
                          fontFamily: isFontLoaded(fontFamily) ? fontFamily : undefined
                        }}
                      >
                        {fontFamily}
                      </span>
                      {fontCategory && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                          {fontCategory}
                        </span>
                      )}
                    </div>
                    {loadingFont === fontFamily ? (
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    ) : value === fontFamily ? (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : null}
                  </button>
                )
              })}

              {fontsToShow.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No fonts found matching "{apiEnabled ? searchQuery : localSearch}"
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        {!apiEnabled && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Add VITE_GOOGLE_FONTS_API_KEY to .env for full font library
            </p>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
