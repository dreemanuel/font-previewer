import { Palette } from 'lucide-react'
import { PaletteBuilder } from './PaletteBuilder'
import { TokenAssignment } from './TokenAssignment'

export function ColorsSection() {
  return (
    <section className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200">Colors</h2>
        </div>
      </div>

      {/* Palette builder */}
      <div className="mb-4">
        <PaletteBuilder />
      </div>

      {/* Token assignment */}
      <TokenAssignment />
    </section>
  )
}
