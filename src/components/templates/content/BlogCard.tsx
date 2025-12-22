import type { TemplateProps } from '../types'
import { getText, getFontStyle } from '../types'
import { Clock, ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'Getting Started with TypeScript',
    excerpt: 'A comprehensive guide to TypeScript for beginners.',
    category: 'Tutorial',
    readTime: '5 min',
  },
  {
    title: 'Design Systems at Scale',
    excerpt: 'How to build and maintain design systems for large teams.',
    category: 'Design',
    readTime: '8 min',
  },
  {
    title: 'The State of CSS in 2025',
    excerpt: 'Modern CSS features that will change how you write styles.',
    category: 'CSS',
    readTime: '6 min',
  },
]

export function BlogCard({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-bold mb-8"
          style={getFontStyle(typography.h2)}
        >
          {getText(typography.h2, 'Latest Articles')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="rounded-xl border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              style={{ borderColor: colors.alt + '30', backgroundColor: colors.bgLight }}
            >
              <div
                className="h-40 flex items-center justify-center"
                style={{ backgroundColor: colors.main + '10' }}
              >
                <span
                  className="font-bold opacity-20"
                  style={{ ...getFontStyle(typography.h1), fontSize: `${typography.h1.size * 0.8}px` }}
                >
                  {index + 1}
                </span>
              </div>
              <div className="p-5">
                <span
                  className="font-medium px-2 py-1 rounded"
                  style={{ backgroundColor: colors.alt + '20', color: colors.alt, fontSize: `${typography.p2.size * 0.85}px` }}
                >
                  {post.category}
                </span>
                <h3
                  className="font-semibold mt-3 mb-2"
                  style={getFontStyle(typography.h3)}
                >
                  {post.title}
                </h3>
                <p
                  className="opacity-70 mb-4"
                  style={getFontStyle(typography.p2)}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="opacity-60 flex items-center gap-1"
                    style={{ ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.85}px` }}
                  >
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span
                    className="font-medium flex items-center gap-1"
                    style={{ color: colors.main, fontSize: `${typography.p2.size}px` }}
                  >
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
