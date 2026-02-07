import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  Sparkles,
  Layout,
  Droplets,
  Expand,
  Paintbrush,
  Ruler,
  Layers,
} from 'lucide-react'
import { menuServices } from '@/data/menuServices'

const serviceIcons: Record<string, LucideIcon> = {
  'hardwood-refinishing': Sparkles,
  'hardwood-installation': Layout,
  'water-damage-services': Droplets,
  'extend-existing-hardwood': Expand,
  'screen-and-coat': Paintbrush,
  'self-leveling': Ruler,
  'stairs': Layers,
}

export function Services() {
  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Flooring Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert installation and services for all your flooring needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuServices.map((service) => {
            const slug = service.href.replace('/services/', '')
            const Icon = serviceIcons[slug] ?? Layout
            return (
            <Link
              key={service.href}
              href={service.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary-100 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.shortDescription}
              </p>
              <span className="inline-block mt-4 text-primary font-medium group-hover:underline">
                Learn More →
              </span>
            </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold text-white bg-primary hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
