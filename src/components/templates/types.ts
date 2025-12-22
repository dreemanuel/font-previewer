import type { TypographyConfig, ColorTokens } from '../../store'

export interface TemplateProps {
  typography: TypographyConfig
  colors: ColorTokens
}

// Default text for each token if user hasn't entered any
export const defaultText = {
  h1: 'Welcome to Our Platform',
  h2: 'Discover Amazing Features',
  h3: 'Getting Started',
  p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  p2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
}

export function getText(config: { text: string }, fallback: string): string {
  return config.text.trim() || fallback
}
