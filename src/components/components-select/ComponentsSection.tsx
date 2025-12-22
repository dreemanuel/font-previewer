import { useState } from 'react'
import { LayoutGrid, GripVertical } from 'lucide-react'
import { useDesignStore } from '../../store'
import { getComponentsByCategory, categoryLabels, componentRegistry } from '../templates/registry'
import type { ComponentId } from '../../store'

export function ComponentsSection() {
  const selectedComponents = useDesignStore((s) => s.selectedComponents)
  const toggleComponent = useDesignStore((s) => s.toggleComponent)
  const reorderComponents = useDesignStore((s) => s.reorderComponents)

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const componentsByCategory = getComponentsByCategory()

  const handleToggle = (id: ComponentId) => {
    toggleComponent(id)
  }

  const isSelected = (id: ComponentId) => selectedComponents.includes(id)

  const getComponentName = (id: ComponentId) => {
    return componentRegistry.find((c) => c.id === id)?.name ?? id
  }

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault()
    const fromIndex = draggedIndex
    if (fromIndex !== null && fromIndex !== toIndex) {
      reorderComponents(fromIndex, toIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return (
    <section className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">Components</h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({selectedComponents.length} selected)
        </span>
      </div>

      {/* Preview Order - Draggable list */}
      {selectedComponents.length > 1 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
            Preview Order
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
            Drag to reorder
          </p>
          <div className="space-y-1">
            {selectedComponents.map((componentId, index) => (
              <div
                key={componentId}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  flex items-center gap-2 p-2 rounded-md cursor-grab active:cursor-grabbing
                  transition-all duration-150
                  ${draggedIndex === index
                    ? 'opacity-50 bg-blue-200 dark:bg-blue-800'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                  ${dragOverIndex === index && draggedIndex !== index
                    ? 'border-t-2 border-blue-500'
                    : 'border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-5">
                  {index + 1}.
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                  {getComponentName(componentId)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Component Selection by Category */}
      <div className="space-y-4">
        {(Object.keys(componentsByCategory) as Array<keyof typeof componentsByCategory>).map(
          (category) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-1">
                {componentsByCategory[category].map((component) => (
                  <label
                    key={component.id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected(component.id)}
                      onChange={() => handleToggle(component.id)}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{component.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
