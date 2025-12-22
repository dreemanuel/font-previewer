import type { TemplateProps } from '../types'
import { getText, defaultText } from '../types'
import { Quote } from 'lucide-react'

export function Testimonial({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-16 px-8"
      style={{ backgroundColor: colors.bgDark, color: colors.textInv }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Quote className="w-12 h-12 mx-auto mb-6 opacity-50" />
        <blockquote
          className="text-2xl font-medium mb-6 leading-relaxed"
          style={{ fontFamily: typography.p1.font }}
        >
          "{getText(typography.p1, 'This product has completely transformed how we work. The team is more productive than ever, and our clients love the results.')}"
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: colors.main, color: colors.textInv }}
          >
            JD
          </div>
          <div className="text-left">
            <p
              className="font-semibold"
              style={{ fontFamily: typography.p2.font }}
            >
              Jane Doe
            </p>
            <p
              className="text-sm opacity-70"
              style={{ fontFamily: typography.p2.font }}
            >
              CEO at TechCorp
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
