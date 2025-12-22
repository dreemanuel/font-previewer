import { Grid3X3, FileText, Columns, X } from 'lucide-react'
import { useState } from 'react'
import { useDesignStore } from '../../store'
import { templateComponents } from '../templates'
import type { TemplateProps } from '../templates'

type CompareMode = 'single' | 'compare'

export function Canvas() {
  const variations = useDesignStore((s) => s.variations)
  const activeVariationId = useDesignStore((s) => s.activeVariationId)
  const selectedComponents = useDesignStore((s) => s.selectedComponents)
  const viewMode = useDesignStore((s) => s.viewMode)
  const setViewMode = useDesignStore((s) => s.setViewMode)
  const setActiveVariation = useDesignStore((s) => s.setActiveVariation)
  const removeVariation = useDesignStore((s) => s.removeVariation)

  const [compareMode, setCompareMode] = useState<CompareMode>('single')

  const activeVariation = variations.find((v) => v.id === activeVariationId)
  const hasMultipleVariations = variations.length > 1
  const hasSelectedComponents = selectedComponents.length > 0

  if (!activeVariation) {
    return null
  }

  const renderPreview = (variationId: string, isCompare = false) => {
    const variation = variations.find((v) => v.id === variationId)
    if (!variation) return null

    const templateProps: TemplateProps = {
      typography: variation.typography,
      colors: variation.colorTokens,
    }

    return (
      <div
        key={variationId}
        className={`flex-1 min-w-0 ${isCompare ? 'overflow-auto' : ''}`}
        onClick={() => isCompare && setActiveVariation(variationId)}
      >
        <div className={isCompare ? 'p-4' : ''}>
          {viewMode === 'grid' && !isCompare ? (
            <div
              className="grid gap-8 max-w-6xl mx-auto"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              }}
            >
              {selectedComponents.map((componentId) => {
                const Component = templateComponents[componentId]
                return (
                  <div
                    key={componentId}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <Component {...templateProps} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div
              className={`${
                isCompare ? '' : 'max-w-5xl mx-auto'
              } bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm`}
            >
              {selectedComponents.map((componentId) => {
                const Component = templateComponents[componentId]
                return <Component key={componentId} {...templateProps} />
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen overflow-auto bg-white dark:bg-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-20 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Preview</span>
            {compareMode === 'single' && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {activeVariation.name}
              </span>
            )}
          </div>

          {hasMultipleVariations && (
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setCompareMode('single')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  compareMode === 'single'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'
                    : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setCompareMode('compare')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  compareMode === 'compare'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'
                    : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Columns className="w-3 h-3" />
                Compare
              </button>
            </div>
          )}
        </div>

        {compareMode === 'single' && (
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'
                  : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('fullpage')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'fullpage'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'
                  : 'text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title="Full Page View"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Preview Area */}
      <div className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-65px)]">
        {!hasSelectedComponents ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Preview your design system
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Configure your typography and colors in the sidebar, then select
                components to preview how they look together.
              </p>
            </div>
          </div>
        ) : compareMode === 'compare' && hasMultipleVariations ? (
          <div className="flex flex-col">
            {/* Sticky variation headers row */}
            <div className="sticky top-[57px] z-10 flex divide-x divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
              {variations.map((variation) => {
                const isActive = variation.id === activeVariationId
                return (
                  <div
                    key={`header-${variation.id}`}
                    className={`flex-1 px-4 py-2 text-sm font-medium flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveVariation(variation.id)}
                  >
                    <div>
                      {variation.name}
                      {isActive && (
                        <span className="ml-2 text-xs">(active)</span>
                      )}
                    </div>
                    {variations.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeVariation(variation.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        title="Remove variation"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
            {/* Content columns */}
            <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
              {variations.map((variation) => renderPreview(variation.id, true))}
            </div>
          </div>
        ) : (
          <div className="p-8">{renderPreview(activeVariationId)}</div>
        )}
      </div>
    </main>
  )
}
