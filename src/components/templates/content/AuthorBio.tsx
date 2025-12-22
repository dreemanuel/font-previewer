import type { TemplateProps } from '../types'
import { getText, getFontStyle } from '../types'
import { Twitter, Linkedin, Github } from 'lucide-react'

export function AuthorBio({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-8 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="p-6 rounded-xl border"
          style={{ borderColor: colors.alt + '30' }}
        >
          <div className="flex gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-bold shrink-0"
              style={{ backgroundColor: colors.main, color: colors.textInv, fontSize: `${typography.h3.size}px` }}
            >
              AS
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="font-bold"
                    style={getFontStyle(typography.h3)}
                  >
                    Alex Smith
                  </h3>
                  <p
                    className="opacity-60"
                    style={{ ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.9}px` }}
                  >
                    Senior Developer & Writer
                  </p>
                </div>
                <button
                  className="px-4 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: colors.main, color: colors.textInv, fontSize: `${typography.p2.size * 0.9}px` }}
                >
                  Follow
                </button>
              </div>
              <p
                className="mb-4 opacity-80"
                style={getFontStyle(typography.p2)}
              >
                {getText(typography.p2, 'Full-stack developer with 10+ years of experience. Passionate about clean code, developer tools, and teaching. Author of several popular open-source projects.')}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: colors.text }}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: colors.text }}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: colors.text }}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
