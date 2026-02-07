import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { EstimateForm } from '@/components/forms/EstimateForm'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with our flooring experts. Call, email, or fill out our contact form. We are here to help with all your flooring needs.',
  keywords: ['contact flooring', 'flooring contractor contact', 'flooring company'],
})

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/seniorfloors/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/seniorflooring', icon: Facebook },
]

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Have questions? We are here to help.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Send a message
              </h2>
              <p className="text-text-light mb-6">
                We&apos;ll get back to you within 24 hours.
              </p>
              <div className="bg-bg-light rounded-xl p-6 sm:p-8">
                <EstimateForm />
              </div>
            </div>

            {/* Contact info - lista simples */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Contact
              </h2>
              <ul className="space-y-5 text-text-light">
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <a href="tel:+17207519813" className="text-primary font-medium hover:underline">
                      (720) 751-9813
                    </a>
                    <br />
                    <span className="text-sm">Mon–Fri 8am–6pm</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <a href="mailto:contact@senior-floors.com" className="text-primary font-medium hover:underline">
                      contact@senior-floors.com
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Denver, CO · Metro Area</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sat 9am–4pm · Sun closed</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-primary mb-2">Follow us</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-primary mb-1">Service areas</p>
                <p className="text-sm text-text-light">
                  Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison & metro area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
