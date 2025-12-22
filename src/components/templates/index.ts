import type { ComponentType } from 'react'
import type { TemplateProps } from './types'
import type { ComponentId } from '../../store'

// Marketing
import { Hero } from './marketing/Hero'
import { FeaturesGrid } from './marketing/FeaturesGrid'
import { Testimonial } from './marketing/Testimonial'
import { PricingTable } from './marketing/PricingTable'
import { CtaBanner } from './marketing/CtaBanner'
import { Footer } from './marketing/Footer'

// Content
import { ArticleHeader } from './content/ArticleHeader'
import { ArticleBody } from './content/ArticleBody'
import { BlogCard } from './content/BlogCard'
import { AuthorBio } from './content/AuthorBio'

// UI Elements
import { Navigation } from './ui-elements/Navigation'
import { ProductCard } from './ui-elements/ProductCard'
import { UserProfileCard } from './ui-elements/UserProfileCard'
import { FormSection } from './ui-elements/FormSection'

export const templateComponents: Record<ComponentId, ComponentType<TemplateProps>> = {
  'hero': Hero,
  'features': FeaturesGrid,
  'testimonial': Testimonial,
  'pricing': PricingTable,
  'cta-banner': CtaBanner,
  'footer': Footer,
  'article-header': ArticleHeader,
  'article-body': ArticleBody,
  'blog-card': BlogCard,
  'author-bio': AuthorBio,
  'navigation': Navigation,
  'product-card': ProductCard,
  'user-profile': UserProfileCard,
  'form-section': FormSection,
}

export { componentRegistry, getComponentsByCategory, categoryLabels } from './registry'
export type { TemplateProps } from './types'
