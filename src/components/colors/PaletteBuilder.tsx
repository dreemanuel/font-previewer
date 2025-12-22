import { Plus } from 'lucide-react'
import { ColorSwatch } from './ColorSwatch'
import { EyeDropperButton } from './EyeDropperButton'
import { useDesignStore, selectIsDefaultPalette } from '../../store'

const MAX_COLORS = 8

export function PaletteBuilder() {
  const palette = useDesignStore((s) => s.palette)
  const addPaletteColor = useDesignStore((s) => s.addPaletteColor)
  const removePaletteColor = useDesignStore((s) => s.removePaletteColor)
  const updatePaletteColor = useDesignStore((s) => s.updatePaletteColor)
  const isDefault = useDesignStore(selectIsDefaultPalette)

  const canAddMore = palette.length < MAX_COLORS
  const canDelete = palette.length > 1

  const handleAddColor = () => {
    if (canAddMore) {
      addPaletteColor('#808080')
    }
  }

  const handleEyeDropperColor = (color: string) => {
    if (canAddMore) {
      addPaletteColor(color)
    }
  }

  return (
    <div className="space-y-3">
      {/* Color swatches */}
      <div className="flex gap-2 flex-wrap items-center">
        {palette.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
            onChange={(newColor) => updatePaletteColor(index, newColor)}
            onDelete={canDelete ? () => removePaletteColor(index) : undefined}
          />
        ))}

        {/* Add button */}
        {canAddMore && (
          <button
            onClick={handleAddColor}
            className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors flex items-center justify-center"
            title="Add color"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        {/* Eyedropper */}
        <EyeDropperButton onColorPicked={handleEyeDropperColor} />
      </div>

      {/* Default indicator */}
      {isDefault && (
        <p className="text-xs text-gray-400 dark:text-gray-500">Using default colors</p>
      )}

      {/* Color count */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {palette.length} / {MAX_COLORS} colors
      </p>
    </div>
  )
}
