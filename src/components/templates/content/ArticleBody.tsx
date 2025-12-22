import type { TemplateProps } from '../types'
import { getText } from '../types'

export function ArticleBody({ typography, colors }: TemplateProps) {
  return (
    <article
      className="py-8 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto prose">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: typography.h2.font }}
        >
          {getText(typography.h2, 'Introduction')}
        </h2>
        <p
          className="mb-6 leading-relaxed"
          style={{ fontFamily: typography.p1.font }}
        >
          {getText(typography.p1, 'The landscape of web development continues to evolve at a rapid pace. New frameworks, tools, and methodologies emerge regularly, each promising to revolutionize how we build for the web.')}
        </p>
        <h3
          className="text-xl font-semibold mb-3"
          style={{ fontFamily: typography.h3.font }}
        >
          {getText(typography.h3, 'Key Takeaways')}
        </h3>
        <ul className="space-y-2 mb-6">
          <li
            className="flex items-start gap-2"
            style={{ fontFamily: typography.p2.font }}
          >
            <span style={{ color: colors.main }}>•</span>
            Performance remains a top priority for modern applications
          </li>
          <li
            className="flex items-start gap-2"
            style={{ fontFamily: typography.p2.font }}
          >
            <span style={{ color: colors.main }}>•</span>
            Developer experience tools continue to improve
          </li>
          <li
            className="flex items-start gap-2"
            style={{ fontFamily: typography.p2.font }}
          >
            <span style={{ color: colors.main }}>•</span>
            AI-assisted development is becoming mainstream
          </li>
        </ul>
        <blockquote
          className="border-l-4 pl-4 italic my-6 opacity-80"
          style={{ borderColor: colors.main, fontFamily: typography.p1.font }}
        >
          "The best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged."
        </blockquote>
        <p
          className="text-sm opacity-60"
          style={{ fontFamily: typography.p2.font }}
        >
          Continue reading for more insights on building modern web applications...
        </p>
      </div>
    </article>
  )
}
