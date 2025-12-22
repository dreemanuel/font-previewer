import type { TemplateProps } from '../types'
import { getFontStyle } from '../types'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$9',
    features: ['5 Projects', '10GB Storage', 'Basic Support'],
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Analytics'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Manager', 'SLA'],
    featured: false,
  },
]

export function PricingTable({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-16 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-bold text-center mb-12"
          style={getFontStyle(typography.h2)}
        >
          Simple Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${plan.featured ? 'scale-105' : ''}`}
              style={{
                borderColor: plan.featured ? colors.main : colors.alt + '30',
                backgroundColor: plan.featured ? colors.main + '05' : colors.bgLight,
              }}
            >
              <h3
                className="font-semibold mb-2"
                style={getFontStyle(typography.h3)}
              >
                {plan.name}
              </h3>
              <div className="mb-4">
                <span
                  className="font-bold"
                  style={{ ...getFontStyle(typography.h2), fontSize: `${typography.h2.size * 1.2}px` }}
                >
                  {plan.price}
                </span>
                <span className="opacity-60" style={getFontStyle(typography.p2)}>
                  /month
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: colors.main }} />
                    <span style={getFontStyle(typography.p2)}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: plan.featured ? colors.main : 'transparent',
                  color: plan.featured ? colors.textInv : colors.main,
                  border: plan.featured ? 'none' : `2px solid ${colors.main}`,
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
