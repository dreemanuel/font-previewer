import { Layers, Plus, X } from 'lucide-react'
import { useDesignStore } from '../../store'

const MAX_VARIATIONS = 4

export function VariationsSection() {
  const variations = useDesignStore((s) => s.variations)
  const activeVariationId = useDesignStore((s) => s.activeVariationId)
  const addVariation = useDesignStore((s) => s.addVariation)
  const removeVariation = useDesignStore((s) => s.removeVariation)
  const setActiveVariation = useDesignStore((s) => s.setActiveVariation)

  const canAddVariation = variations.length < MAX_VARIATIONS
  const canRemoveVariation = variations.length > 1

  return (
    <section className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">Variations</h2>
        </div>
        {canAddVariation && (
          <button
            onClick={addVariation}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            title="Add variation (clones current settings)"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        )}
      </div>

      <div className="space-y-1">
        {variations.map((variation, index) => {
          const isActive = variation.id === activeVariationId

          return (
            <div
              key={variation.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
              }`}
              onClick={() => setActiveVariation(variation.id)}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm ${
                    isActive ? 'text-blue-900 dark:text-blue-200 font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {variation.name}
                </span>
              </div>

              {canRemoveVariation && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeVariation(variation.id)
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  style={{ opacity: isActive ? 1 : undefined }}
                  title="Remove variation"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {variations.length > 1 && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Compare variations side-by-side in the canvas
        </p>
      )}
    </section>
  )
}
