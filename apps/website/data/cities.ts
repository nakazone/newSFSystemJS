import { City } from '@/types'

export const cities: City[] = [
  {
    id: 'denver',
    name: 'Denver',
    slug: 'denver',
    state: 'CO',
    zipCode: '80202',
    neighborhoods: ['Downtown Denver', 'Highlands', 'Cherry Creek', 'Washington Park', 'LoDo'],
    coordinates: {
      lat: 39.7392,
      lng: -104.9903,
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    slug: 'aurora',
    state: 'CO',
    zipCode: '80012',
    neighborhoods: ['Aurora Hills', 'Buckley', 'Fitzsimons', 'Aurora Highlands'],
    coordinates: {
      lat: 39.7294,
      lng: -104.8319,
    },
  },
  {
    id: 'lakewood',
    name: 'Lakewood',
    slug: 'lakewood',
    state: 'CO',
    zipCode: '80226',
    neighborhoods: ['Belmar', 'Green Mountain', 'West Colfax', 'Bear Creek'],
    coordinates: {
      lat: 39.7047,
      lng: -105.0814,
    },
  },
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug)
}

export function getAllCitySlugs(): string[] {
  return cities.map(city => city.slug)
}
