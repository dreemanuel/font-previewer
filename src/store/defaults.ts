import type { TypographyConfig, ColorTokens, Variation, ComponentId } from './types'

// Default typography configuration (system fonts)
export const defaultTypography: TypographyConfig = {
  h1: {
    font: 'system-ui',
    source: 'system',
    text: '',
    size: 48,
  },
  h2: {
    font: 'system-ui',
    source: 'system',
    text: '',
    size: 36,
  },
  h3: {
    font: 'system-ui',
    source: 'system',
    text: '',
    size: 24,
  },
  p1: {
    font: 'system-ui',
    source: 'system',
    text: '',
    size: 18,
  },
  p2: {
    font: 'system-ui',
    source: 'system',
    text: '',
    size: 14,
  },
}

// Default colors (near-black and near-white)
export const DEFAULT_NEAR_BLACK = '#1a1a1a'
export const DEFAULT_NEAR_WHITE = '#f5f5f5'

export const defaultPalette: string[] = [DEFAULT_NEAR_BLACK, DEFAULT_NEAR_WHITE]

// Default color token assignments
export const defaultColorTokens: ColorTokens = {
  main: DEFAULT_NEAR_BLACK,
  alt: DEFAULT_NEAR_BLACK,
  bgLight: DEFAULT_NEAR_WHITE,
  bgDark: DEFAULT_NEAR_BLACK,
  text: DEFAULT_NEAR_BLACK,
  textInv: DEFAULT_NEAR_WHITE,
}

// Default selected components (show a good variety on first load)
export const defaultSelectedComponents: ComponentId[] = ['hero', 'features', 'testimonial']

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

// Create a default variation
export const createDefaultVariation = (name: string = 'Variation 1'): Variation => ({
  id: generateId(),
  name,
  typography: { ...defaultTypography },
  colorTokens: { ...defaultColorTokens },
})

// Get complete default state
export const getDefaultState = () => {
  const defaultVariation = createDefaultVariation()
  return {
    palette: [...defaultPalette],
    selectedComponents: [...defaultSelectedComponents],
    recentFonts: [] as string[],
    variations: [defaultVariation],
    activeVariationId: defaultVariation.id,
    viewMode: 'grid' as const,
  }
}
