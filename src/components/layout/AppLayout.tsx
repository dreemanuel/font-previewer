import { Sidebar } from './Sidebar'
import { Canvas } from './Canvas'

export function AppLayout() {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar - hidden on small screens, visible on md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Canvas - full width on mobile, flex-1 on larger screens */}
      <Canvas />

      {/* Mobile sidebar toggle - shown only on small screens */}
      <div className="md:hidden fixed bottom-4 left-4">
        <button className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
