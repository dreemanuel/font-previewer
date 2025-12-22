import type { TemplateProps } from '../types'
import { getText, defaultText } from '../types'

export function Hero({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-20 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: typography.h1.font }}
        >
          {getText(typography.h1, defaultText.h1)}
        </h1>
        <p
          className="text-xl mb-8 opacity-80"
          style={{ fontFamily: typography.p1.font }}
        >
          {getText(typography.p1, defaultText.p1)}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.main, color: colors.textInv }}
          >
            Get Started
          </button>
          <button
            className="px-8 py-3 rounded-lg font-medium border-2 transition-opacity hover:opacity-80"
            style={{ borderColor: colors.main, color: colors.main }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
