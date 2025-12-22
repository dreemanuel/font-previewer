import type { TemplateProps } from '../types'
import { getText, getFontStyle } from '../types'

export function ArticleHeader({ typography, colors }: TemplateProps) {
  return (
    <header
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <span
            className="font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.main + '20', color: colors.main, fontSize: `${typography.p2.size * 0.9}px` }}
          >
            Technology
          </span>
        </div>
        <h1
          className="font-bold mb-4 leading-tight"
          style={getFontStyle(typography.h1)}
        >
          {getText(typography.h1, 'The Future of Web Development: What to Expect in 2025')}
        </h1>
        <p
          className="opacity-70 mb-6"
          style={getFontStyle(typography.p1)}
        >
          {getText(typography.p1, 'Exploring the latest trends and technologies shaping the modern web.')}
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{ backgroundColor: colors.alt, color: colors.textInv, fontSize: `${typography.p2.size * 0.9}px` }}
          >
            AS
          </div>
          <div>
            <p
              className="font-medium"
              style={getFontStyle(typography.p2)}
            >
              Alex Smith
            </p>
            <p
              className="opacity-60"
              style={{ ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.85}px` }}
            >
              Dec 22, 2025 · 8 min read
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
