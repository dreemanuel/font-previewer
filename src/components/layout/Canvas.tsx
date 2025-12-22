import { Grid3X3, FileText } from 'lucide-react'
import { useDesignStore } from '../../store'
import { templateComponents } from '../templates'
import type { TemplateProps } from '../templates'

export function Canvas() {
  const variations = useDesignStore((s) => s.variations)
  const activeVariationId = useDesignStore((s) => s.activeVariationId)
  const selectedComponents = useDesignStore((s) => s.selectedComponents)
  const viewMode = useDesignStore((s) => s.viewMode)
  const setViewMode = useDesignStore((s) => s.setViewMode)

  const activeVariation = variations.find((v) => v.id === activeVariationId)

  if (!activeVariation) {
    return null
  }

  const templateProps: TemplateProps = {
    typography: activeVariation.typography,
    colors: activeVariation.colorTokens,
  }

  const hasSelectedComponents = selectedComponents.length > 0

  return (
    <main className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Preview</span>
          <span className="text-xs text-gray-400">{activeVariation.name}</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white shadow-sm text-gray-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Grid View"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('fullpage')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'fullpage'
                ? 'bg-white shadow-sm text-gray-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Full Page View"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        {!hasSelectedComponents ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Preview your design system
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Configure your typography and colors in the sidebar, then select
                components to preview how they look together.
              </p>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-8 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
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
          <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {selectedComponents.map((componentId) => {
              const Component = templateComponents[componentId]
              return <Component key={componentId} {...templateProps} />
            })}
          </div>
        )}
      </div>
    </main>
  )
}
