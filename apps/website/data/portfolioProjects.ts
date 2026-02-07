/**
 * Portfolio projects – gallery with filters by city, service type, and flooring type.
 * Flooring types match the Flooring menu: Site-Finished Wood, Pre-Finished Wood, Luxury Vinyl, Engineered Wood, Laminate.
 */

export interface PortfolioProject {
  id: string
  title: string
  description: string
  image: string
  city: string
  citySlug: string
  serviceType: string
  /** Flooring type – same values as the Flooring menu. */
  flooringType: string
  /** Wood/material species – e.g. Red Oak, White Oak, Hickory. */
  material?: string
}

/** Material options for filter (wood species, etc.). */
export const portfolioMaterialTypes = [
  'Red Oak',
  'White Oak',
  'Hickory',
  'Walnut',
  'Brazilian Cherry',
  'Maple',
  'Cherry',
  'Ash',
  'Other',
] as const

export const portfolioMaterialSlugToName: Record<string, string> = {
  'red-oak': 'Red Oak',
  'white-oak': 'White Oak',
  hickory: 'Hickory',
  walnut: 'Walnut',
  'brazilian-cherry': 'Brazilian Cherry',
  maple: 'Maple',
  cherry: 'Cherry',
  ash: 'Ash',
  other: 'Other',
}

export const portfolioMaterialOptions: { name: string; slug: string }[] = (
  portfolioMaterialTypes as unknown as string[]
).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
}))

const IMAGES = ['/assets/project1.jpg', '/assets/project2.jpg', '/assets/project3.jpg', '/assets/project4.jpg'] as const
const SERVICE_TYPES = [
  'Hardwood Refinishing',
  'Hardwood Installation',
  'Water Damage Services',
  'Extend Existing Hardwood',
  'Screen and Coat',
  'Self Leveling',
  'Stairs',
] as const

/** Flooring types – same as the Flooring menu (Header). */
export const portfolioFlooringTypes = [
  'Site-Finished Wood',
  'Pre-Finished Wood',
  'Luxury Vinyl',
  'Engineered Wood',
  'Laminate',
] as const

/** Flooring slug → name (matches /flooring/[slug]). Used for portfolio ↔ flooring page links. */
export const portfolioFlooringSlugToName: Record<string, string> = {
  'site-finished-wood': 'Site-Finished Wood',
  'pre-finished-wood': 'Pre-Finished Wood',
  'luxury-vinyl': 'Luxury Vinyl',
  'engineered-wood': 'Engineered Wood',
  laminate: 'Laminate',
}

/** Flooring options for filter (name + slug for URL). */
export const portfolioFlooringOptions: { name: string; slug: string }[] = (
  portfolioFlooringTypes as unknown as string[]
).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
}))

/** Cities that get one sample project each (slug and display name). */
const CITIES_ONE_PROJECT: { slug: string; name: string }[] = [
  { slug: 'arvada', name: 'Arvada' },
  { slug: 'larkspur', name: 'Larkspur' },
  { slug: 'boulder', name: 'Boulder' },
  { slug: 'broomfield', name: 'Broomfield' },
  { slug: 'castle-pines', name: 'Castle Pines' },
  { slug: 'cherry-hills', name: 'Cherry Hills' },
  { slug: 'columbine', name: 'Columbine' },
  { slug: 'commerce-city', name: 'Commerce City' },
  { slug: 'ponderosa-park', name: 'Ponderosa Park' },
  { slug: 'perry-park', name: 'Perry Park' },
  { slug: 'parker', name: 'Parker' },
  { slug: 'littleton', name: 'Littleton' },
  { slug: 'louisville', name: 'Louisville' },
  { slug: 'louviers', name: 'Louviers' },
  { slug: 'northglenn', name: 'Northglenn' },
  { slug: 'elbert', name: 'Elbert' },
  { slug: 'elizabeth', name: 'Elizabeth' },
  { slug: 'englewood', name: 'Englewood' },
  { slug: 'erie', name: 'Erie' },
  { slug: 'evergreen', name: 'Evergreen' },
  { slug: 'fountain', name: 'Fountain' },
  { slug: 'franktown', name: 'Franktown' },
  { slug: 'golden', name: 'Golden' },
  { slug: 'grendale', name: 'Grendale' },
  { slug: 'greenwood-village', name: 'Greenwood Village' },
  { slug: 'westminster', name: 'Westminster' },
  { slug: 'henderson', name: 'Henderson' },
  { slug: 'highlands-ranch', name: 'Highlands Ranch' },
  { slug: 'morrison', name: 'Morrison' },
  { slug: 'lafayette', name: 'Lafayette' },
  { slug: 'niwot', name: 'Niwot' },
  { slug: 'wheat-ridge', name: 'Wheat Ridge' },
  { slug: 'monument', name: 'Monument' },
  { slug: 'meridian', name: 'Meridian' },
  { slug: 'watkins', name: 'Watkins' },
  { slug: 'valmont', name: 'Valmont' },
  { slug: 'thornton', name: 'Thornton' },
  { slug: 'lone-tree', name: 'Lone Tree' },
  { slug: 'the-pinery', name: 'The Pinery' },
  { slug: 'superior', name: 'Superior' },
  { slug: 'sedalia', name: 'Sedalia' },
  { slug: 'roxborough-park', name: 'Roxborough Park' },
]

