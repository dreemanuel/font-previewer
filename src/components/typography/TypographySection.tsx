import { useState, useEffect } from 'react'
import { Type } from 'lucide-react'
import { TokenRow } from './TokenRow'
import { FontSelector } from './FontSelector'
import { useDesignStore, selectActiveVariation } from '../../store'
import { loadGoogleFont } from '../../lib/fonts'
import { restoreLocalFont } from '../../hooks/useLocalFont'
import type { TypographyToken, FontSize } from '../../store'

const tokens: TypographyToken[] = ['h1', 'h2', 'h3', 'p1', 'p2']

export function TypographySection() {
  const activeVariation = useDesignStore(selectActiveVariation)
  const setTypographyToken = useDesignStore((s) => s.setTypographyToken)
  const [selectingToken, setSelectingToken] = useState<TypographyToken | null>(null)

  // Load fonts for active variation on mount
  useEffect(() => {
    if (!activeVariation) return

    Object.values(activeVariation.typography).forEach((config) => {
      if (config.source === 'google' && config.font !== 'system-ui') {
        loadGoogleFont(config.font).catch(console.error)
      } else if (config.source === 'local' && config.localFontData) {
        restoreLocalFont(config.font, config.localFontData)
      }
    })
  }, [activeVariation?.id])

  if (!activeVariation) return null

  const handleFontClick = (token: TypographyToken) => {
    setSelectingToken(token)
  }

  const handleFontChange = (token: TypographyToken, font: string) => {
    setTypographyToken(activeVariation.id, token, {
      font,
      source: font === 'system-ui' ? 'system' : 'google',
      localFontData: undefined, // Clear local font data when switching to Google font
    })
  }

  const handleLocalFontLoaded = (token: TypographyToken, name: string, data: string) => {
    setTypographyToken(activeVariation.id, token, {
      font: name,
      source: 'local',
      localFontData: data,
    })
  }

  const handleTextChange = (token: TypographyToken, text: string) => {
    setTypographyToken(activeVariation.id, token, { text })
  }

  const handleSizeChange = (token: TypographyToken, size: FontSize) => {
    setTypographyToken(activeVariation.id, token, { size })
  }

  return (
    <>
      <section className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">Typography</h2>
        </div>
        <div className="space-y-3">
          {tokens.map((token) => (
            <TokenRow
              key={token}
              token={token}
              config={activeVariation.typography[token]}
              onFontClick={() => handleFontClick(token)}
              onTextChange={(text) => handleTextChange(token, text)}
              onSizeChange={(size) => handleSizeChange(token, size)}
              onLocalFontLoaded={(name, data) => handleLocalFontLoaded(token, name, data)}
            />
          ))}
        </div>
      </section>

      {/* Font Selector Modal */}
      {selectingToken && (
        <FontSelector
          value={activeVariation.typography[selectingToken].font}
          onChange={(font) => handleFontChange(selectingToken, font)}
          onClose={() => setSelectingToken(null)}
        />
      )}
    </>
  )
}
