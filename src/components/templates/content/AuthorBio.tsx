import type { TemplateProps } from '../types'
import { getText } from '../types'
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
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ backgroundColor: colors.main, color: colors.textInv }}
            >
              AS
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: typography.h3.font }}
                  >
                    Alex Smith
                  </h3>
                  <p
                    className="text-sm opacity-60"
                    style={{ fontFamily: typography.p2.font }}
                  >
                    Senior Developer & Writer
                  </p>
                </div>
                <button
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: colors.main, color: colors.textInv }}
                >
                  Follow
                </button>
              </div>
              <p
                className="mb-4 opacity-80"
                style={{ fontFamily: typography.p2.font }}
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
