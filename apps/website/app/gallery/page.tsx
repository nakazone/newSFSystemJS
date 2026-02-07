import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Gallery',
  description: 'View our portfolio of completed flooring projects. See examples of hardwood, vinyl, tile, and epoxy installations.',
  keywords: ['flooring gallery', 'flooring portfolio', 'before and after'],
})

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Browse our portfolio of completed flooring projects
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            Gallery images will be displayed here. Add your project photos to showcase your work.
          </p>
        </div>
      </section>
    </div>
  )
}
