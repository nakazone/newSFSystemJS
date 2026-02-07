'use client'

import Link from 'next/link'

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg z-50 md:hidden flex justify-center gap-2">
      <Link
        href="/free-estimate"
        className="flex-1 px-4 py-2.5 bg-primary text-white font-semibold rounded-md text-center text-sm hover:bg-primary-600 transition-all shadow-md"
      >
        Get a Free Estimate
      </Link>
    </div>
  )
}
