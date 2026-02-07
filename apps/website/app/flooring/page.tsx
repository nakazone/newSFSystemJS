import { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Flooring Types',
  description: 'Explore our flooring options: site-finished wood, pre-finished wood, luxury vinyl, engineered wood, and laminate. Find the perfect floor for your home.',
  keywords: ['flooring types', 'wood flooring', 'luxury vinyl', 'engineered wood', 'laminate'],
})

const flooringTypes = [
  { name: 'Site-Finished Wood', slug: 'site-finished-wood' },
  { name: 'Pre-Finished Wood', slug: 'pre-finished-wood' },
  { name: 'Luxury Vinyl', slug: 'luxury-vinyl' },
  { name: 'Engineered Wood', slug: 'engineered-wood' },
  { name: 'Laminate', slug: 'laminate' },
]

export default function FlooringPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Flooring Types
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Explore our range of flooring options for your home or project.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flooringTypes.map((item) => (
              <Link
                key={item.slug}
                href={`/flooring/${item.slug}`}
                className="block bg-bg-light rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <h2 className="text-xl font-bold text-primary group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h2>
                <span className="inline-block mt-2 text-sm font-medium text-primary group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
