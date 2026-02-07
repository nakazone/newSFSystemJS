'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  portfolioProjects,
  portfolioCityOptions,
  portfolioServiceOptions,
  portfolioServiceSlugToName,
  portfolioFlooringOptions,
  portfolioFlooringSlugToName,
  portfolioMaterialOptions,
  portfolioMaterialSlugToName,
} from '@/data/portfolioProjects'
import { MapPin, Briefcase, TreeDeciduous, Box as BoxIcon, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { PortfolioProject } from '@/data/portfolioProjects'

const ALL = 'All'
const PROJECTS_PER_PAGE = 9

type PortfolioGalleryProps = {
  /** When coming from a city page (e.g. /portfolio?city=denver), pre-select this city. */
  initialCitySlug?: string
  /** When coming from a service page (e.g. /portfolio?service=hardwood-refinishing), pre-select this service. */
  initialServiceSlug?: string
  /** When coming from a flooring page (e.g. /portfolio?flooring=site-finished-wood), pre-select this flooring. */
  initialFlooringSlug?: string
  /** When coming with material filter (e.g. /portfolio?material=red-oak), pre-select this material. */
  initialMaterialSlug?: string
  /** Initial page from URL (e.g. ?page=2). */
  initialPage?: string
}

function buildPortfolioQuery(params: { page?: number; city?: string; service?: string; flooring?: string; material?: string }) {
  const search = new URLSearchParams()
  if (params.page != null && params.page > 1) search.set('page', String(params.page))
  if (params.city && params.city !== ALL) search.set('city', params.city)
  if (params.service && params.service !== ALL) search.set('service', params.service)
  if (params.flooring && params.flooring !== ALL) search.set('flooring', params.flooring)
  if (params.material && params.material !== ALL) search.set('material', params.material)
  const q = search.toString()
  return q ? `?${q}` : ''
}

export function PortfolioGallery({ initialCitySlug, initialServiceSlug, initialFlooringSlug, initialMaterialSlug, initialPage }: PortfolioGalleryProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const citySlug = searchParams.get('city') || initialCitySlug || ALL
  const serviceSlug = searchParams.get('service') || initialServiceSlug || ALL
  const flooringSlug = searchParams.get('flooring') || initialFlooringSlug || ALL
  const materialSlug = searchParams.get('material') || initialMaterialSlug || ALL
  const pageFromUrl = Math.max(1, parseInt(initialPage || searchParams.get('page') || '1', 10))
  const serviceTypeName = serviceSlug !== ALL ? portfolioServiceSlugToName[serviceSlug] : null
  const flooringTypeName = flooringSlug !== ALL ? portfolioFlooringSlugToName[flooringSlug] : null
  const materialName = materialSlug !== ALL ? portfolioMaterialSlugToName[materialSlug] : null

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchCity = citySlug === ALL || project.citySlug === citySlug
      const matchService = !serviceTypeName || project.serviceType === serviceTypeName
      const matchFlooring = !flooringTypeName || project.flooringType === flooringTypeName
      const matchMaterial = !materialName || project.material === materialName
      return matchCity && matchService && matchFlooring && matchMaterial
    })
  }, [citySlug, serviceTypeName, flooringTypeName, materialName])

  const totalCount = filteredProjects.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PROJECTS_PER_PAGE))
  const currentPage = Math.min(pageFromUrl, totalPages)
  const paginatedProjects = useMemo(
    () =>
      filteredProjects.slice(
        (currentPage - 1) * PROJECTS_PER_PAGE,
        currentPage * PROJECTS_PER_PAGE
      ),
    [filteredProjects, currentPage]
  )

  const handleCityChange = (newCity: string) => {
    router.push(`/portfolio${buildPortfolioQuery({ page: 1, city: newCity, service: serviceSlug, flooring: flooringSlug })}`)
  }

  const handleServiceChange = (newServiceSlug: string) => {
    router.push(`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: newServiceSlug, flooring: flooringSlug })}`)
  }

  const handleFlooringChange = (newFlooringSlug: string) => {
    router.push(`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: serviceSlug, flooring: newFlooringSlug, material: materialSlug })}`)
  }

  const handleMaterialChange = (newMaterialSlug: string) => {
    router.push(`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: serviceSlug, flooring: flooringSlug, material: newMaterialSlug })}`)
  }

  const [fullscreenProjectId, setFullscreenProjectId] = useState<string | null>(null)
  const fullscreenIndex = fullscreenProjectId
    ? filteredProjects.findIndex((p) => p.id === fullscreenProjectId)
    : -1
  const fullscreenProject: PortfolioProject | null = fullscreenIndex >= 0 ? filteredProjects[fullscreenIndex] ?? null : null
  const hasPrev = fullscreenIndex > 0
  const hasNext = fullscreenIndex >= 0 && fullscreenIndex < filteredProjects.length - 1

  const closeFullscreen = useCallback(() => setFullscreenProjectId(null), [])
  const goPrev = useCallback(() => {
    if (hasPrev && fullscreenIndex > 0) setFullscreenProjectId(filteredProjects[fullscreenIndex - 1].id)
  }, [hasPrev, fullscreenIndex, filteredProjects])
  const goNext = useCallback(() => {
    if (hasNext && fullscreenIndex < filteredProjects.length - 1) setFullscreenProjectId(filteredProjects[fullscreenIndex + 1].id)
  }, [hasNext, fullscreenIndex, filteredProjects])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenProjectId) return
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [fullscreenProjectId, closeFullscreen, goPrev, goNext])

  useEffect(() => {
    if (fullscreenProjectId) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [fullscreenProjectId])

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <label htmlFor="filter-city" className="text-sm font-medium text-text-dark flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            City
          </label>
          <select
            id="filter-city"
            value={citySlug}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={ALL}>All</option>
            {portfolioCityOptions.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <label htmlFor="filter-service" className="text-sm font-medium text-text-dark flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Service
          </label>
          <select
            id="filter-service"
            value={serviceSlug}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={ALL}>All</option>
            {portfolioServiceOptions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <label htmlFor="filter-flooring" className="text-sm font-medium text-text-dark flex items-center gap-2">
            <TreeDeciduous className="h-4 w-4 text-primary" />
            Flooring
          </label>
          <select
            id="filter-flooring"
            value={flooringSlug}
            onChange={(e) => handleFlooringChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={ALL}>All</option>
            {portfolioFlooringOptions.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <label htmlFor="filter-material" className="text-sm font-medium text-text-dark flex items-center gap-2">
            <BoxIcon className="h-4 w-4 text-primary" />
            Materials
          </label>
          <select
            id="filter-material"
            value={materialSlug}
            onChange={(e) => handleMaterialChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={ALL}>All</option>
            {portfolioMaterialOptions.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultado */}
      <p className="text-sm text-text-light">
        {totalCount} {totalCount === 1 ? 'project' : 'projects'}
        {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
      </p>

      {/* Grid de projetos (9 por página) */}
      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all duration-200 group"
            >
              <button
                type="button"
                onClick={() => setFullscreenProjectId(project.id)}
                className="relative aspect-[4/3] overflow-hidden bg-bg-light w-full block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                aria-label={`View ${project.title} fullscreen`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-text-light mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/service-areas/${project.citySlug}`}
                    className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                  >
                    {project.city}
                  </Link>
                  <Link
                    href={`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: portfolioServiceOptions.find((o) => o.name === project.serviceType)?.slug, flooring: flooringSlug, material: materialSlug })}`}
                    className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                  >
                    {project.serviceType}
                  </Link>
                  <Link
                    href={`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: serviceSlug, flooring: portfolioFlooringOptions.find((o) => o.name === project.flooringType)?.slug, material: materialSlug })}`}
                    className="inline-block px-2.5 py-1 text-xs font-medium bg-secondary/20 text-primary rounded-md hover:bg-secondary/30 transition-colors"
                  >
                    {project.flooringType}
                  </Link>
                  {project.material && (
                    <Link
                      href={`/portfolio${buildPortfolioQuery({ page: 1, city: citySlug, service: serviceSlug, flooring: flooringSlug, material: portfolioMaterialOptions.find((o) => o.name === project.material)?.slug })}`}
                      className="inline-block px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                    >
                      {project.material}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-bg-light rounded-xl">
          <p className="text-text-light">
            No projects found with the selected filters. Try different options.
          </p>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="Portfolio pagination"
        >
          {currentPage > 1 ? (
            <Link
              href={`/portfolio${buildPortfolioQuery({ page: currentPage - 1, city: citySlug, service: serviceSlug, flooring: flooringSlug, material: materialSlug })}`}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-text-dark hover:bg-bg-light hover:border-primary/30 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-text-light text-sm font-medium cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/portfolio${buildPortfolioQuery({ page: p, city: citySlug, service: serviceSlug, flooring: flooringSlug, material: materialSlug })}`}
                className={`min-w-[2.25rem] h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                  p === currentPage
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 bg-white text-text-dark hover:bg-bg-light hover:border-primary/30'
                }`}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </Link>
            ))}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/portfolio${buildPortfolioQuery({ page: currentPage + 1, city: citySlug, service: serviceSlug, flooring: flooringSlug, material: materialSlug })}`}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-text-dark hover:bg-bg-light hover:border-primary/30 transition-colors text-sm font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-text-light text-sm font-medium cursor-not-allowed">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </nav>
      )}

      {/* Fullscreen gallery overlay */}
      {fullscreenProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
        >
          <button
            type="button"
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next project"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          <div
            className="absolute inset-0 flex items-center justify-center p-4 pt-16 pb-24"
            onClick={(e) => e.target === e.currentTarget && closeFullscreen()}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex flex-col items-center">
              <div className="relative w-full flex-1 min-h-[50vh]">
                <Image
                  src={fullscreenProject.image}
                  alt={fullscreenProject.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="mt-4 text-center text-white flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold">{fullscreenProject.title}</h2>
                <p className="text-white/80 text-sm sm:text-base mt-1 max-w-2xl mx-auto">
                  {fullscreenProject.description}
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-2">
                  {fullscreenProject.city} · {fullscreenProject.serviceType}
                  {fullscreenProject.material && ` · ${fullscreenProject.material}`}
                </p>
              </div>
            </div>
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {fullscreenIndex + 1} / {filteredProjects.length}
          </p>
        </div>
      )}
    </div>
  )
}
