import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { FileText } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Policies',
  description: 'Senior Floors policies including privacy, terms of service, and company policies.',
  keywords: ['policies', 'privacy policy', 'terms of service'],
})

export default function PoliciesPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Our Policies
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Privacy, terms, and company policies.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Policies &amp; Terms
                </h2>
                <p className="text-text-light">
                  Privacy policy, terms of service, and other company policies can be added to this page.
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Policy content will be displayed here. You can add sections for Privacy Policy, Terms of Service, and any other policies.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
