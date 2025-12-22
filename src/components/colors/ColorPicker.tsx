import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { hexToHsl, hslToHex, isValidHex } from '../../lib/colors'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  onClose: () => void
}

export function ColorPicker({ value, onChange, onClose }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value)
  const [hsl, setHsl] = useState(() => hexToHsl(value) || { h: 0, s: 50, l: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Update hex input when value prop changes
  useEffect(() => {
    setHexInput(value)
    const newHsl = hexToHsl(value)
    if (newHsl) setHsl(newHsl)
  }, [value])

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value
    if (!hex.startsWith('#')) hex = '#' + hex
    setHexInput(hex)

    if (isValidHex(hex)) {
      onChange(hex.toLowerCase())
      const newHsl = hexToHsl(hex)
      if (newHsl) setHsl(newHsl)
    }
  }

  const handleHslChange = (key: 'h' | 's' | 'l', val: number) => {
    const newHsl = { ...hsl, [key]: val }
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    setHexInput(newHex)
    onChange(newHex)
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-50 top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-64"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Pick a color</span>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Color preview */}
      <div
        className="w-full h-16 rounded-lg mb-4 border border-gray-200 dark:border-gray-600"
        style={{ backgroundColor: value }}
      />

      {/* Hex input */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hex</label>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          maxLength={7}
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          placeholder="#000000"
        />
      </div>

      {/* HSL sliders */}
      <div className="space-y-3">
        {/* Hue */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Hue ({hsl.h})
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={hsl.h}
            onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(360, 100%, 50%)
              )`,
            }}
          />
        </div>

        {/* Saturation */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Saturation ({hsl.s}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={hsl.s}
            onChange={(e) => handleHslChange('s', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                hsl(${hsl.h}, 0%, ${hsl.l}%),
                hsl(${hsl.h}, 100%, ${hsl.l}%)
              )`,
            }}
          />
        </div>

        {/* Lightness */}
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Lightness ({hsl.l}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={hsl.l}
            onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                hsl(${hsl.h}, ${hsl.s}%, 0%),
                hsl(${hsl.h}, ${hsl.s}%, 50%),
                hsl(${hsl.h}, ${hsl.s}%, 100%)
              )`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
