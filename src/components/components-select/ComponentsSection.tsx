import { LayoutGrid } from 'lucide-react'
import { useDesignStore } from '../../store'
import { getComponentsByCategory, categoryLabels } from '../templates/registry'
import type { ComponentId } from '../../store'

export function ComponentsSection() {
  const selectedComponents = useDesignStore((s) => s.selectedComponents)
  const toggleComponent = useDesignStore((s) => s.toggleComponent)

  const componentsByCategory = getComponentsByCategory()

  const handleToggle = (id: ComponentId) => {
    toggleComponent(id)
  }

  const isSelected = (id: ComponentId) => selectedComponents.includes(id)

  return (
    <section className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">Components</h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({selectedComponents.length} selected)
        </span>
      </div>

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
