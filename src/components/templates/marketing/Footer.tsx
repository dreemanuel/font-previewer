import type { TemplateProps } from '../types'
import { getFontStyle } from '../types'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export function Footer({ typography, colors }: TemplateProps) {
  return (
    <footer
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgDark, color: colors.textInv }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="font-bold mb-4"
              style={getFontStyle(typography.h3)}
            >
              Brand
            </h3>
            <p
              className="opacity-70"
              style={{ ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.9}px` }}
            >
              Building the future of design tools.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-semibold mb-3"
                style={getFontStyle(typography.p2)}
              >
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                      style={{ ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.9}px` }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 border-t text-center opacity-60"
          style={{ borderColor: colors.textInv + '20', ...getFontStyle(typography.p2), fontSize: `${typography.p2.size * 0.9}px` }}
        >
          © 2025 Brand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
