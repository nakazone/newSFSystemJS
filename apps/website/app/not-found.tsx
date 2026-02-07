import Link from 'next/link'
import { CTA } from '@/components/ui/CTA'

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTA href="/" variant="primary">
            Go Home
          </CTA>
          <CTA href="/contact" variant="secondary">
            Contact Us
          </CTA>
        </div>
      </div>
    </div>
  )
}
