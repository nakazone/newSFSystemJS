import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { EstimateForm } from '@/components/forms/EstimateForm'
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Schedule a Measurement',
  description: 'Schedule a free in-home measurement for your flooring project. Our experts will visit your property at your convenience.',
  keywords: ['schedule measurement', 'free measurement', 'flooring measurement', 'in-home consultation'],
})

const benefits = [
  'Accurate measurements for precise quotes',
  'Expert advice on material selection',
  'See samples in your space',
  'No obligation - completely free',
]

export default function ScheduleMeasurementPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Schedule a Free Measurement
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Let our experts visit your property for accurate measurements and personalized recommendations.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">
                    Request Your Free Measurement
                  </h2>
                </div>
                <p className="text-text-light mb-6">
                  Fill out the form below and we will contact you to schedule a convenient time for our team to visit your property.
                </p>
                <EstimateForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-bg-light rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-primary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Flexible Scheduling
                    </h3>
                    <p className="text-sm text-text-light">
                      We work around your schedule. Available weekdays, evenings, and weekends.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Service Areas
                    </h3>
                    <p className="text-sm text-text-light">
                      We serve [City] and surrounding areas. Contact us to confirm we service your location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Request', description: 'Fill out the form or call us' },
              { step: '2', title: 'Schedule', description: 'We will confirm a convenient time' },
              { step: '3', title: 'Visit', description: 'Our expert visits your property' },
              { step: '4', title: 'Quote', description: 'Receive your detailed estimate' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
