import { Pipette, Loader2 } from 'lucide-react'
import { useEyeDropper } from '../../hooks/useEyeDropper'

interface EyeDropperButtonProps {
  onColorPicked: (color: string) => void
}

export function EyeDropperButton({ onColorPicked }: EyeDropperButtonProps) {
  const { isSupported, pickColor, isActive } = useEyeDropper()

  const handleClick = async () => {
    const color = await pickColor()
    if (color) {
      onColorPicked(color)
    }
  }

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-2 text-gray-300 dark:text-gray-600 cursor-not-allowed rounded-lg"
        title="EyeDropper not supported in this browser (Chrome/Edge only)"
      >
        <Pipette className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isActive}
      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
      title="Pick color from screen"
    >
      {isActive ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Pipette className="w-4 h-4" />
      )}
    </button>
  )
}
