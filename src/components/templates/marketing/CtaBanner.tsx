import type { TemplateProps } from '../types'
import { getFontStyle } from '../types'

export function CtaBanner({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-16 px-8"
      style={{ backgroundColor: colors.main, color: colors.textInv }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="font-bold mb-4"
          style={getFontStyle(typography.h2)}
        >
          Ready to Get Started?
        </h2>
        <p
          className="mb-8 opacity-90"
          style={getFontStyle(typography.p1)}
        >
          Join thousands of satisfied customers and transform your workflow today.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.bgLight, color: colors.text }}
          >
            Start Free Trial
          </button>
          <button
            className="px-8 py-3 rounded-lg font-medium border-2 transition-opacity hover:opacity-80"
            style={{ borderColor: colors.textInv, color: colors.textInv }}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
