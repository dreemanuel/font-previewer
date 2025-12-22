import { useState } from 'react'
import { PanelLeftOpen } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Canvas } from './Canvas'

export function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  return (
    <div className="relative h-screen bg-white dark:bg-gray-900">
      {/* Canvas - always full width */}
      <Canvas />

      {/* Backdrop - visible when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Floating Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50
          transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar onClose={() => setIsDrawerOpen(false)} />
      </div>

      {/* Toggle Button - visible when drawer is closed */}
      {!isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          title="Open settings panel"
        >
          <PanelLeftOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </div>
  )
}
