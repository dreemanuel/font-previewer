import type { TemplateProps } from '../types'
import { Star, ShoppingCart } from 'lucide-react'

const products = [
  { name: 'Wireless Headphones', price: '$129', rating: 4.8, reviews: 234 },
  { name: 'Smart Watch Pro', price: '$299', rating: 4.9, reviews: 567 },
  { name: 'Portable Speaker', price: '$79', rating: 4.6, reviews: 189 },
]

export function ProductCard({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: typography.h2.font }}
        >
          Featured Products
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="rounded-xl border overflow-hidden group cursor-pointer"
              style={{ borderColor: colors.alt + '30' }}
            >
              <div
                className="h-48 flex items-center justify-center relative"
                style={{ backgroundColor: colors.alt + '10' }}
              >
                <div
                  className="w-24 h-24 rounded-full"
                  style={{ backgroundColor: colors.main + '30' }}
                />
                <button
                  className="absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: colors.main, color: colors.textInv }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold mb-1"
                  style={{ fontFamily: typography.h3.font }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3"
                        style={{
                          color: i < Math.floor(product.rating) ? colors.main : colors.alt + '40',
                          fill: i < Math.floor(product.rating) ? colors.main : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-xs opacity-60"
                    style={{ fontFamily: typography.p2.font }}
                  >
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: typography.h3.font, color: colors.main }}
                  >
                    {product.price}
                  </span>
                  <button
                    className="text-sm font-medium px-3 py-1 rounded border transition-colors hover:bg-opacity-10"
                    style={{
                      borderColor: colors.main,
                      color: colors.main,
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
