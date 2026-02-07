'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CTA } from '@/components/ui/CTA'

const estimateFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
})

type EstimateFormData = z.infer<typeof estimateFormSchema>

interface EstimateFormProps {
  /** Pre-select this service value (e.g. "floor-refinishing", "hardwood-flooring") when provided. */
  defaultService?: string
  /** Use a compact layout (fewer fields) for sidebars. */
  compact?: boolean
}

export function EstimateForm({ defaultService, compact = false }: EstimateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstimateFormData>({
    resolver: zodResolver(estimateFormSchema),
    defaultValues: defaultService ? { service: defaultService } : undefined,
  })

  const onSubmit = async (data: EstimateFormData) => {
    setIsSubmitting(true)
    try {
      const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/estimates'
      
      // Submit to form endpoint
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }
      
      setSubmitSuccess(true)
      reset()
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'lead_generation',
          event_label: 'free_estimate',
        })
      }

      // Track Google Ads conversion if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // In production, you might want to show an error message to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700">
          We've received your request. Our team will contact you within 24 hours.
        </p>
      </div>
    )
  }

  const inputClass = compact
    ? 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500'
    : 'w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500'
  const labelClass = compact
    ? 'block text-xs font-medium text-gray-700 mb-0.5'
    : 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label htmlFor={compact ? 'name-compact' : 'name'} className={labelClass}>
          Full Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id={compact ? 'name-compact' : 'name'}
          className={inputClass}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-0.5 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor={compact ? 'email-compact' : 'email'} className={labelClass}>
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id={compact ? 'email-compact' : 'email'}
          className={inputClass}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-0.5 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor={compact ? 'phone-compact' : 'phone'} className={labelClass}>
          Phone *
        </label>
        <input
          {...register('phone')}
          type="tel"
          id={compact ? 'phone-compact' : 'phone'}
          className={inputClass}
          placeholder="(XXX) XXX-XXXX"
        />
        {errors.phone && (
          <p className="mt-0.5 text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {!compact && (
        <div>
          <label htmlFor="service" className={labelClass}>
            Service Needed *
          </label>
          <select
            {...register('service')}
            id="service"
            className={inputClass}
          >
            <option value="">Select a service</option>
            <option value="hardwood-refinishing">Hardwood Refinishing</option>
            <option value="hardwood-flooring">Hardwood Flooring</option>
            <option value="vinyl-flooring">Vinyl / LVP / LVT Flooring</option>
            <option value="tile-flooring">Tile Flooring</option>
            <option value="epoxy-flooring">Epoxy Flooring</option>
            <option value="floor-refinishing">Floor Refinishing</option>
            <option value="flooring-repairs">Flooring Repairs</option>
            <option value="commercial-flooring">Commercial Flooring</option>
            <option value="residential-flooring">Residential Flooring</option>
          </select>
          {errors.service && (
            <p className="mt-0.5 text-xs text-red-600">{errors.service.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`cta-button w-full disabled:opacity-50 disabled:cursor-not-allowed ${compact ? 'py-2.5 text-sm' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
      </button>

      <p className={`text-gray-500 text-center ${compact ? 'text-[10px]' : 'text-xs'}`}>
        By submitting this form, you agree to be contacted by our team.
      </p>
      {compact && (
        <p className="text-[10px] text-gray-500 text-center">
          <a href="/free-estimate" className="text-primary hover:underline">
            Full estimate form →
          </a>
        </p>
      )}
    </form>
  )
}
