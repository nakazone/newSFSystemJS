'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

const GALLERY_ITEMS = [
  {
    src: '/assets/project1.jpg',
    alt: 'Recent flooring work 1',
    description: 'Full hardwood refinishing – single-family home in Cherry Creek, Denver, CO',
  },
  {
    src: '/assets/project2.jpg',
    alt: 'Recent flooring work 2',
    description: 'New white oak installation – open concept living room in Greenwood Village (DTC)',
  },
  {
    src: '/assets/project3.jpg',
    alt: 'Recent flooring work 3',
    description: 'Chevron pattern installation – luxury home near Morrison',
  },
  {
    src: '/assets/project4.jpg',
    alt: 'Recent flooring work 4',
    description: 'Stair refinishing and handrail update – Lakewood residence',
  },
]

export function ContactGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? GALLERY_ITEMS.length - 1 : i - 1))
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === GALLERY_ITEMS.length - 1 ? 0 : i + 1))
  }, [])

  useEffect(() => {
    const t = setInterval(goNext, 5000)
    return () => clearInterval(t)
  }, [goNext])

  return (
    <div className="w-full h-full flex flex-col rounded-xl bg-white shadow-lg overflow-hidden min-h-0">
      <h3 className="text-primary font-bold text-center py-4 px-4 text-lg sm:text-xl">
        Recent Work Gallery
      </h3>
      <div className="flex-1 flex flex-col min-h-0 px-4 pb-4">
        <div className="relative flex-1 min-h-[320px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden shadow-md">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out overflow-hidden"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                pointerEvents: index === activeIndex ? 'auto' : 'none',
                zIndex: index === activeIndex ? 1 : 0,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-4 text-center text-sm font-medium transition-all duration-500"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  transform: index === activeIndex ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 hover:bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-lg transition-all hover:scale-110"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 hover:bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-lg transition-all hover:scale-110"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
