import { useDesignStore, selectActiveVariation } from '../../store'
import type { ColorToken } from '../../store'

const colorTokens: { id: ColorToken; label: string; description: string }[] = [
  { id: 'main', label: 'Main', description: 'Primary brand color' },
  { id: 'alt', label: 'Alt', description: 'Secondary accent' },
  { id: 'bgLight', label: 'BG Light', description: 'Light background' },
  { id: 'bgDark', label: 'BG Dark', description: 'Dark background' },
  { id: 'text', label: 'Text', description: 'Primary text' },
  { id: 'textInv', label: 'Text Inv', description: 'Inverted text' },
]

export function TokenAssignment() {
  const activeVariation = useDesignStore(selectActiveVariation)
  const palette = useDesignStore((s) => s.palette)
  const setColorToken = useDesignStore((s) => s.setColorToken)

  if (!activeVariation) return null

  const handleChange = (token: ColorToken, color: string) => {
    setColorToken(activeVariation.id, token, color)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-2">Assign colors to tokens</p>
      {colorTokens.map(({ id, label, description }) => (
        <div key={id} className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <span className="text-sm text-gray-700">{label}</span>
            <span className="text-xs text-gray-400 ml-1">({description})</span>
          </div>
          <select
            value={activeVariation.colorTokens[id]}
            onChange={(e) => handleChange(id, e.target.value)}
            className="w-24 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: activeVariation.colorTokens[id],
              color: activeVariation.colorTokens[id] === '#1a1a1a' ||
                     activeVariation.colorTokens[id] === '#000000'
                     ? '#ffffff' : '#000000'
            }}
          >
            {palette.map((color, index) => (
              <option key={index} value={color} style={{ backgroundColor: color }}>
                {color}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
