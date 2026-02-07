import { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Award, MapPin, Users, Heart } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Us',
  description:
    'Since 2018, Senior Floors has been transforming homes with craftsmanship and integrity. Denver\'s trusted hardwood flooring experts from NJ, NY, PA, and CO.',
  keywords: ['about Senior Floors', 'flooring company Denver', 'hardwood flooring experts', 'family-owned flooring'],
  canonical: '/about',
})

const highlights = [
  { icon: Award, value: '10+', label: 'Years of Experience' },
  { icon: MapPin, value: 'Denver Metro', label: 'Service Area' },
  { icon: Users, value: '500+', label: 'Happy Customers' },
  { icon: Heart, value: '5-Star', label: 'Rated on Google' },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="relative min-h-[280px] lg:min-h-0 rounded-xl overflow-hidden shadow-lg bg-white">
              <Image
                src="/assets/project1.jpg"
                alt="Senior Floors team at work - Denver flooring contractor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                  About Us
                </h1>
                <p className="text-lg text-text-light mb-6">
                  Since 2018, Senior Floors has been dedicated to transforming homes with craftsmanship, passion, and integrity. What began as a small dream on the East Coast has grown into a company trusted by families and designers who seek elegance, precision, and a truly personalized experience.
                </p>
                <p className="text-text-light mb-6">
                  Born in New Jersey, our work has brought life to high-end residences across NJ, NY, PA, and CO — from the iconic streets of Manhattan to the serene luxury of the Hamptons, Rumson, and Colts Neck. In 2022, we brought this legacy of excellence to Denver, Colorado, making it our new home and the heart of our operations.
                </p>
                <p className="text-text-light mb-6">
                  At Senior Floors, we believe that a floor is more than a surface — it is the foundation of every memory created inside a home. That is why our team takes the time to understand each project with care, honesty, and technical expertise. Every detail matters, and every client&apos;s vision becomes our mission.
                </p>
                <p className="text-text-light">
                  Our promise is simple: deliver exceptional quality, clear communication, and an experience centered on trust. Because for us, your home isn&apos;t just a project — it&apos;s a place where life happens.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {item.value}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-light">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
