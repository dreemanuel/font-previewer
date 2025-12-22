import { useState, useCallback } from 'react'

interface EyeDropperResult {
  sRGBHex: string
}

interface UseEyeDropperReturn {
  isSupported: boolean
  pickColor: () => Promise<string | null>
  isActive: boolean
  error: string | null
}

/**
 * Hook for using the EyeDropper API
 */
export function useEyeDropper(): UseEyeDropperReturn {
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if EyeDropper API is supported
  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const pickColor = useCallback(async (): Promise<string | null> => {
    if (!isSupported) {
      setError('EyeDropper is not supported in this browser')
      return null
    }

    setIsActive(true)
    setError(null)

    try {
      // @ts-expect-error - EyeDropper is not in TypeScript types yet
      const eyeDropper = new window.EyeDropper()
      const result: EyeDropperResult = await eyeDropper.open()
      setIsActive(false)
      return result.sRGBHex.toLowerCase()
    } catch (err) {
      setIsActive(false)

      // User cancelled - not an error
      if (err instanceof Error && err.name === 'AbortError') {
        return null
      }

      const message = err instanceof Error ? err.message : 'Failed to pick color'
      setError(message)
      return null
    }
  }, [isSupported])

  return { isSupported, pickColor, isActive, error }
}
