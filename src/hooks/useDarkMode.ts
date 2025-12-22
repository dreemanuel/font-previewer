import { useState, useEffect } from 'react'

const STORAGE_KEY = 'font-previewer-dark-mode'

// Get initial dark mode preference
function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Apply on initial load (before React hydrates)
if (typeof window !== 'undefined') {
  const isDark = getInitialDarkMode()
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  const toggle = () => {
    setIsDark(prev => {
      const newValue = !prev

      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      localStorage.setItem(STORAGE_KEY, String(newValue))
      return newValue
    })
  }

  // Sync state with DOM on mount
  useEffect(() => {
    const domIsDark = document.documentElement.classList.contains('dark')
    if (domIsDark !== isDark) {
      setIsDark(domIsDark)
    }
  }, [])

  return { isDark, toggle }
}
