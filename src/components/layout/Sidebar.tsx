import { RotateCcw, Moon, Sun } from 'lucide-react'
import { TypographySection } from '../typography'
import { ColorsSection } from '../colors'
import { ComponentsSection } from '../components-select'
import { VariationsSection } from '../variations'
import { useDesignStore } from '../../store'
import { useDarkMode } from '../../hooks/useDarkMode'

export function Sidebar() {
  const reset = useDesignStore((s) => s.reset)
  const { isDark, toggle } = useDarkMode()

  const handleReset = () => {
    if (window.confirm('Reset all settings to defaults?')) {
      reset()
    }
  }

  return (
    <aside className="w-80 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Font Previewer</h1>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Variations Section */}
        <VariationsSection />

        {/* Typography Section */}
        <TypographySection />

        {/* Colors Section */}
        <ColorsSection />

        {/* Components Section */}
        <ComponentsSection />
      </div>
    </aside>
  )
}
