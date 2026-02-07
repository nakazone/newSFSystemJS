import { NextResponse } from 'next/server'

/**
 * Fetches place details (including reviews) from Google Places API (Legacy).
 * Requires env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID (ChIJ... format from Google Maps).
 * Place ID: find in Google Maps URL or via Google Cloud Console.
 */

const GOOGLE_PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

export type GoogleReview = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time?: number
}

export type GoogleReviewsResponse = {
  name?: string
  rating?: number
  user_ratings_total?: number
  reviews?: GoogleReview[]
}

type PlaceDetailsResult = {
  name?: string
  rating?: number
  user_ratings_total?: number
  reviews?: Array<{
    author_name: string
    profile_photo_url?: string
    rating: number
    relative_time_description: string
    text: string
    time?: number
  }>
}

type PlaceDetailsApiResponse = {
  result?: PlaceDetailsResult
  status: string
  error_message?: string
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json<GoogleReviewsResponse>(
      { reviews: [] },
      { status: 200 }
    )
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,rating,user_ratings_total,reviews',
    key: apiKey,
  })

  try {
    const res = await fetch(`${GOOGLE_PLACE_DETAILS_URL}?${params.toString()}`, {
      next: { revalidate: 3600 }, // cache 1 hour
    })
    const data: PlaceDetailsApiResponse = await res.json()

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json<GoogleReviewsResponse>(
        { reviews: [] },
        { status: 200 }
      )
    }

    const out: GoogleReviewsResponse = {
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews ?? [],
    }
    return NextResponse.json(out)
  } catch {
    return NextResponse.json<GoogleReviewsResponse>(
      { reviews: [] },
      { status: 200 }
    )
  }
}
