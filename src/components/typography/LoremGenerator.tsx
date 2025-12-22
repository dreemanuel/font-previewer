import { Shuffle, Plus, Minus } from 'lucide-react'
import { getLoremForToken, adjustLoremLength, isLoremIpsum, LOREM_LENGTHS } from '../../lib/lorem'

interface LoremGeneratorProps {
  token: keyof typeof LOREM_LENGTHS
  currentText: string
  onGenerate: (text: string) => void
}

export function LoremGenerator({ token, currentText, onGenerate }: LoremGeneratorProps) {
  const hasText = currentText.trim().length > 0
  const isLorem = hasText && isLoremIpsum(currentText)

  const handleRandom = () => {
    onGenerate(getLoremForToken(token))
  }

  const handleLonger = () => {
    onGenerate(adjustLoremLength(currentText, 'longer'))
  }

  const handleShorter = () => {
    const wordCount = currentText.trim().split(/\s+/).filter(Boolean).length
    if (wordCount <= 3) return
    onGenerate(adjustLoremLength(currentText, 'shorter'))
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleRandom}
        className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
        title="Generate random text"
      >
        <Shuffle className="w-3.5 h-3.5" />
      </button>

      {isLorem && (
        <>
          <button
            onClick={handleLonger}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
            title="Make longer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShorter}
            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
            title="Make shorter"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </div>
  )
}
