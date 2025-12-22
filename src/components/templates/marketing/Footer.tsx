import type { TemplateProps } from '../types'

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
              className="text-xl font-bold mb-4"
              style={{ fontFamily: typography.h3.font }}
            >
              Brand
            </h3>
            <p
              className="text-sm opacity-70"
              style={{ fontFamily: typography.p2.font }}
            >
              Building the future of design tools.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-semibold mb-3"
                style={{ fontFamily: typography.p2.font }}
              >
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                      style={{ fontFamily: typography.p2.font }}
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
          className="pt-8 border-t text-sm text-center opacity-60"
          style={{ borderColor: colors.textInv + '20', fontFamily: typography.p2.font }}
        >
          © 2025 Brand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
