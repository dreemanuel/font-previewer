import type { ComponentId } from '../../store'

export interface ComponentMeta {
  id: ComponentId
  name: string
  category: 'marketing' | 'content' | 'ui'
}

export const componentRegistry: ComponentMeta[] = [
  // Marketing
  { id: 'hero', name: 'Hero Section', category: 'marketing' },
  { id: 'features', name: 'Features Grid', category: 'marketing' },
  { id: 'testimonial', name: 'Testimonial', category: 'marketing' },
  { id: 'pricing', name: 'Pricing Table', category: 'marketing' },
  { id: 'cta-banner', name: 'CTA Banner', category: 'marketing' },
  { id: 'footer', name: 'Footer', category: 'marketing' },

  // Content
  { id: 'article-header', name: 'Article Header', category: 'content' },
  { id: 'article-body', name: 'Article Body', category: 'content' },
  { id: 'blog-card', name: 'Blog Card', category: 'content' },
  { id: 'author-bio', name: 'Author Bio', category: 'content' },

  // UI Elements
  { id: 'navigation', name: 'Navigation', category: 'ui' },
  { id: 'product-card', name: 'Product Card', category: 'ui' },
  { id: 'user-profile', name: 'User Profile', category: 'ui' },
  { id: 'form-section', name: 'Form Section', category: 'ui' },
]

export const categoryLabels = {
  marketing: 'Marketing',
  content: 'Content',
  ui: 'UI Elements',
}

export function getComponentsByCategory() {
  return {
    marketing: componentRegistry.filter(c => c.category === 'marketing'),
    content: componentRegistry.filter(c => c.category === 'content'),
    ui: componentRegistry.filter(c => c.category === 'ui'),
  }
}
