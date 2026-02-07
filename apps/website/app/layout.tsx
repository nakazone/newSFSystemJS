import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { Providers } from './providers'
import { generateWebSiteSchema, generateOrganizationSchema } from '@/lib/schema'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: 'Professional Flooring Installation & Services | [Company Name]',
    template: '%s | [Company Name]'
  },
  description: 'Expert flooring installation and services including hardwood, vinyl, tile, epoxy, and refinishing. Free estimates available. Serving [City] and surrounding areas.',
  keywords: ['flooring installation', 'hardwood flooring', 'vinyl flooring', 'tile installation', 'epoxy flooring', 'floor refinishing'],
  authors: [{ name: '[Company Name]' }],
  creator: '[Company Name]',
  publisher: '[Company Name]',
  icons: {
    icon: '/assets/logoSeniorFloors.png',
    apple: '/assets/logoSeniorFloors.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: '[Company Name]',
    title: 'Professional Flooring Installation & Services',
    description: 'Expert flooring installation and services. Free estimates available.',
    images: [
      {
        url: '/assets/logoSeniorFloors.png',
        width: 1200,
        height: 630,
        alt: '[Company Name] - Flooring Installation & Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Flooring Installation & Services',
    description: 'Expert flooring installation and services. Free estimates available.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const webSiteSchema = generateWebSiteSchema()
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="pt-20 md:pt-24">
        <Providers>
          <Header />
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>
          <Footer />
          <StickyMobileCTA />
        </Providers>
      </body>
    </html>
  )
}
