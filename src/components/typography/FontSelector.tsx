import { useState, useRef, useEffect } from 'react'
import { Search, Check, Loader2, X } from 'lucide-react'
import { searchFonts, loadGoogleFont, isFontLoaded } from '../../lib/fonts'

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
  onClose: () => void
}

export function FontSelector({ value, onChange, onClose }: FontSelectorProps) {
  const [search, setSearch] = useState('')
  const [loadingFont, setLoadingFont] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredFonts = searchFonts(search)

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
    if (!isFontLoaded(font)) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Select Font</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fonts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Font List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto">
          {/* System Font Option */}
          <button
            onClick={() => handleSelectFont('system-ui')}
            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
              value === 'system-ui' ? 'bg-blue-50' : ''
            }`}
          >
            <span className="text-gray-700">System Font</span>
            {value === 'system-ui' && <Check className="w-4 h-4 text-blue-600" />}
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Google Fonts */}
          {filteredFonts.map((font) => (
            <button
              key={font}
              onClick={() => handleSelectFont(font)}
              disabled={loadingFont === font}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 ${
                value === font ? 'bg-blue-50' : ''
              }`}
            >
              <span
                className="text-gray-700"
                style={{
                  fontFamily: isFontLoaded(font) ? font : undefined
                }}
              >
                {font}
              </span>
              {loadingFont === font ? (
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              ) : value === font ? (
                <Check className="w-4 h-4 text-blue-600" />
              ) : null}
            </button>
          ))}

          {filteredFonts.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No fonts found matching "{search}"
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
