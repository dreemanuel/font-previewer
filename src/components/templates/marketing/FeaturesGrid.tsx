import type { TemplateProps } from '../types'
import { getText, defaultText } from '../types'
import { Zap, Shield, Sparkles } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed and performance.' },
  { icon: Shield, title: 'Secure by Default', description: 'Built with security in mind.' },
  { icon: Sparkles, title: 'Modern Design', description: 'Clean and intuitive interface.' },
]

export function FeaturesGrid({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-16 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ fontFamily: typography.h2.font }}
        >
          {getText(typography.h2, 'Why Choose Us')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border"
              style={{ borderColor: colors.alt + '30', backgroundColor: colors.bgLight }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.main + '20' }}
              >
                <feature.icon className="w-6 h-6" style={{ color: colors.main }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: typography.h3.font }}
              >
                {feature.title}
              </h3>
              <p
                className="opacity-70"
                style={{ fontFamily: typography.p2.font }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
