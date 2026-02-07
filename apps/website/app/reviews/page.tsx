import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { Star, ExternalLink } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Google Reviews',
  description: 'Read our Google reviews from real customers. See why homeowners choose Senior Floors for hardwood and flooring in Denver and the metro area.',
  keywords: ['Google reviews', 'flooring reviews', 'Senior Floors reviews', 'Denver flooring'],
})

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=google+reviews+senior+floors#lrd=0x2dd47a74824e3cc9:0xbcd70de3b929964c,1,,,,'

async function getGoogleReviews() {
  try {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/google-reviews`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json() as Promise<{
      name?: string
      rating?: number
      user_ratings_total?: number
      reviews?: Array<{
        author_name: string
        profile_photo_url?: string
        rating: number
        relative_time_description: string
        text: string
      }>
    }>
  } catch {
    return null
  }
}

export default async function ReviewsPage() {
  const data = await getGoogleReviews()
  const reviews = data?.reviews ?? []
  const rating = data?.rating
  const total = data?.user_ratings_total

  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24 bg-bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
                Google Reviews
              </h1>
              <p className="text-xl text-text-light max-w-3xl">
                See what our customers say about us on Google. Real reviews from real homeowners.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              {(rating != null || total != null) && (
                <div className="flex items-center gap-2">
                  {rating != null && (
                    <div className="flex items-center gap-1">
                      <Star className="h-6 w-6 fill-secondary text-secondary" aria-hidden />
                      <span className="text-2xl font-bold text-gray-900">{rating.toFixed(1)}</span>
                    </div>
                  )}
                  {total != null && (
                    <span className="text-text-light">
                      {total} {total === 1 ? 'review' : 'reviews'} on Google
                    </span>
                  )}
                </div>
              )}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
              >
                View all reviews on Google
                <ExternalLink className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {reviews.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-primary mb-8">Recent reviews from Google</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <article
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {review.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.profile_photo_url}
                          alt=""
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-lg">
                            {review.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{review.author_name}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'fill-secondary text-secondary' : 'text-gray-200'
                              }`}
                              aria-hidden
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">
                            {review.relative_time_description}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">&ldquo;{review.text}&rdquo;</p>
                  </article>
                ))}
              </div>
              <div className="mt-10 text-center">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Read more on Google
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12 max-w-xl mx-auto">
              <p className="text-lg text-text-light mb-6">
                We&apos;re proud of our reputation on Google. View our full reviews, rating, and
                leave your own experience.
              </p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
              >
                View our Google Reviews
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
