import type { TemplateProps } from '../types'
import { getText } from '../types'

export function ArticleHeader({ typography, colors }: TemplateProps) {
  return (
    <header
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.main + '20', color: colors.main }}
          >
            Technology
          </span>
        </div>
        <h1
          className="text-4xl font-bold mb-4 leading-tight"
          style={{ fontFamily: typography.h1.font }}
        >
          {getText(typography.h1, 'The Future of Web Development: What to Expect in 2025')}
        </h1>
        <p
          className="text-xl opacity-70 mb-6"
          style={{ fontFamily: typography.p1.font }}
        >
          {getText(typography.p1, 'Exploring the latest trends and technologies shaping the modern web.')}
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: colors.alt, color: colors.textInv }}
          >
            AS
          </div>
          <div>
            <p
              className="font-medium"
              style={{ fontFamily: typography.p2.font }}
            >
              Alex Smith
            </p>
            <p
              className="text-sm opacity-60"
              style={{ fontFamily: typography.p2.font }}
            >
              Dec 22, 2025 · 8 min read
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
