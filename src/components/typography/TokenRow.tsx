import { ChevronDown, Upload, Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useLocalFont } from '../../hooks/useLocalFont'
import { LoremGenerator } from './LoremGenerator'
import type { TypographyToken, TokenConfig } from '../../store'

interface TokenRowProps {
  token: TypographyToken
  config: TokenConfig
  onFontClick: () => void
  onTextChange: (text: string) => void
  onLocalFontLoaded: (name: string, data: string) => void
}

const tokenLabels: Record<TypographyToken, { label: string; description: string }> = {
  h1: { label: 'H1', description: 'Main headline' },
  h2: { label: 'H2', description: 'Section title' },
  h3: { label: 'H3', description: 'Subsection' },
  p1: { label: 'P1', description: 'Body text' },
  p2: { label: 'P2', description: 'Secondary text' },
}

const tokenSizes: Record<TypographyToken, string> = {
  h1: 'text-lg font-bold',
  h2: 'text-base font-semibold',
  h3: 'text-sm font-medium',
  p1: 'text-sm font-normal',
  p2: 'text-xs font-normal',
}

export function TokenRow({ token, config, onFontClick, onTextChange, onLocalFontLoaded }: TokenRowProps) {
  const { label, description } = tokenLabels[token]
  const isHeading = token.startsWith('h')
  const inputRef = useRef<HTMLInputElement>(null)
  const { loadLocalFont, isLoading, error } = useLocalFont()

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await loadLocalFont(file)
      onLocalFontLoaded(result.name, result.data)
    } catch {
      // Error handled by hook
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
      {/* Token label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${tokenSizes[token]} text-gray-900`}>{label}</span>
          <span className="text-xs text-gray-400">{description}</span>
        </div>
        {config.source === 'local' && (
          <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Local</span>
        )}
      </div>

      {/* Font selection */}
      <div className="flex gap-2">
        <button
          onClick={onFontClick}
          className="flex-1 flex items-center justify-between px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
        >
          <span
            className="truncate text-gray-700"
            style={{ fontFamily: config.font !== 'system-ui' ? config.font : undefined }}
          >
            {config.font === 'system-ui' ? 'System Font' : config.font}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>

        {/* Upload button */}
        <input
          ref={inputRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          disabled={isLoading}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50"
          title="Upload local font"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {/* Text input with lorem generator */}
      <div className="relative">
        {isHeading ? (
          <input
            type="text"
            value={config.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()} text...`}
            className="w-full px-3 py-2 pr-20 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : (
          <textarea
            value={config.text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()} text...`}
            rows={2}
            className="w-full px-3 py-2 pr-20 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        )}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <LoremGenerator
            token={token}
            currentText={config.text}
            onGenerate={onTextChange}
          />
        </div>
      </div>
    </div>
  )
}
