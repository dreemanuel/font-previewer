import type { TemplateProps } from '../types'
import { getText, getFontStyle } from '../types'

export function FormSection({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-md mx-auto">
        <div
          className="p-8 rounded-xl border"
          style={{ borderColor: colors.alt + '30' }}
        >
          <h2
            className="font-bold mb-2"
            style={getFontStyle(typography.h2)}
          >
            {getText(typography.h2, 'Contact Us')}
          </h2>
          <p
            className="opacity-70 mb-6"
            style={getFontStyle(typography.p2)}
          >
            Fill out the form below and we'll get back to you soon.
          </p>

          <form className="space-y-4">
            <div>
              <label
                className="block font-medium mb-1"
                style={getFontStyle(typography.p2)}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors focus:ring-2"
                style={{
                  borderColor: colors.alt + '30',
                  backgroundColor: colors.bgLight,
                  ...getFontStyle(typography.p2),
                }}
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                style={getFontStyle(typography.p2)}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors focus:ring-2"
                style={{
                  borderColor: colors.alt + '30',
                  backgroundColor: colors.bgLight,
                  ...getFontStyle(typography.p2),
                }}
              />
            </div>

            <div>
              <label
                className="block font-medium mb-1"
                style={getFontStyle(typography.p2)}
              >
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors focus:ring-2 resize-none"
                style={{
                  borderColor: colors.alt + '30',
                  backgroundColor: colors.bgLight,
                  ...getFontStyle(typography.p2),
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded"
                style={{ accentColor: colors.main }}
              />
              <label
                htmlFor="terms"
                className="opacity-70"
                style={getFontStyle(typography.p2)}
              >
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: colors.main,
                color: colors.textInv,
                ...getFontStyle(typography.p2),
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
