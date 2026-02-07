import { Metadata } from 'next'
import { EstimateForm } from '@/components/forms/EstimateForm'
import { CheckCircle, Phone, Clock, Shield } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Free Estimate',
  description: 'Get a free, no-obligation estimate for your flooring project. Professional consultation and transparent pricing.',
  keywords: ['free estimate', 'flooring estimate', 'flooring quote', 'free consultation'],
})

const benefits = [
  'No obligation - completely free',
  'Transparent pricing',
  'Expert consultation',
  'Quick response time',
]

export default function FreeEstimatePage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Get Your Free Estimate
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Fill out the form below and we'll contact you within 24 hours with a free, no-obligation estimate for your flooring project.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Request Your Free Estimate
                </h2>
                <EstimateForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Why Get an Estimate?
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Prefer to Call?
                </h3>
                <a
                  href="tel:+1-XXX-XXX-XXXX"
                  className="flex items-center gap-3 text-primary-600 font-semibold text-lg mb-4 hover:text-primary-700"
                >
                  <Phone className="h-6 w-6" />
                  (XXX) XXX-XXXX
                </a>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is available Monday - Friday, 8am - 6pm
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mt-0.5" />
                  <span>We typically respond within 24 hours</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Fully Insured & Licensed
                    </h3>
                    <p className="text-sm text-gray-600">
                      All our work is backed by comprehensive insurance and warranties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
