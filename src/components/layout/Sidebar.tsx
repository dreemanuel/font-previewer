import { LayoutGrid, RotateCcw } from 'lucide-react'
import { TypographySection } from '../typography'
import { ColorsSection } from '../colors'
import { useDesignStore } from '../../store'

export function Sidebar() {
  const reset = useDesignStore((s) => s.reset)

  const handleReset = () => {
    if (window.confirm('Reset all settings to defaults?')) {
      reset()
    }
  }

  return (
    <aside className="w-80 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Font Previewer</h1>
        <button
          onClick={handleReset}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Typography Section */}
        <TypographySection />

        {/* Colors Section */}
        <ColorsSection />

        {/* Components Section */}
        <section className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-medium text-gray-700">Components</h2>
          </div>
          <div className="space-y-2">
            {['Hero', 'Features', 'Testimonial', 'Blog Card'].map((component) => (
              <label
                key={component}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked={component === 'Hero'}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{component}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
