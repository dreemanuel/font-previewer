import type { TemplateProps } from '../types'
import { getText, getFontStyle } from '../types'

export function ArticleBody({ typography, colors }: TemplateProps) {
  return (
    <article
      className="py-8 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto prose">
        <h2
          className="font-bold mb-4"
          style={getFontStyle(typography.h2)}
        >
          {getText(typography.h2, 'Introduction')}
        </h2>
        <p
          className="mb-6 leading-relaxed"
          style={getFontStyle(typography.p1)}
        >
          {getText(typography.p1, 'The landscape of web development continues to evolve at a rapid pace. New frameworks, tools, and methodologies emerge regularly, each promising to revolutionize how we build for the web.')}
        </p>
        <h3
          className="font-semibold mb-3"
          style={getFontStyle(typography.h3)}
        >
          {getText(typography.h3, 'Key Takeaways')}
        </h3>
        <ul className="space-y-2 mb-6">
          <li
            className="flex items-start gap-2"
            style={getFontStyle(typography.p2)}
          >
            <span style={{ color: colors.main }}>•</span>
            Performance remains a top priority for modern applications
          </li>
          <li
            className="flex items-start gap-2"
            style={getFontStyle(typography.p2)}
          >
            <span style={{ color: colors.main }}>•</span>
            Developer experience tools continue to improve
          </li>
          <li
            className="flex items-start gap-2"
            style={getFontStyle(typography.p2)}
          >
            <span style={{ color: colors.main }}>•</span>
            AI-assisted development is becoming mainstream
          </li>
        </ul>
        <blockquote
          className="border-l-4 pl-4 italic my-6 opacity-80"
          style={{ borderColor: colors.main, ...getFontStyle(typography.p1) }}
        >
          "The best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged."
        </blockquote>
        <p
          className="opacity-60"
          style={getFontStyle(typography.p2)}
        >
          Continue reading for more insights on building modern web applications...
        </p>
      </div>
    </article>
  )
}
