'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Lock, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { menuServices } from '@/data/menuServices'

const aboutDropdownItems = [
  { name: 'About Us', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Warranty', href: '/warranty' },
  { name: 'Google Reviews', href: '/reviews' },
  { name: 'Service Areas', href: '/service-areas' },
]

const servicesDropdownItems = menuServices.map(({ name, href }) => ({ name, href }))

const flooringDropdownItems = [
  { name: 'Site-Finished Wood', href: '/flooring/site-finished-wood' },
  { name: 'Pre-Finished Wood', href: '/flooring/pre-finished-wood' },
  { name: 'Luxury Vinyl', href: '/flooring/luxury-vinyl' },
  { name: 'Engineered Wood', href: '/flooring/engineered-wood' },
  { name: 'Laminate', href: '/flooring/laminate' },
]

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about', children: aboutDropdownItems },
  { name: 'Services', href: '/services', children: servicesDropdownItems },
  { name: 'Flooring', href: '/flooring', children: flooringDropdownItems },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [flooringDropdownOpen, setFlooringDropdownOpen] = useState(false)
  const aboutDropdownRef = useRef<HTMLDivElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const flooringDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(target)) {
        setAboutDropdownOpen(false)
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false)
      }
      if (flooringDropdownRef.current && !flooringDropdownRef.current.contains(target)) {
        setFlooringDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary shadow-lg z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logoSeniorFloors.png"
                alt="Senior Floors"
                width={90}
                height={90}
                className="h-14 md:h-20 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8 flex-1 justify-center">
            {navigation.map((item) =>
              'children' in item && item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  ref={
                    item.name === 'About'
                      ? aboutDropdownRef
                      : item.name === 'Services'
                        ? servicesDropdownRef
                        : item.name === 'Flooring'
                          ? flooringDropdownRef
                          : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.name === 'About') {
                        setAboutDropdownOpen(!aboutDropdownOpen)
                        setServicesDropdownOpen(false)
                        setFlooringDropdownOpen(false)
                      } else if (item.name === 'Services') {
                        setServicesDropdownOpen(!servicesDropdownOpen)
                        setAboutDropdownOpen(false)
                        setFlooringDropdownOpen(false)
                      } else if (item.name === 'Flooring') {
                        setFlooringDropdownOpen(!flooringDropdownOpen)
                        setAboutDropdownOpen(false)
                        setServicesDropdownOpen(false)
                      }
                    }}
                    className={cn(
                      'relative flex items-center gap-1 text-sm font-medium py-2 transition-all duration-200',
                      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-200 after:rounded-full",
                      (item.name === 'About' && aboutDropdownOpen) ||
                        (item.name === 'Services' && servicesDropdownOpen) ||
                        (item.name === 'Flooring' && flooringDropdownOpen)
                        ? 'text-white after:w-full'
                        : 'text-white/90 hover:text-white after:w-0 hover:after:w-full'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        (item.name === 'About' && aboutDropdownOpen) ||
                          (item.name === 'Services' && servicesDropdownOpen) ||
                          (item.name === 'Flooring' && flooringDropdownOpen)
                          ? 'rotate-180'
                          : ''
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-2 min-w-[200px] origin-top',
                      'transition-[opacity,transform] duration-500 ease-out',
                      (item.name === 'About' && aboutDropdownOpen) ||
                        (item.name === 'Services' && servicesDropdownOpen) ||
                        (item.name === 'Flooring' && flooringDropdownOpen)
                        ? 'opacity-100 visible translate-y-0 scale-100'
                        : 'opacity-0 invisible pointer-events-none -translate-y-2 scale-[0.97]'
                    )}
                  >
                    <div className="bg-white rounded-lg py-2 border border-gray-100 shadow-xl shadow-primary/20 border-t-2 border-t-secondary overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-medium text-text-dark hover:bg-primary/5 hover:text-primary border-l-2 border-l-transparent hover:border-l-secondary transition-all duration-150"
                          onClick={() => {
                            setAboutDropdownOpen(false)
                            setServicesDropdownOpen(false)
                            setFlooringDropdownOpen(false)
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 flex-shrink-0">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors border border-white/30 rounded-md hover:bg-white/10"
              title="Admin Panel"
            >
              <Lock className="h-4 w-4" />
              Admin
            </Link>
            <Link
              href="/free-estimate"
              className="px-4 py-2 bg-secondary text-text-dark font-semibold rounded-md hover:bg-secondary-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:+17207519813"
              className="px-4 py-2 bg-secondary text-text-dark font-semibold rounded-md hover:bg-secondary-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              Call Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={cn(
              "w-6 h-0.5 bg-white rounded transition-all",
              mobileMenuOpen && "rotate-45 translate-y-2"
            )} />
            <span className={cn(
              "w-6 h-0.5 bg-white rounded transition-all",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "w-6 h-0.5 bg-white rounded transition-all",
              mobileMenuOpen && "-rotate-45 -translate-y-2"
            )} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-400",
          mobileMenuOpen ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="py-4 space-y-1">
            {navigation.map((item) =>
              'children' in item && item.children ? (
                <div key={item.name} className="border-b border-white/10">
                  <div className="px-4 py-3 text-base font-medium text-white">
                    {item.name}
                  </div>
                  <div className="pl-4 pb-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md px-3 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 space-y-2 px-4">
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center text-white/90 border border-white/30 rounded-md hover:bg-white/10 transition-all text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className="h-4 w-4" />
                Admin
              </Link>
              <Link
                href="/free-estimate"
                className="block w-full px-4 py-3 text-center bg-secondary text-text-dark font-semibold rounded-md hover:bg-secondary-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Estimate
              </Link>
              <a
                href="tel:+17207519813"
                className="block w-full px-4 py-3 text-center bg-secondary text-text-dark font-semibold rounded-md hover:bg-secondary-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Call Now
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
