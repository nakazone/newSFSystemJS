import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { portfolioProjects } from '@/data/portfolioProjects'

const FLOORING_PAGES: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  'site-finished-wood': {
    title: 'Site-Finished Wood',
    description:
      'Site-finished wood flooring is sanded and finished on-site for a custom look and seamless installation. Learn about our site-finished hardwood options.',
    keywords: ['site-finished wood', 'site-finished hardwood', 'custom wood flooring'],
  },
  'pre-finished-wood': {
    title: 'Pre-Finished Wood',
    description:
      'Pre-finished wood flooring arrives ready to install with a factory-applied finish. Durable, consistent, and faster installation. Explore our pre-finished options.',
    keywords: ['pre-finished wood', 'pre-finished hardwood', 'factory-finished flooring'],
  },
  'luxury-vinyl': {
    title: 'Luxury Vinyl',
    description:
      'Luxury vinyl plank (LVP) and luxury vinyl tile (LVT) offer waterproof, durable, and stylish flooring. Perfect for any room. See our luxury vinyl collection.',
    keywords: ['luxury vinyl', 'LVP', 'LVT', 'luxury vinyl plank', 'waterproof flooring'],
  },
  'engineered-wood': {
    title: 'Engineered Wood',
    description:
      'Engineered wood flooring combines a real wood veneer with a stable core for beauty and performance. Ideal for areas where solid hardwood may not suit.',
    keywords: ['engineered wood', 'engineered hardwood', 'wood veneer flooring'],
  },
  laminate: {
    title: 'Laminate',
    description:
      'Laminate flooring delivers the look of wood or tile at an affordable price. Durable, easy to maintain, and available in a wide range of styles.',
    keywords: ['laminate flooring', 'laminate wood look', 'affordable flooring'],
  },
}

const validSlugs = Object.keys(FLOORING_PAGES)

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = FLOORING_PAGES[params.slug]
  if (!page) return {}
  return generateSEOMetadata({
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    canonical: `/flooring/${params.slug}`,
  })
}

export default async function FlooringTypePage({
  params,
}: {
  params: { slug: string }
}) {
  const page = FLOORING_PAGES[params.slug]
  if (!page) notFound()

  const flooringProjects = portfolioProjects.filter((p) => p.flooringType === page.title)

  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            {page.title}
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            {page.description}
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg text-text-light">
            <p>
              Content for {page.title} can be added here. Contact us for more
              information or a free estimate.
            </p>
          </div>
        </div>
      </section>

      {flooringProjects.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-gray-100 bg-bg-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Our work in {page.title}
            </h2>
            <p className="text-lg text-text-light mb-8">
              Sample projects featuring {page.title}. View the full portfolio filtered by this flooring type.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flooringProjects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio?flooring=${params.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-light">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary group-hover:text-primary-600 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-light mt-1">{project.city} · {project.serviceType}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-6">
              <Link href={`/portfolio?flooring=${params.slug}`} className="text-primary font-medium hover:underline">
                View all {page.title} projects →
              </Link>
            </p>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/flooring"
              className="text-primary font-medium hover:underline"
            >
              ← Back to Flooring Types
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
