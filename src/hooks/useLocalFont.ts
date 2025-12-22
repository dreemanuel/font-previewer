import { useState, useCallback } from 'react'

interface LocalFontResult {
  name: string
  data: string // Base64 encoded
}

interface UseLocalFontReturn {
  loadLocalFont: (file: File) => Promise<LocalFontResult>
  isLoading: boolean
  error: string | null
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const VALID_EXTENSIONS = ['.ttf', '.otf', '.woff', '.woff2']

/**
 * Hook for loading local font files
 */
export function useLocalFont(): UseLocalFontReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadLocalFont = useCallback(async (file: File): Promise<LocalFontResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 5MB limit')
      }

      // Validate file type
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      if (!VALID_EXTENSIONS.includes(ext)) {
        throw new Error('Invalid font format. Use TTF, OTF, WOFF, or WOFF2')
      }

      // Read file as ArrayBuffer
      const buffer = await file.arrayBuffer()

      // Create a clean font name from filename
      const fontName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9\s-]/g, '')

      // Load the font using FontFace API
      const font = new FontFace(fontName, buffer)
      await font.load()
      document.fonts.add(font)

      // Convert to base64 for storage
      const base64 = arrayBufferToBase64(buffer)

      setIsLoading(false)
      return { name: fontName, data: base64 }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load font'
      setError(message)
      setIsLoading(false)
      throw err
    }
  }, [])

  return { loadLocalFont, isLoading, error }
}

/**
 * Restore a local font from base64 data
 */
export async function restoreLocalFont(name: string, base64Data: string): Promise<void> {
  try {
    const buffer = base64ToArrayBuffer(base64Data)
    const font = new FontFace(name, buffer)
    await font.load()
    document.fonts.add(font)
  } catch (err) {
    console.error('Failed to restore local font:', name, err)
  }
}

// Helper functions for base64 conversion
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}
