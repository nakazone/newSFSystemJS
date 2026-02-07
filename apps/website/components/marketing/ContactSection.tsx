import { ContactGallery } from '@/components/marketing/ContactGallery'
import { EstimateForm } from '@/components/forms/EstimateForm'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Ready to Transform Your Denver Home&apos;s Floors?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get your free in-home estimate today. We&apos;ll visit your Denver area home to assess your flooring needs and provide a detailed, no-obligation quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Recent Work Gallery - same as LP */}
          <div className="w-full min-h-[400px] lg:min-h-[500px]">
            <ContactGallery />
          </div>

          {/* Contact Form - same form as LP */}
          <div className="w-full flex flex-col">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-2">
                Get Your Free Flooring Estimate
              </h3>
              <p className="text-sm text-text-light mb-6">
                Fill out the form below and we&apos;ll contact you within 24 hours
              </p>
              <EstimateForm />
              <p className="text-xs text-text-light mt-4 text-center">
                ✓ No obligation · ✓ Free in-home consultation · ✓ Same-day response · ✓ Serving all Denver metro areas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
