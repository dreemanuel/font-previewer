import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignState } from './types'
import {
  getDefaultState,
  createDefaultVariation,
  defaultTypography,
  defaultColorTokens,
} from './defaults'

const STORAGE_KEY = 'font-previewer-state'
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
      partialize: (state) => ({
        palette: state.palette,
        selectedComponents: state.selectedComponents,
        variations: state.variations,
        activeVariationId: state.activeVariationId,
        viewMode: state.viewMode,
      }),
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
