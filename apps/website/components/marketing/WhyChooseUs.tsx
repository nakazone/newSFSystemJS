import Link from 'next/link'
import { CheckCircle, Award, Clock, Shield } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Expert Craftsmanship',
    description: 'Certified installers with years of experience and attention to detail',
  },
  {
    icon: Clock,
    title: 'On-Time Completion',
    description: 'We respect your schedule and complete projects on time, every time',
  },
  {
    icon: Shield,
    title: 'Warranty Protected',
    description: 'All our work comes with comprehensive warranties for your peace of mind',
  },
  {
    icon: CheckCircle,
    title: 'Free Estimates',
    description: 'No obligation estimates - we make it easy to get started',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600">
            Experience the difference of working with flooring professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-md">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold text-white bg-primary hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Talk to Our Experts
          </Link>
        </div>
      </div>
    </section>
  )
}
