import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { cityCoordinates } from '../data/cityCoordinates'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('Created admin user:', admin.email)

  // Seed services – all pages linked from the Services menu
  const services = [
    {
      slug: 'hardwood-refinishing',
      name: 'Hardwood Refinishing',
      shortDescription: 'Restore and refresh your existing hardwood floors to like-new beauty.',
      description: `At Senior Floors, our hardwood floor refinishing service is carefully designed to transform worn, scratched, or faded floors into stunning surfaces that look brand new again. Whether for residential, commercial, or historic spaces, we provide complete restoration solutions that preserve the quality, durability, and unique character of each wood floor.

Why Refinish Your Hardwood Floors?

Even high-quality solid hardwood floors can lose their shine and protection over time due to natural wear, heavy foot traffic, scratches, and aging finishes. Refinishing is the ideal solution to:

Restore the original beauty of your floors, bringing them back to life

Remove deep scratches, stains, and worn finishes without the need for full replacement

Update the color or style by choosing a new stain that matches your décor

Increase property value, enhancing aesthetics and overall curb appeal

Improve safety and comfort by eliminating splinters, uneven areas, and surface damage

Refinishing is far more cost-effective than installing new floors and delivers long-lasting results while preserving the integrity of the wood for many years.

Our Professional Refinishing Process

Here's how we deliver outstanding results with precision and care: the steps below guide every project from evaluation to final inspection.

Finishing Options Available

We offer multiple finish options to suit different styles and performance needs:

· Water-Based Finish — Faster drying time; low odor and low VOCs; preserves a lighter, more natural wood appearance.

· Oil-Based Finish — Provides a warmer, richer tone; ideal for high-traffic areas and a traditional hardwood look.`,
      benefits: JSON.stringify([
        'Cost-Effective Alternative to Replacement – refinishing costs significantly less than installing new flooring',
        'Extended Floor Lifespan – new protective layers help your floors last for years',
        'Easier Maintenance – smooth, sealed surfaces resist dirt and are easier to clean',
        'Improved Indoor Air Quality – removing old buildup and applying fresh finishes enhances the home environment',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Personalized Evaluation', description: 'We begin with a detailed inspection of your floor, assessing its condition, level of wear, wood type, and specific needs. This allows us to recommend the best refinishing approach and ideal finish for your space.' },
        { step: 2, title: 'Preparation & Protection', description: 'Before work begins, we carefully protect your home. Cabinets, baseboards, and doorways are sealed with plastic and protective materials to keep your space clean and minimize disruption.' },
        { step: 3, title: 'Dust-Controlled Sanding', description: 'We use state-of-the-art sanding equipment with advanced dust containment systems that capture up to 90% of airborne dust, ensuring a cleaner and healthier environment.' },
        { step: 4, title: 'Repairs & Surface Leveling', description: 'Cracks, gaps, nail holes, and imperfections are filled and repaired, followed by fine sanding to create a smooth, even surface ready for finishing.' },
        { step: 5, title: 'Stain & Finish Application', description: 'Choose from a wide range of stain colors and sheen levels, or keep the natural look of the wood. We apply stain (if desired) and up to three coats of a high-performance, durable finish to protect your floors from future wear.' },
        { step: 6, title: 'Final Inspection', description: 'A thorough final walkthrough ensures the finished floors meet our quality standards and exceed your expectations.' },
      ]),
      faqs: JSON.stringify([
        { question: 'How long does refinishing take?', answer: 'Typically 2–4 days depending on square footage and number of coats. We’ll give you a clear timeline during your free evaluation.' },
        { question: 'Can all hardwood be refinished?', answer: 'Solid hardwood can be refinished multiple times. Engineered wood depends on veneer thickness — we assess each floor during the evaluation.' },
        { question: 'What’s the difference between water-based and oil-based finish?', answer: 'Water-based dries faster, has low odor and low VOCs, and preserves a lighter natural wood look. Oil-based provides a warmer, richer tone and is ideal for high-traffic areas and a traditional hardwood appearance.' },
      ]),
      metaTitle: 'Professional Hardwood Floor Refinishing | Senior Floors',
      published: true,
      featured: true,
    },
    {
      slug: 'hardwood-installation',
      name: 'Hardwood Installation',
      shortDescription: 'New hardwood flooring installed with precision and care.',
      description: 'From site-finished to pre-finished, we install hardwood flooring for homes and businesses. We handle subfloor prep, acclimation, layout, and finishing details so your new floors look flawless and last for decades.',
      benefits: JSON.stringify([
        'Increases property value significantly',
        'Durable and long-lasting (50+ years with care)',
        'Wide range of species and finishes',
        'Professional installation ensures warranty validity',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Free Estimate', description: 'We measure the space and discuss species, width, and finish.' },
        { step: 2, title: 'Acclimation', description: 'Wood is delivered and acclimated to your home’s humidity.' },
        { step: 3, title: 'Installation', description: 'Expert installation with proper fastening and expansion gaps.' },
        { step: 4, title: 'Finish (if site-finished)', description: 'Sanding and finishing on-site for a seamless look.' },
      ]),
      faqs: JSON.stringify([
        { question: 'How long does installation take?', answer: 'Most installations take 2–5 days depending on size and finish type.' },
        { question: 'What is the cost?', answer: 'Costs vary by wood species, square footage, and finish. We provide free estimates.' },
      ]),
      published: true,
      featured: true,
    },
    {
      slug: 'water-damage-services',
      name: 'Water Damage Services',
      shortDescription: 'Repair and restore floors affected by water or moisture.',
      description: 'Water and moisture can warp, cup, or stain hardwood and other floors. We assess damage, dry properly when needed, and repair or replace affected areas so your floors are safe and beautiful again.',
      benefits: JSON.stringify([
        'Quick assessment and mitigation',
        'Repair when possible to save cost',
        'Matching repairs for a seamless look',
        'Prevention advice to avoid future damage',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Assessment', description: 'We inspect the extent of water damage and subfloor condition.' },
        { step: 2, title: 'Drying (if needed)', description: 'Proper drying before repair to prevent mold and further damage.' },
        { step: 3, title: 'Repair or Replace', description: 'We repair salvageable boards or replace and blend with existing flooring.' },
        { step: 4, title: 'Finish', description: 'Sanding and refinishing to match the rest of the floor.' },
      ]),
      faqs: JSON.stringify([
        { question: 'Can water-damaged hardwood always be repaired?', answer: 'It depends on severity. Minor cupping can often be sanded; severe damage may require replacement of affected boards.' },
        { question: 'How soon can you start?', answer: 'We prioritize water-damage calls and can often assess within 24–48 hours.' },
      ]),
      published: true,
      featured: false,
    },
    {
      slug: 'extend-existing-hardwood',
      name: 'Extend Existing Hardwood',
      shortDescription: 'Seamlessly extend your current hardwood into new areas.',
      description: 'Adding a room or opening up space? We extend your existing hardwood so the new area matches species, color, and finish. We source or mill to match and blend the transition so it looks like one continuous floor.',
      benefits: JSON.stringify([
        'Seamless match to existing floors',
        'No need to refinish the whole house',
        'Adds value and continuity',
        'Expert color and species matching',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Match', description: 'We identify your current species, width, and finish to source or mill matching material.' },
        { step: 2, title: 'Preparation', description: 'Subfloor is prepared and transitions are planned.' },
        { step: 3, title: 'Installation', description: 'New flooring is installed to align with existing direction and height.' },
        { step: 4, title: 'Blend', description: 'Sanding and finishing so the new section matches the existing floor.' },
      ]),
      faqs: JSON.stringify([
        { question: 'Will the new wood match exactly?', answer: 'We do our best to match species, width, and finish. Some variation is natural in wood.' },
        { question: 'Do you need to refinish the whole floor?', answer: 'Often we can sand and finish only the new area and blend at the transition.' },
      ]),
      published: true,
      featured: false,
    },
    {
      slug: 'screen-and-coat',
      name: 'Screen and Coat',
      shortDescription: 'Light refresh with screening and a new top coat for lasting shine.',
      description: 'When your hardwood is in good shape but the finish is worn in high-traffic areas, a screen and coat can refresh the look without a full refinish. We lightly abrade the surface and apply a new coat of finish for renewed protection and shine.',
      benefits: JSON.stringify([
        'Faster and more affordable than full refinish',
        'Renews shine and protection',
        'Minimal dust and disruption',
        'Ideal for regularly maintained floors',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Inspection', description: 'We confirm the finish is intact enough for screen and coat (no bare wood).' },
        { step: 2, title: 'Screen', description: 'Light buffing/screening to dull the surface for new coat adhesion.' },
        { step: 3, title: 'Clean', description: 'Thorough cleaning to remove dust before applying finish.' },
        { step: 4, title: 'Coat', description: 'Application of one or two coats of quality finish.' },
      ]),
      faqs: JSON.stringify([
        { question: 'How often can I do a screen and coat?', answer: 'Typically every 5–10 years if the floor is well maintained; full refinish is needed when the finish is worn through.' },
        { question: 'Does it work on all finishes?', answer: 'Best results when we use a compatible finish (e.g., same type as existing). We can advise.' },
      ]),
      published: true,
      featured: false,
    },
    {
      slug: 'self-leveling',
      name: 'Self Leveling',
      shortDescription: 'Level subfloors for a perfect base before your new flooring.',
      description: 'Uneven subfloors cause problems for hardwood, tile, and vinyl. We apply self-leveling underlayment to create a flat, smooth surface so your new flooring installs correctly and lasts. Common before LVP, tile, and hardwood installations.',
      benefits: JSON.stringify([
        'Flat surface for a professional install',
        'Prevents telegraphing and premature wear',
        'Suitable for many flooring types',
        'Fast cure time in many cases',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Assessment', description: 'We check subfloor condition and identify low spots and peaks.' },
        { step: 2, title: 'Preparation', description: 'Cleaning, priming, and containment as needed.' },
        { step: 3, title: 'Pour', description: 'Self-leveling compound is mixed and poured; it flows to level.' },
        { step: 4, title: 'Cure', description: 'We allow proper cure time before installing your new flooring.' },
      ]),
      faqs: JSON.stringify([
        { question: 'How long before flooring can be installed?', answer: 'Usually 24–72 hours depending on product and thickness; we’ll specify for your job.' },
        { question: 'Can it be used over wood subfloors?', answer: 'Yes, with proper priming and sometimes reinforcement. We assess each case.' },
      ]),
      published: true,
      featured: false,
    },
    {
      slug: 'stairs',
      name: 'Stairs',
      shortDescription: 'Stair refinishing, installation, and custom stair work.',
      description: 'Stairs get heavy use and need to look great and stand up to traffic. We refinish existing stair treads and risers, install new hardwood treads and risers, and handle custom work like newel posts and railings so your staircase matches your floors.',
      benefits: JSON.stringify([
        'Matching treads and risers to your floors',
        'Refinishing or new construction',
        'Custom caps, nosings, and railings',
        'Safe, code-compliant results',
      ]),
      process: JSON.stringify([
        { step: 1, title: 'Measure & Quote', description: 'We measure treads, risers, and any rail components and provide a detailed quote.' },
        { step: 2, title: 'Preparation', description: 'Carpet or old finish is removed; treads and risers are prepped.' },
        { step: 3, title: 'Install or Refinish', description: 'New treads/risers are installed or existing ones are refinished.' },
        { step: 4, title: 'Finish & Details', description: 'Stain and finish are applied; railings and trim are completed as needed.' },
      ]),
      faqs: JSON.stringify([
        { question: 'Can you match my existing stair finish?', answer: 'Yes. We match species and finish to your current stairs or main floor.' },
        { question: 'Do you do railings too?', answer: 'We can refinish or replace railings and newel posts; complex custom rail work can be coordinated with specialists.' },
      ]),
      published: true,
      featured: false,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }

  console.log('Seeded services')

  // Seed cities - Colorado service areas
  const cities = [
    { slug: 'arvada', name: 'Arvada', state: 'CO', zipCode: '80002', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'larkspur', name: 'Larkspur', state: 'CO', zipCode: '80118', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'boulder', name: 'Boulder', state: 'CO', zipCode: '80301', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'aurora', name: 'Aurora', state: 'CO', zipCode: '80012', neighborhoods: JSON.stringify(['Aurora Hills', 'Buckley']), published: true },
    { slug: 'broomfield', name: 'Broomfield', state: 'CO', zipCode: '80020', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'castle-pines', name: 'Castle Pines', state: 'CO', zipCode: '80108', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'cherry-hills', name: 'Cherry Hills', state: 'CO', zipCode: '80113', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'columbine', name: 'Columbine', state: 'CO', zipCode: '80123', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'commerce-city', name: 'Commerce City', state: 'CO', zipCode: '80022', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'ponderosa-park', name: 'Ponderosa Park', state: 'CO', zipCode: '80129', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'perry-park', name: 'Perry Park', state: 'CO', zipCode: '80118', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'parker', name: 'Parker', state: 'CO', zipCode: '80134', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'littleton', name: 'Littleton', state: 'CO', zipCode: '80120', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'louisville', name: 'Louisville', state: 'CO', zipCode: '80027', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'louviers', name: 'Louviers', state: 'CO', zipCode: '80131', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'northglenn', name: 'Northglenn', state: 'CO', zipCode: '80233', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'denver', name: 'Denver', state: 'CO', zipCode: '80202', neighborhoods: JSON.stringify(['Downtown Denver', 'Highlands', 'Cherry Creek']), published: true },
    { slug: 'elbert', name: 'Elbert', state: 'CO', zipCode: '80106', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'elizabeth', name: 'Elizabeth', state: 'CO', zipCode: '80107', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'englewood', name: 'Englewood', state: 'CO', zipCode: '80110', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'erie', name: 'Erie', state: 'CO', zipCode: '80516', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'evergreen', name: 'Evergreen', state: 'CO', zipCode: '80439', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'fountain', name: 'Fountain', state: 'CO', zipCode: '80817', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'franktown', name: 'Franktown', state: 'CO', zipCode: '80116', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'golden', name: 'Golden', state: 'CO', zipCode: '80401', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'grendale', name: 'Grendale', state: 'CO', zipCode: null, neighborhoods: JSON.stringify([]), published: true },
    { slug: 'greenwood-village', name: 'Greenwood Village', state: 'CO', zipCode: '80111', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'westminster', name: 'Westminster', state: 'CO', zipCode: '80030', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'henderson', name: 'Henderson', state: 'CO', zipCode: '80640', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'highlands-ranch', name: 'Highlands Ranch', state: 'CO', zipCode: '80126', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'morrison', name: 'Morrison', state: 'CO', zipCode: '80465', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'lafayette', name: 'Lafayette', state: 'CO', zipCode: '80026', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'lakewood', name: 'Lakewood', state: 'CO', zipCode: '80226', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'niwot', name: 'Niwot', state: 'CO', zipCode: '80544', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'wheat-ridge', name: 'Wheat Ridge', state: 'CO', zipCode: '80033', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'monument', name: 'Monument', state: 'CO', zipCode: '80132', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'meridian', name: 'Meridian', state: 'CO', zipCode: null, neighborhoods: JSON.stringify([]), published: true },
    { slug: 'watkins', name: 'Watkins', state: 'CO', zipCode: '80137', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'valmont', name: 'Valmont', state: 'CO', zipCode: '80544', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'thornton', name: 'Thornton', state: 'CO', zipCode: '80229', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'lone-tree', name: 'Lone Tree', state: 'CO', zipCode: '80124', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'the-pinery', name: 'The Pinery', state: 'CO', zipCode: '80134', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'superior', name: 'Superior', state: 'CO', zipCode: '80027', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'sedalia', name: 'Sedalia', state: 'CO', zipCode: '80135', neighborhoods: JSON.stringify([]), published: true },
    { slug: 'roxborough-park', name: 'Roxborough Park', state: 'CO', zipCode: '80125', neighborhoods: JSON.stringify([]), published: true },
  ]

  for (const city of cities) {
    const coords = cityCoordinates[city.slug]
    const latitude = coords ? coords[0] : null
    const longitude = coords ? coords[1] : null
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {
        name: city.name,
        state: city.state,
        zipCode: city.zipCode,
        neighborhoods: city.neighborhoods,
        published: city.published,
        latitude,
        longitude,
      },
      create: { ...city, latitude, longitude },
    })
  }

  console.log('Seeded cities:', cities.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
