import type { TemplateProps } from '../types'
import { Menu, Search, User } from 'lucide-react'

const navItems = ['Products', 'Solutions', 'Pricing', 'Resources']

export function Navigation({ typography, colors }: TemplateProps) {
  return (
    <nav
      className="py-4 px-8 border-b"
      style={{
        backgroundColor: colors.bgLight,
        color: colors.text,
        borderColor: colors.alt + '20',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: typography.h3.font }}
          >
            Brand
          </h1>
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: typography.p2.font }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <User className="w-5 h-5" />
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.main, color: colors.textInv }}
          >
            Get Started
          </button>
          <button className="md:hidden p-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
