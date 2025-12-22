// Typography token identifiers
export type TypographyToken = 'h1' | 'h2' | 'h3' | 'p1' | 'p2'

// Color token identifiers
export type ColorToken = 'main' | 'alt' | 'bgLight' | 'bgDark' | 'text' | 'textInv'

// Component template identifiers
export type ComponentId =
  // Marketing
  | 'hero'
  | 'features'
  | 'testimonial'
  | 'pricing'
  | 'cta-banner'
  | 'footer'
  // Content
  | 'article-header'
  | 'article-body'
  | 'blog-card'
  | 'author-bio'
  // UI Elements
  | 'navigation'
  | 'product-card'
  | 'user-profile'
  | 'form-section'

// Font size options (in pixels)
export type FontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 80 | 96

// Configuration for a single typography token
export interface TokenConfig {
  font: string
  source: 'google' | 'local' | 'system'
  text: string
  size: FontSize
  localFontData?: string // Base64 encoded font data for local fonts
}

// Typography configuration for all tokens
export type TypographyConfig = Record<TypographyToken, TokenConfig>

// Color token assignments
export type ColorTokens = Record<ColorToken, string>

// A single variation with its own typography and color settings
export interface Variation {
  id: string
  name: string
  typography: TypographyConfig
  colorTokens: ColorTokens
}

// View mode for the canvas
export type ViewMode = 'grid' | 'fullpage'

// Complete design state
export interface DesignState {
  // Color palette (shared across variations)
  palette: string[]

  // Selected components to preview
  selectedComponents: ComponentId[]

  // Recently used fonts (max 5)
  recentFonts: string[]

  // Design variations
  variations: Variation[]
  activeVariationId: string

  // View settings
  viewMode: ViewMode

  // Actions
  setTypographyToken: (
    variationId: string,
    token: TypographyToken,
    config: Partial<TokenConfig>
  ) => void
  addPaletteColor: (color: string) => void
  removePaletteColor: (index: number) => void
  updatePaletteColor: (index: number, color: string) => void
  setColorToken: (
    variationId: string,
    token: ColorToken,
    color: string
  ) => void
  toggleComponent: (componentId: ComponentId) => void
  reorderComponents: (fromIndex: number, toIndex: number) => void
  addRecentFont: (font: string) => void
  addVariation: () => void
  duplicateVariation: (id: string) => void
  removeVariation: (id: string) => void
  setActiveVariation: (id: string) => void
  setViewMode: (mode: ViewMode) => void
  reset: () => void
}
