import { useRef } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { useLocalFont } from '../../hooks/useLocalFont'

interface FontUploaderProps {
  onFontLoaded: (name: string, data: string) => void
}

export function FontUploader({ onFontLoaded }: FontUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { loadLocalFont, isLoading, error } = useLocalFont()

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await loadLocalFont(file)
      onFontLoaded(result.name, result.data)
    } catch {
      // Error is already set in the hook
    }

    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".ttf,.otf,.woff,.woff2"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        <span>Upload</span>
      </button>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
