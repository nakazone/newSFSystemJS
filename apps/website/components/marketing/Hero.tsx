'use client'

import { useEffect, useRef } from 'react'
import { CTA } from '@/components/ui/CTA'
import { Phone } from 'lucide-react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    console.log('Video element:', video)
    console.log('Video src:', video.currentSrc || video.src)

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded')
      video.play().catch((err) => {
        console.error('Video play error:', err)
      })
    }

    const handleCanPlay = () => {
      console.log('Video can play')
      video.play().catch((err) => {
        console.error('Video play error on canplay:', err)
      })
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)

    // Forçar load
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <section className="relative text-white min-h-screen flex items-center overflow-hidden">
      {/* Video Background - apenas dentro do Hero */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/videos/bg_seniorFloors.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay mais claro para vídeo aparecer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/40 to-primary/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full flex items-center justify-center min-h-screen">
        <div className="max-w-3xl text-center w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">
            Professional Flooring Installation & Services
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/95 drop-shadow-md">
            Transform your space with expert flooring installation. Hardwood, vinyl, tile, epoxy, and more. 
            Free estimates available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA href="/free-estimate" variant="primary" className="text-lg px-8 py-4">
              Get Free Estimate
            </CTA>
            <a
              href="tel:+17207519813"
              className="cta-button-secondary text-lg px-8 py-4 flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call (720) 751-9813
            </a>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm">
            {/* Google Reviews Badge */}
            <div className="inline-block bg-white/15 border border-white/30 rounded-md px-4 py-2 backdrop-blur-sm">
              <div className="text-secondary text-base font-semibold mb-1 text-center tracking-wider">
                ★★★★★ Google Reviews
              </div>
              <div className="text-white/95 text-xs font-semibold text-center uppercase tracking-wide">
                Hardwood Flooring Specialists
              </div>
            </div>
            
            {/* Other Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">
                Licensed & Insured
              </span>
              <span className="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">
                Premium Materials
              </span>
              <span className="inline-block bg-white/15 border border-white/30 rounded-md px-3 py-1 text-xs font-semibold text-white/95 uppercase tracking-wide backdrop-blur-sm">
                Local Company
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