const existingProjects: PortfolioProject[] = [
  { id: '1', title: 'Full Hardwood Refinishing – Cherry Creek', description: 'Complete refinishing of existing oak floors in a single-family home.', image: IMAGES[0], city: 'Denver', citySlug: 'denver', serviceType: 'Hardwood Refinishing', flooringType: 'Site-Finished Wood', material: 'Red Oak' },
  { id: '2', title: 'New White Oak Installation – Greenwood Village', description: 'Open concept living room with wide-plank white oak installation.', image: IMAGES[1], city: 'Denver', citySlug: 'denver', serviceType: 'Hardwood Installation', flooringType: 'Pre-Finished Wood', material: 'White Oak' },
  { id: '3', title: 'Chevron Pattern – Morrison', description: 'Custom chevron pattern installation in a luxury residence.', image: IMAGES[2], city: 'Lakewood', citySlug: 'lakewood', serviceType: 'Hardwood Installation', flooringType: 'Site-Finished Wood', material: 'White Oak' },
  { id: '4', title: 'Stair Refinishing – Lakewood', description: 'Stair refinishing and handrail update for a Lakewood home.', image: IMAGES[3], city: 'Lakewood', citySlug: 'lakewood', serviceType: 'Stairs', flooringType: 'Pre-Finished Wood', material: 'Red Oak' },
  { id: '5', title: 'Water Damage Restoration – Denver', description: 'Restored hardwood floors after water damage in a Denver basement.', image: IMAGES[0], city: 'Denver', citySlug: 'denver', serviceType: 'Water Damage Services', flooringType: 'Site-Finished Wood', material: 'Red Oak' },
  { id: '6', title: 'Extended Hardwood – Aurora', description: 'Seamlessly extended existing red oak into new addition.', image: IMAGES[1], city: 'Aurora', citySlug: 'aurora', serviceType: 'Extend Existing Hardwood', flooringType: 'Pre-Finished Wood', material: 'Red Oak' },
  { id: '7', title: 'Screen and Coat – Denver', description: 'Light screen and new coat to refresh worn traffic areas.', image: IMAGES[2], city: 'Denver', citySlug: 'denver', serviceType: 'Screen and Coat', flooringType: 'Site-Finished Wood', material: 'Maple' },
  { id: '8', title: 'Walnut Installation – Aurora', description: 'Full main-level installation in rich American walnut.', image: IMAGES[3], city: 'Aurora', citySlug: 'aurora', serviceType: 'Hardwood Installation', flooringType: 'Engineered Wood', material: 'Walnut' },
  { id: '9', title: 'Hickory Floors – Lakewood', description: 'Durable hickory flooring throughout main living areas.', image: IMAGES[0], city: 'Lakewood', citySlug: 'lakewood', serviceType: 'Hardwood Installation', flooringType: 'Pre-Finished Wood', material: 'Hickory' },
  { id: '10', title: 'Stair Runner & Refinish – Denver', description: 'Custom stair refinishing with new balusters and rail.', image: IMAGES[1], city: 'Denver', citySlug: 'denver', serviceType: 'Stairs', flooringType: 'Site-Finished Wood', material: 'Cherry' },
  { id: '11', title: 'Self Leveling + LVP – Aurora', description: 'Subfloor leveling followed by luxury vinyl plank installation.', image: IMAGES[2], city: 'Aurora', citySlug: 'aurora', serviceType: 'Self Leveling', flooringType: 'Luxury Vinyl', material: 'Other' },
  { id: '12', title: 'Brazilian Cherry – Denver', description: 'Exotic Brazilian cherry in formal living and dining rooms.', image: IMAGES[3], city: 'Denver', citySlug: 'denver', serviceType: 'Hardwood Installation', flooringType: 'Engineered Wood', material: 'Brazilian Cherry' },
]

/** One sample project per city (for cities not already covered above). */
const onePerCityProjects: PortfolioProject[] = CITIES_ONE_PROJECT.map((c, i) => ({
  id: `city-${c.slug}`,
  title: `Flooring Project – ${c.name}`,
  description: `Professional flooring installation or refinishing in ${c.name}. Quality hardwood, vinyl, and repair services.`,
  image: IMAGES[i % IMAGES.length],
  city: c.name,
  citySlug: c.slug,
  serviceType: SERVICE_TYPES[i % SERVICE_TYPES.length],
  flooringType: portfolioFlooringTypes[i % portfolioFlooringTypes.length],
  material: portfolioMaterialTypes[i % portfolioMaterialTypes.length],
}))

export const portfolioProjects: PortfolioProject[] = [...existingProjects, ...onePerCityProjects]

/** Unique cities for filter dropdown (name + slug for linking). */
export const portfolioCityOptions: { name: string; slug: string }[] = (() => {
  const seen = new Set<string>()
  return portfolioProjects
    .filter((p) => {
      if (seen.has(p.citySlug)) return false
      seen.add(p.citySlug)
      return true
    })
    .map((p) => ({ name: p.city, slug: p.citySlug }))
    .sort((a, b) => a.name.localeCompare(b.name))
})()

export const portfolioServiceTypes = [
  'Hardwood Refinishing',
  'Hardwood Installation',
  'Water Damage Services',
  'Extend Existing Hardwood',
  'Screen and Coat',
  'Self Leveling',
  'Stairs',
] as const

/** Service name → slug (matches /services/[slug]). Used for portfolio ↔ service page links. */
export const portfolioServiceSlugToName: Record<string, string> = {
  'hardwood-refinishing': 'Hardwood Refinishing',
  'hardwood-installation': 'Hardwood Installation',
  'water-damage-services': 'Water Damage Services',
  'extend-existing-hardwood': 'Extend Existing Hardwood',
  'screen-and-coat': 'Screen and Coat',
  'self-leveling': 'Self Leveling',
  stairs: 'Stairs',
}

/** Unique service options for filter (name + slug for URL). */
export const portfolioServiceOptions: { name: string; slug: string }[] = (
  portfolioServiceTypes as unknown as string[]
).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
}))

