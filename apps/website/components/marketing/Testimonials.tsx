import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    city: 'Denver, CO',
    rating: 5,
    text: 'Amazing work! Our hardwood floors look brand new. The team was professional, clean, and completed the job on time. Highly recommend!',
    service: 'Hardwood Flooring',
  },
  {
    id: 2,
    name: 'Michael Chen',
    city: 'Aurora, CO',
    rating: 5,
    text: 'Installed LVP throughout our entire home. The quality is outstanding and the installation was flawless. Couldn\'t be happier!',
    service: 'Vinyl Flooring',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    city: 'Lakewood, CO',
    rating: 5,
    text: 'Epoxy floor in our garage exceeded expectations. It\'s been a year and it still looks perfect. Great value for the money.',
    service: 'Epoxy Flooring',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Don&apos;t just take our word for it - see what our customers have to say
          </p>
          <a
            href="/reviews"
            className="inline-block bg-primary/5 border border-primary/20 rounded-md px-4 py-2 hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <div className="text-secondary text-base font-semibold mb-1 text-center tracking-wider">
              ★★★★★ Google Reviews
            </div>
            <div className="text-primary text-xs font-semibold text-center uppercase tracking-wide">
              Hardwood Flooring Specialists
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-text-dark mb-4 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <div className="font-semibold text-text-dark">{testimonial.name}</div>
                <div className="text-sm text-text-light">{testimonial.city}</div>
                <div className="text-sm text-primary mt-1">{testimonial.service}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/reviews"
            className="text-primary font-semibold hover:underline"
          >
            Read More Reviews →
          </a>
        </div>
      </div>
    </section>
  )
}
