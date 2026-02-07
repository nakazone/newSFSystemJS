import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Portfolio',
  description: 'Explore our portfolio of flooring projects. Hardwood, vinyl, tile, epoxy installations across Denver and beyond.',
  keywords: ['flooring portfolio', 'flooring projects', 'before and after'],
})

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { city?: string; page?: string; service?: string; flooring?: string; material?: string }
}) {
  const initialCitySlug = typeof searchParams.city === 'string' ? searchParams.city : undefined
  const initialServiceSlug = typeof searchParams.service === 'string' ? searchParams.service : undefined
  const initialFlooringSlug = typeof searchParams.flooring === 'string' ? searchParams.flooring : undefined
  const initialMaterialSlug = typeof searchParams.material === 'string' ? searchParams.material : undefined
  const initialPage = typeof searchParams.page === 'string' ? searchParams.page : undefined

  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Explore our completed flooring projects across Denver and beyond.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PortfolioGallery initialCitySlug={initialCitySlug} initialServiceSlug={initialServiceSlug} initialFlooringSlug={initialFlooringSlug} initialMaterialSlug={initialMaterialSlug} initialPage={initialPage} />
        </div>
      </section>
    </div>
  )
}
