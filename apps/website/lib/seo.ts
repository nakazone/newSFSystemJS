import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

/** Default OG image path (absolute URL for social sharing). Use 1200x630 for best results. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logoSeniorFloors.png`

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  city?: string
  service?: string
  /** Canonical URL path (e.g. /services/hardwood-refinishing). Will be resolved with metadataBase. */
  canonical?: string
  /** Absolute URL or path for Open Graph / Twitter image. Defaults to site logo. */
  image?: string
  noindex?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, keywords = [], city, service, canonical, image, noindex = false } = config

  const fullTitle = city
    ? `${title} in ${city} | [Company Name]`
    : service
      ? `${title} | ${service} Installation Services`
      : `${title} | [Company Name]`

  const fullDescription = city
    ? `${description} Serving ${city} and surrounding areas. Free estimates available.`
    : description

  const fullKeywords = [
    ...keywords,
    city && `${service || 'flooring'} ${city}`,
    city && `${service || 'flooring'} installation ${city}`,
    city && `${service || 'flooring'} installer ${city}`,
    city && `${service || 'flooring'} near me`,
    'free estimate',
    'flooring contractor',
  ].filter(Boolean) as string[]

  const canonicalUrl = canonical ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`) : undefined
  const imageUrl = image ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`) : DEFAULT_OG_IMAGE

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords.join(', '),
    alternates: {
      canonical: canonical || undefined,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: '[Company Name]',
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
  }
}
