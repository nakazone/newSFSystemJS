import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import { menuServices } from '@/data/menuServices'

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/seniorfloors/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/seniorflooring', icon: Facebook },
]

const footerFlooringItems = [
  { name: 'Site-Finished Wood', href: '/flooring/site-finished-wood' },
  { name: 'Pre-Finished Wood', href: '/flooring/pre-finished-wood' },
  { name: 'Luxury Vinyl', href: '/flooring/luxury-vinyl' },
  { name: 'Engineered Wood', href: '/flooring/engineered-wood' },
  { name: 'Laminate', href: '/flooring/laminate' },
]

const footerNavigation = {
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/logoSeniorFloors.png"
              alt="Senior Floors"
              width={160}
              height={160}
              className="h-32 w-auto object-contain mb-4"
            />
            <p className="text-white/80 mb-4 text-sm leading-relaxed">
              Elegant, durable flooring installed with precision and care. Denver's trusted hardwood flooring experts serving medium to high-end homes across the metro area.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block bg-white/10 border border-white/20 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide">
                Licensed
              </span>
              <span className="inline-block bg-white/10 border border-white/20 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide">
                Insured
              </span>
              <span className="inline-block bg-white/10 border border-white/20 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide">
                10+ Years Experience
              </span>
            </div>
            <div className="inline-block bg-white/10 border border-white/20 rounded-md px-4 py-2 mt-2">
              <div className="text-secondary text-sm font-semibold mb-1 text-center tracking-wider">
                ★★★★★ Google Reviews
              </div>
              <div className="text-white/95 text-xs font-semibold text-center uppercase tracking-wide">
                Hardwood Flooring Specialists
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Services</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {menuServices.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-secondary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Flooring */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Flooring</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {footerFlooringItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-secondary text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-white block mb-1">Phone:</strong>
                <a href="tel:+17207519813" className="text-secondary hover:underline">
                  (720) 751-9813
                </a>
              </div>
              <div>
                <strong className="text-white block mb-1">Email:</strong>
                <a href="mailto:contact@senior-floors.com" className="text-secondary hover:underline">
                  contact@senior-floors.com
                </a>
              </div>
              <div>
                <strong className="text-white block mb-1">Service Areas:</strong>
                <span className="text-white/80">
                  Denver, Cherry Creek, Greenwood Village,<br />
                  Lakewood, Morrison, DTC, & Metro Area
                </span>
              </div>
              <div>
                <strong className="text-white block mb-2">Follow us:</strong>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:border-secondary hover:text-primary transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Senior Floors. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/60 hover:text-secondary text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
