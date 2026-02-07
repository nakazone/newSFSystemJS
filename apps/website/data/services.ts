import { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'hardwood-flooring',
    name: 'Hardwood Flooring Installation',
    slug: 'hardwood-flooring',
    description: 'Professional hardwood flooring installation services. Transform your space with beautiful, durable hardwood floors.',
    shortDescription: 'Expert hardwood flooring installation for residential and commercial properties.',
    icon: 'Hardwood',
    keywords: ['hardwood flooring', 'hardwood installation', 'wood floors', 'hardwood floors'],
    benefits: [
      'Increases property value significantly',
      'Durable and long-lasting (50+ years)',
      'Easy to clean and maintain',
      'Timeless aesthetic appeal',
      'Improves indoor air quality',
      'Can be refinished multiple times',
    ],
    process: [
      {
        step: 1,
        title: 'Free Consultation & Measurement',
        description: 'We visit your property to assess the space, discuss your preferences, and provide accurate measurements.',
      },
      {
        step: 2,
        title: 'Material Selection & Quote',
        description: 'Choose from our wide selection of hardwood species, finishes, and grades. Receive a detailed quote.',
      },
      {
        step: 3,
        title: 'Preparation & Acclimation',
        description: 'We prepare the subfloor and allow the hardwood to acclimate to your home\'s environment.',
      },
      {
        step: 4,
        title: 'Professional Installation',
        description: 'Our certified installers install your hardwood floors using industry best practices.',
      },
      {
        step: 5,
        title: 'Finishing & Cleanup',
        description: 'We apply the finish, clean up thoroughly, and ensure everything meets our quality standards.',
      },
    ],
    faqs: [
      {
        question: 'How long does hardwood flooring installation take?',
        answer: 'Most hardwood flooring installations take 2-5 days depending on the size of the area and complexity of the project.',
      },
      {
        question: 'Can hardwood floors be installed over existing flooring?',
        answer: 'In some cases, yes. We can install hardwood over existing flooring if the subfloor is in good condition and level. We\'ll assess this during our free consultation.',
      },
      {
        question: 'What is the cost of hardwood flooring installation?',
        answer: 'Costs vary based on wood species, grade, and square footage. On average, expect $8-15 per square foot for materials and installation. Contact us for a free estimate.',
      },
      {
        question: 'Do hardwood floors require special maintenance?',
        answer: 'Hardwood floors are relatively easy to maintain. Regular sweeping, occasional mopping with hardwood-specific cleaners, and avoiding excessive moisture will keep them looking great for decades.',
      },
    ],
  },
  {
    id: 'vinyl-flooring',
    name: 'Vinyl / LVP / LVT Flooring',
    slug: 'vinyl-flooring',
    description: 'Modern luxury vinyl plank (LVP) and luxury vinyl tile (LVT) installation. Waterproof, durable, and beautiful flooring solutions.',
    shortDescription: 'Premium vinyl flooring installation with waterproof and scratch-resistant options.',
    icon: 'Vinyl',
    keywords: ['vinyl flooring', 'LVP', 'LVT', 'luxury vinyl', 'waterproof flooring'],
    benefits: [
      '100% waterproof - perfect for kitchens and bathrooms',
      'Scratch and stain resistant',
      'Affordable luxury look',
      'Easy installation process',
      'Low maintenance requirements',
      'Comfortable underfoot',
    ],
    process: [
      {
        step: 1,
        title: 'Design Consultation',
        description: 'Explore our extensive collection of LVP/LVT styles and choose the perfect look for your space.',
      },
      {
        step: 2,
        title: 'Site Preparation',
        description: 'We ensure your subfloor is clean, level, and ready for installation.',
      },
      {
        step: 3,
        title: 'Precision Installation',
        description: 'Our team installs your vinyl flooring with attention to detail and proper expansion gaps.',
      },
      {
        step: 4,
        title: 'Final Inspection',
        description: 'We conduct a thorough quality check and clean up the work area.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between LVP and LVT?',
        answer: 'LVP (Luxury Vinyl Plank) mimics hardwood planks, while LVT (Luxury Vinyl Tile) mimics ceramic or stone tiles. Both offer the same durability and waterproof benefits.',
      },
      {
        question: 'Can vinyl flooring be installed in bathrooms?',
        answer: 'Yes! Vinyl flooring is 100% waterproof and perfect for bathrooms, kitchens, and any high-moisture areas.',
      },
      {
        question: 'How long does vinyl flooring last?',
        answer: 'Quality LVP/LVT flooring can last 15-25 years with proper care and maintenance.',
      },
      {
        question: 'Is vinyl flooring easy to clean?',
        answer: 'Yes, vinyl flooring is one of the easiest flooring types to maintain. Regular sweeping and occasional mopping with a mild cleaner is all that\'s needed.',
      },
    ],
  },
  {
    id: 'tile-flooring',
    name: 'Tile Flooring',
    slug: 'tile-flooring',
    description: 'Professional tile installation for ceramic, porcelain, and natural stone. Expert craftsmanship for lasting beauty.',
    shortDescription: 'Expert tile installation services for ceramic, porcelain, and natural stone.',
    icon: 'Tile',
    keywords: ['tile installation', 'ceramic tile', 'porcelain tile', 'stone tile', 'bathroom tile'],
    benefits: [
      'Extremely durable and long-lasting',
      'Water and moisture resistant',
      'Easy to clean and sanitize',
      'Wide variety of styles and colors',
      'Increases home value',
      'Hypoallergenic and hygienic',
    ],
    process: [
      {
        step: 1,
        title: 'Design & Selection',
        description: 'Choose from our extensive tile collection and work with our designers to create your perfect look.',
      },
      {
        step: 2,
        title: 'Subfloor Preparation',
        description: 'We ensure your subfloor is properly prepared, leveled, and waterproofed if needed.',
      },
      {
        step: 3,
        title: 'Layout & Cutting',
        description: 'We create a precise layout plan and make custom cuts for perfect fit around fixtures.',
      },
      {
        step: 4,
        title: 'Installation & Grouting',
        description: 'Our skilled installers lay tiles with precision and apply grout for a professional finish.',
      },
      {
        step: 5,
        title: 'Sealing & Cleanup',
        description: 'We seal natural stone tiles if needed and thoroughly clean the finished floor.',
      },
    ],
    faqs: [
      {
        question: 'What types of tile do you install?',
        answer: 'We install ceramic, porcelain, natural stone (marble, granite, travertine), glass, and mosaic tiles.',
      },
      {
        question: 'How long does tile installation take?',
        answer: 'Tile installation typically takes 2-4 days depending on the size of the area and complexity of the design.',
      },
      {
        question: 'Can tile be installed over existing flooring?',
        answer: 'Sometimes, but it depends on the existing flooring type and condition. We\'ll assess this during our free consultation.',
      },
      {
        question: 'Do tile floors require special maintenance?',
        answer: 'Tile floors are low maintenance. Regular sweeping and mopping with tile-specific cleaners will keep them looking great. Natural stone may require periodic sealing.',
      },
    ],
  },
  {
    id: 'epoxy-flooring',
    name: 'Epoxy Flooring',
    slug: 'epoxy-flooring',
    description: 'Durable epoxy floor coatings for garages, basements, and commercial spaces. Seamless, chemical-resistant, and long-lasting.',
    shortDescription: 'Professional epoxy floor coating services for garages and commercial spaces.',
    icon: 'Epoxy',
    keywords: ['epoxy flooring', 'epoxy coating', 'garage floor', 'epoxy floor', 'commercial epoxy'],
    benefits: [
      'Extremely durable and impact-resistant',
      'Chemical and stain resistant',
      'Seamless, easy-to-clean surface',
      'Customizable colors and designs',
      'Long-lasting (15-20+ years)',
      'Perfect for high-traffic areas',
    ],
    process: [
      {
        step: 1,
        title: 'Surface Assessment',
        description: 'We evaluate your concrete surface and identify any repairs or preparation needed.',
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'We grind, clean, and repair the concrete to ensure optimal adhesion.',
      },
      {
        step: 3,
        title: 'Primer Application',
        description: 'We apply a primer coat to ensure proper bonding of the epoxy.',
      },
      {
        step: 4,
        title: 'Epoxy Application',
        description: 'We apply the epoxy coating in multiple layers, including any decorative flakes or designs.',
      },
      {
        step: 5,
        title: 'Top Coat & Curing',
        description: 'We apply a protective top coat and allow proper curing time.',
      },
    ],
    faqs: [
      {
        question: 'How long does epoxy flooring last?',
        answer: 'Quality epoxy flooring can last 15-20 years or more with proper maintenance and care.',
      },
      {
        question: 'Can epoxy be applied over existing paint?',
        answer: 'Existing paint must be removed for proper adhesion. We handle all surface preparation as part of our service.',
      },
      {
        question: 'How long does epoxy installation take?',
        answer: 'Most epoxy installations take 2-3 days including preparation, application, and curing time.',
      },
      {
        question: 'Is epoxy flooring slippery when wet?',
        answer: 'We can add anti-slip additives to the top coat to ensure safety, especially in garage applications.',
      },
    ],
  },
  {
    id: 'floor-refinishing',
    name: 'Floor Refinishing',
    slug: 'floor-refinishing',
    description: 'Professional hardwood floor refinishing and restoration services. Bring your old floors back to life.',
    shortDescription: 'Expert hardwood floor refinishing and restoration services.',
    icon: 'Refinishing',
    keywords: ['floor refinishing', 'hardwood refinishing', 'floor sanding', 'floor restoration'],
    benefits: [
      'Restores original beauty of hardwood',
      'More cost-effective than replacement',
      'Removes scratches and stains',
      'Extends floor life significantly',
      'Increases home value',
      'Eco-friendly option',
    ],
    process: [
      {
        step: 1,
        title: 'Inspection & Assessment',
        description: 'We inspect your floors to determine the extent of refinishing needed.',
      },
      {
        step: 2,
        title: 'Furniture Removal & Preparation',
        description: 'We move furniture and prepare the area, protecting adjacent spaces.',
      },
      {
        step: 3,
        title: 'Sanding & Repair',
        description: 'We sand the floors to remove old finish and repair any damaged areas.',
      },
      {
        step: 4,
        title: 'Staining (Optional)',
        description: 'If desired, we apply stain to achieve your preferred color.',
      },
      {
        step: 5,
        title: 'Finishing & Buffing',
        description: 'We apply multiple coats of finish and buff to a beautiful shine.',
      },
    ],
    faqs: [
      {
        question: 'How often should hardwood floors be refinished?',
        answer: 'Hardwood floors typically need refinishing every 7-10 years, depending on wear and traffic.',
      },
      {
        question: 'Can all hardwood floors be refinished?',
        answer: 'Most solid hardwood floors can be refinished multiple times. Engineered hardwood can usually be refinished 1-2 times depending on the wear layer thickness.',
      },
      {
        question: 'How long does refinishing take?',
        answer: 'Most refinishing projects take 3-5 days including drying time between coats.',
      },
      {
        question: 'Do I need to leave my home during refinishing?',
        answer: 'You can usually stay in your home, but you\'ll need to avoid the work area. We\'ll discuss the best approach during consultation.',
      },
    ],
  },
  {
    id: 'flooring-repairs',
    name: 'Flooring Repairs',
    slug: 'flooring-repairs',
    description: 'Expert flooring repair services. Fix damaged boards, squeaks, gaps, and other flooring issues.',
    shortDescription: 'Professional flooring repair services for all types of floors.',
    icon: 'Repairs',
    keywords: ['flooring repairs', 'floor repair', 'squeaky floors', 'floor replacement', 'damaged flooring'],
    benefits: [
      'Quick and cost-effective solutions',
      'Prevents further damage',
      'Restores safety and appearance',
      'Extends floor life',
      'Same-day service available',
      'Expert craftsmanship',
    ],
    process: [
      {
        step: 1,
        title: 'Problem Assessment',
        description: 'We identify the issue and determine the best repair approach.',
      },
      {
        step: 2,
        title: 'Repair Plan & Quote',
        description: 'We provide a detailed repair plan and transparent pricing.',
      },
      {
        step: 3,
        title: 'Professional Repair',
        description: 'Our skilled technicians perform the repair using proper techniques.',
      },
      {
        step: 4,
        title: 'Quality Check',
        description: 'We ensure the repair meets our standards and matches surrounding flooring.',
      },
    ],
    faqs: [
      {
        question: 'What types of flooring repairs do you handle?',
        answer: 'We repair hardwood, vinyl, tile, laminate, and other flooring types. Common repairs include damaged boards, squeaks, gaps, water damage, and loose tiles.',
      },
      {
        question: 'How quickly can repairs be completed?',
        answer: 'Many repairs can be completed the same day. More extensive repairs may take 1-2 days.',
      },
      {
        question: 'Will the repair match my existing floor?',
        answer: 'We do our best to match existing flooring. For older floors, we may need to source matching materials or refinish the area to blend seamlessly.',
      },
      {
        question: 'Do you offer warranties on repairs?',
        answer: 'Yes, all our repairs come with a warranty. The specific terms depend on the type of repair.',
      },
    ],
  },
  {
    id: 'commercial-flooring',
    name: 'Commercial Flooring',
    slug: 'commercial-flooring',
    description: 'Commercial flooring solutions for offices, retail, healthcare, and industrial spaces. Durable, compliant, and professional.',
    shortDescription: 'Commercial flooring installation for businesses and commercial properties.',
    icon: 'Commercial',
    keywords: ['commercial flooring', 'office flooring', 'retail flooring', 'commercial installation'],
    benefits: [
      'Meets commercial building codes',
      'Designed for high traffic',
      'Low maintenance requirements',
      'Professional appearance',
      'Durable and long-lasting',
      'Minimal business disruption',
    ],
    process: [
      {
        step: 1,
        title: 'Commercial Assessment',
        description: 'We assess your space, traffic patterns, and compliance requirements.',
      },
      {
        step: 2,
        title: 'Product Selection',
        description: 'We recommend flooring solutions that meet your needs and budget.',
      },
      {
        step: 3,
        title: 'Project Planning',
        description: 'We create a detailed installation plan to minimize business disruption.',
      },
      {
        step: 4,
        title: 'Professional Installation',
        description: 'Our commercial installation team works efficiently and professionally.',
      },
      {
        step: 5,
        title: 'Final Inspection & Documentation',
        description: 'We conduct quality checks and provide all necessary documentation.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with businesses after hours?',
        answer: 'Yes, we can schedule installations during evenings or weekends to minimize disruption to your business operations.',
      },
      {
        question: 'What flooring types work best for commercial spaces?',
        answer: 'LVP, commercial carpet, luxury vinyl tile, and polished concrete are popular choices for commercial spaces due to durability and maintenance requirements.',
      },
      {
        question: 'Do you handle large commercial projects?',
        answer: 'Yes, we have experience with projects of all sizes, from small offices to large retail spaces.',
      },
      {
        question: 'What certifications do you have?',
        answer: 'Our team is certified and insured. We meet all local commercial building codes and requirements.',
      },
    ],
  },
  {
    id: 'residential-flooring',
    name: 'Residential Flooring',
    slug: 'residential-flooring',
    description: 'Complete residential flooring solutions. From single rooms to entire homes, we transform your living spaces.',
    shortDescription: 'Residential flooring installation for homes and apartments.',
    icon: 'Residential',
    keywords: ['residential flooring', 'home flooring', 'house flooring', 'residential installation'],
    benefits: [
      'Increases home value',
      'Wide selection of styles',
      'Expert installation',
      'Warranty protection',
      'Personalized service',
      'Free estimates',
    ],
    process: [
      {
        step: 1,
        title: 'Home Consultation',
        description: 'We visit your home to understand your style preferences and lifestyle needs.',
      },
      {
        step: 2,
        title: 'Design & Selection',
        description: 'Choose from our extensive selection of residential flooring options.',
      },
      {
        step: 3,
        title: 'Measurement & Planning',
        description: 'We take precise measurements and create an installation timeline.',
      },
      {
        step: 4,
        title: 'Installation',
        description: 'Our residential specialists install your flooring with care and attention to detail.',
      },
      {
        step: 5,
        title: 'Final Walkthrough',
        description: 'We walk through the completed project with you to ensure everything meets your expectations.',
      },
    ],
    faqs: [
      {
        question: 'How long does residential flooring installation take?',
        answer: 'Most residential projects take 1-3 days depending on the size and type of flooring.',
      },
      {
        question: 'Do you move furniture?',
        answer: 'Yes, we can move furniture as part of our service. We\'ll discuss this during your consultation.',
      },
      {
        question: 'Can I stay in my home during installation?',
        answer: 'Yes, you can usually stay in your home. We\'ll work around your schedule and minimize disruption.',
      },
      {
        question: 'Do you offer financing options?',
        answer: 'Yes, we offer flexible financing options to make your flooring project affordable. Ask us for details.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug)
}
