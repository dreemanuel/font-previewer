import { useState } from 'react'
import { X } from 'lucide-react'
import { ColorPicker } from './ColorPicker'

interface ColorSwatchProps {
  color: string
  onChange: (color: string) => void
  onDelete?: () => void
  size?: 'sm' | 'md'
}

export function ColorSwatch({ color, onChange, onDelete, size = 'md' }: ColorSwatchProps) {
  const [showPicker, setShowPicker] = useState(false)

  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(true)}
        className={`${sizeClasses} rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors relative group`}
        style={{ backgroundColor: color }}
        title={color}
      >
        {/* Delete button */}
        {onDelete && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {/* Color picker popover */}
      {showPicker && (
        <ColorPicker
          value={color}
          onChange={onChange}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
