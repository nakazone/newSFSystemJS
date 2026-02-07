export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  image?: string
  '@id'?: string
  url?: string
  telephone: string
  priceRange?: string
  address: {
    '@type': string
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': string
    latitude: number
    longitude: number
  }
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
  review?: Array<{
    '@type': string
    author: {
      '@type': string
      name: string
    }
    datePublished: string
    reviewBody: string
    reviewRating: {
      '@type': string
      ratingValue: string
    }
  }>
}

export interface ServiceSchema {
  '@context': string
  '@type': string
  serviceType: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: {
    '@type': string
    name: string
  }
  availableChannel: {
    '@type': string
    serviceUrl: string
  }
}

export interface FAQSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export function generateLocalBusinessSchema(data: Partial<LocalBusinessSchema>): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name || '[Company Name]',
    telephone: data.telephone || '+1-XXX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.address?.addressLocality || '[City]',
      addressRegion: data.address?.addressRegion || '[State]',
      postalCode: data.address?.postalCode || '[ZIP]',
      addressCountry: data.address?.addressCountry || 'US',
      ...data.address,
    },
    ...data,
  }
}

export function generateServiceSchema(serviceType: string, city: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: '[Company Name]',
    },
    areaServed: {
      '@type': 'City',
      name: city,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/services/${serviceType.toLowerCase().replace(/\s+/g, '-')}`,
    },
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

/** WebSite schema for sitelinks and search. */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '[Company Name]',
    url: SITE_URL,
    description: 'Professional flooring installation and services including hardwood, vinyl, tile, epoxy, and refinishing. Free estimates.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/service-areas?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Organization schema for brand and sitelinks. */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '[Company Name]',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logoSeniorFloors.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-720-751-9813',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  }
}

/** BreadcrumbList for internal pages (helps search results show path). */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  }
}
