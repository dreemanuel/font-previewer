// Lorem ipsum word bank
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'vitae', 'elementum',
  'curabitur', 'ultricies', 'nunc', 'blandit', 'libero', 'volutpat', 'mauris',
  'pharetra', 'massa', 'sagittis', 'orci', 'porta', 'faucibus', 'nisl',
  'tincidunt', 'eget', 'nullam', 'vehicula', 'ipsum', 'a', 'arcu', 'cursus',
]

/**
 * Generate random lorem ipsum text
 */
export function generateLorem(wordCount: number): string {
  const words: string[] = []

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length)
    words.push(LOREM_WORDS[randomIndex])
  }

  // Capitalize first word
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }

  // Add period at end
  let text = words.join(' ')
  if (!text.endsWith('.')) {
    text += '.'
  }

  return text
}

// Default word counts for different token types
export const LOREM_LENGTHS = {
  h1: 4,
  h2: 6,
  h3: 8,
  p1: 30,
  p2: 20,
} as const

/**
 * Get lorem ipsum for a specific token type
 */
export function getLoremForToken(token: keyof typeof LOREM_LENGTHS): string {
  return generateLorem(LOREM_LENGTHS[token])
}

/**
 * Adjust lorem length (add or remove words)
 */
export function adjustLoremLength(
  currentText: string,
  adjustment: 'longer' | 'shorter'
): string {
  const currentWords = currentText.trim().replace(/\.$/, '').split(/\s+/).filter(Boolean)
  const currentLength = currentWords.length

  if (adjustment === 'shorter') {
    // Remove 20% of words, minimum 3 words
    const newLength = Math.max(3, Math.floor(currentLength * 0.8))
    if (newLength >= currentLength) return currentText

    const shorterWords = currentWords.slice(0, newLength)
    // Capitalize first word
    shorterWords[0] = shorterWords[0].charAt(0).toUpperCase() + shorterWords[0].slice(1)
    return shorterWords.join(' ') + '.'
  } else {
    // Add 30% more words
    const additionalCount = Math.max(2, Math.floor(currentLength * 0.3))
    const additionalWords: string[] = []

    for (let i = 0; i < additionalCount; i++) {
      const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length)
      additionalWords.push(LOREM_WORDS[randomIndex])
    }

    return currentWords.join(' ') + ' ' + additionalWords.join(' ') + '.'
  }
}

/**
 * Check if text looks like lorem ipsum
 */
export function isLoremIpsum(text: string): boolean {
  const lowerText = text.toLowerCase()
  const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur']
  return loremWords.some(word => lowerText.includes(word))
}
