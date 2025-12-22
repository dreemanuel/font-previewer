import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignState, TypographyConfig } from './types'
import {
  getDefaultState,
  createDefaultVariation,
  defaultTypography,
  defaultColorTokens,
} from './defaults'

const STORAGE_KEY = 'font-previewer-state'
const STORAGE_VERSION = 2 // Bump version when schema changes

// Default sizes for each token
const DEFAULT_SIZES = {
  h1: 48,
  h2: 36,
  h3: 24,
  p1: 18,
  p2: 14,
} as const

// Migrate typography to ensure all tokens have size
function migrateTypography(typography: TypographyConfig): TypographyConfig {
  const tokens = ['h1', 'h2', 'h3', 'p1', 'p2'] as const
  const migrated = { ...typography }

  for (const token of tokens) {
    if (!migrated[token].size) {
      migrated[token] = { ...migrated[token], size: DEFAULT_SIZES[token] }
    }
  }

  return migrated
}
const MAX_VARIATIONS = 4
const MAX_PALETTE_COLORS = 8

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...getDefaultState(),

      // Typography actions
      setTypographyToken: (variationId, token, config) => {
        set((state) => ({
          variations: state.variations.map((v) =>
            v.id === variationId
              ? {
                  ...v,
                  typography: {
                    ...v.typography,
                    [token]: { ...v.typography[token], ...config },
                  },
                }
              : v
          ),
        }))
      },

      // Palette actions
      addPaletteColor: (color) => {
        const { palette } = get()
        if (palette.length >= MAX_PALETTE_COLORS) return

        set({ palette: [...palette, color] })
      },

      removePaletteColor: (index) => {
        const { palette } = get()
        if (palette.length <= 1) return

        set({ palette: palette.filter((_, i) => i !== index) })
      },

      updatePaletteColor: (index, color) => {
        set((state) => ({
          palette: state.palette.map((c, i) => (i === index ? color : c)),
        }))
      },

      // Color token actions
      setColorToken: (variationId, token, color) => {
        set((state) => ({
          variations: state.variations.map((v) =>
            v.id === variationId
              ? {
                  ...v,
                  colorTokens: { ...v.colorTokens, [token]: color },
                }
              : v
          ),
        }))
      },

      // Component selection
      toggleComponent: (componentId) => {
        set((state) => {
          const isSelected = state.selectedComponents.includes(componentId)

          // Don't allow removing the last component
          if (isSelected && state.selectedComponents.length <= 1) {
            return state
          }

          return {
            selectedComponents: isSelected
              ? state.selectedComponents.filter((id) => id !== componentId)
              : [...state.selectedComponents, componentId],
          }
        })
      },

      reorderComponents: (fromIndex, toIndex) => {
        set((state) => {
          const newComponents = [...state.selectedComponents]
          const [removed] = newComponents.splice(fromIndex, 1)
          newComponents.splice(toIndex, 0, removed)
          return { selectedComponents: newComponents }
        })
      },

      addRecentFont: (font) => {
        set((state) => {
          // Don't add system-ui to recent fonts
          if (font === 'system-ui') return state

          // Remove font if already in list, then add to front
          const filtered = state.recentFonts.filter((f) => f !== font)
          const newRecent = [font, ...filtered].slice(0, 5) // Keep max 5
          return { recentFonts: newRecent }
        })
      },

      // Variation management
      addVariation: () => {
        const { variations, activeVariationId } = get()
        if (variations.length >= MAX_VARIATIONS) return

        // Clone the active variation's settings
        const activeVariation = variations.find((v) => v.id === activeVariationId)
        const newVariation = createDefaultVariation(`Variation ${variations.length + 1}`)

        if (activeVariation) {
          newVariation.typography = { ...activeVariation.typography }
          newVariation.colorTokens = { ...activeVariation.colorTokens }
        }

        set({
          variations: [...variations, newVariation],
          activeVariationId: newVariation.id,
        })
      },

      removeVariation: (id) => {
        const { variations, activeVariationId } = get()
        if (variations.length <= 1) return

        const newVariations = variations.filter((v) => v.id !== id)
        const newActiveId =
          activeVariationId === id ? newVariations[0].id : activeVariationId

        set({
          variations: newVariations,
          activeVariationId: newActiveId,
        })
      },

      setActiveVariation: (id) => {
        set({ activeVariationId: id })
      },

      // View mode
      setViewMode: (mode) => {
        set({ viewMode: mode })
      },

      // Reset
      reset: () => {
        localStorage.removeItem(STORAGE_KEY)
        set(getDefaultState())
      },
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      partialize: (state) => ({
        palette: state.palette,
        selectedComponents: state.selectedComponents,
        recentFonts: state.recentFonts,
        variations: state.variations,
        activeVariationId: state.activeVariationId,
        viewMode: state.viewMode,
      }),
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<DesignState>

        // Migrate from version 1 (or no version) to version 2: add size to typography
        if (version < 2 && state.variations) {
          state.variations = state.variations.map((v) => ({
            ...v,
            typography: migrateTypography(v.typography),
          }))
        }

        return state as DesignState
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error('Failed to rehydrate font-previewer state:', error)
          // State will be reset to defaults by Zustand
        }
      },
    }
  )
)

// Selectors
export const selectActiveVariation = (state: DesignState) =>
  state.variations.find((v) => v.id === state.activeVariationId)

export const selectActiveTypography = (state: DesignState) =>
  selectActiveVariation(state)?.typography ?? defaultTypography

export const selectActiveColors = (state: DesignState) =>
  selectActiveVariation(state)?.colorTokens ?? defaultColorTokens

export const selectIsDefaultPalette = (state: DesignState) =>
  state.palette.length === 2 &&
  state.palette[0] === '#1a1a1a' &&
  state.palette[1] === '#f5f5f5'
