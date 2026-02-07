'use client'

import { useState } from 'react'

const LOGO = 'https://www.senior-floors.com/logoSeniorFloors.png?v=6'

function LeadForm({ formId, isHero }: { formId: string; isHero: boolean }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = (fd.get('name') as string)?.trim()
    const email = (fd.get('email') as string)?.trim()
    const phone = (fd.get('phone') as string)?.trim()
    const zipcode = (fd.get('zipcode') as string)?.trim()
    if (!name || name.length < 2) { setError('Name is required.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) { setError('Valid email is required.'); return }
    if (!phone || phone.replace(/\D/g, '').length < 10) { setError('Phone is required.'); return }
    const zipClean = (zipcode || '').replace(/\D/g, '')
    if (!zipClean || zipClean.length < 5) { setError('Valid 5-digit US zip code is required.'); return }
    setLoading(true)
    try {
      const body = new URLSearchParams({
        'form-name': (fd.get('form-name') as string) || (isHero ? 'hero-form' : 'contact-form'),
        name,
        email: email || '',
        phone: phone || '',
        zipcode: zipClean.slice(0, 5),
        message: (fd.get('message') as string) || '',
      })
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: body.toString(),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        form.reset()
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="success-message show">
        <strong>Submitted successfully!</strong> Thank you. We&apos;ll contact you within 24 hours.
      </div>
    )
  }

  return (
    <form
      id={formId}
      className={isHero ? 'hero-form' : 'contact-form'}
      name={isHero ? 'hero-form' : 'contact-form'}
      onSubmit={handleSubmit}
      aria-label={isHero ? 'Quick estimate form' : 'Contact form'}
    >
      <input type="hidden" name="form-name" value={isHero ? 'hero-form' : 'contact-form'} />
      {isHero ? (
        <>
          <h2 className="hero-form-title">Get Your Free In-Home Flooring Estimate</h2>
          <p className="hero-form-subtitle">Schedule your free consultation today. We&apos;ll visit your Denver home within 24 hours to provide a detailed, no-obligation estimate.</p>
        </>
      ) : (
        <>
          <h3 className="form-title">Get Your Free Flooring Estimate</h3>
          <p className="form-subtitle">Fill out the form below and we&apos;ll contact you within 24 hours</p>
        </>
      )}
      <div className="error-message-general" style={{ display: error ? 'block' : 'none' }}>{error}</div>
      <div className="form-group">
        <label htmlFor={isHero ? 'hero-name' : 'name'}>Full Name *</label>
        <input type="text" id={isHero ? 'hero-name' : 'name'} name="name" required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor={isHero ? 'hero-phone' : 'phone'}>Phone Number *</label>
        <input type="tel" id={isHero ? 'hero-phone' : 'phone'} name="phone" required autoComplete="tel" />
      </div>
      <div className="form-group">
        <label htmlFor={isHero ? 'hero-email' : 'email'}>Email Address *</label>
        <input type="email" id={isHero ? 'hero-email' : 'email'} name="email" required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor={isHero ? 'hero-zipcode' : 'zipcode'}>Zip Code *</label>
        <input type="text" id={isHero ? 'hero-zipcode' : 'zipcode'} name="zipcode" required autoComplete="postal-code" pattern="[0-9]{5}" placeholder="12345" maxLength={5} inputMode="numeric" />
      </div>
      {!isHero && (
        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea id="message" name="message" rows={4} placeholder="Tell us about your project..." aria-label="Project details" />
        </div>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? 'Sending...' : isHero ? 'Get My Free Estimate' : 'Request My Free Estimate Now'}
      </button>
      <p className="form-disclaimer">? No obligation ? ? Free in-home consultation ? ? Clear pricing, no hidden fees</p>
    </form>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="#hero" className="logo-link">
                <img src={LOGO} alt="Senior Floors" className="logo-image" width={120} height={90} />
              </a>
            </div>
            <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`} id="nav">
              <ul className="nav-list">
                <li><a href="#why-trust" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Why Trust Us</a></li>
                <li><a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
                <li><a href="#why-choose" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a></li>
                <li><a href="#process" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Process</a></li>
                <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
              </ul>
            </nav>
            <div className="header-cta">
              <a href="#contact" className="btn btn-call">Get Free Estimate</a>
              <a href="tel:+17207519813" className="btn btn-call">Call Now</a>
            </div>
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="hero">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="certificate-badge">
                <div className="certificate-stars">????? Google Reviews</div>
                <div className="certificate-text">Hardwood Flooring Specialists</div>
              </div>
              <h1 className="hero-headline">
                Denver&apos;s #1 Hardwood Flooring<br />Installation & Refinishing Experts
              </h1>
              <p className="hero-subheadline">
                Transform your Denver home with premium hardwood flooring installation, refinishing, and luxury vinyl plank. Licensed & insured flooring contractors serving Cherry Creek, Greenwood Village, Lakewood, Morrison, and all Denver metro areas. Free in-home estimates. 5-star rated on Google.
              </p>
              <div className="trust-badges" role="list">
                <div className="trust-badge" role="listitem">Licensed & Insured</div>
                <div className="trust-badge" role="listitem">Premium Materials</div>
                <div className="trust-badge" role="listitem">Local Company</div>
              </div>
              <div className="hero-phone">
                <div className="hero-ctas">
                  <a href="#contact" className="btn btn-primary">Free In-Home Estimates</a>
                  <a href="tel:+17207519813" className="btn btn-secondary">Call (720) 751-9813</a>
                </div>
              </div>
            </div>
            <div className="hero-form-wrapper">
              <LeadForm formId="heroForm" isHero />
            </div>
          </div>
        </div>
      </section>

      <section className="why-trust" id="why-trust">
        <div className="container">
          <h2 className="section-title">Why Denver Homeowners Choose Senior Floors</h2>
          <p className="section-subtitle">Denver&apos;s most trusted hardwood flooring company ? licensed, insured, and 5-star rated by homeowners across the metro area.</p>
          <div className="trust-content">
            <p>Whether you&apos;re refinishing existing hardwood floors in your Cherry Creek home, installing new luxury vinyl plank in Greenwood Village, or restoring damaged floors in Lakewood, Senior Floors delivers flawless results. As Denver&apos;s premier flooring contractor, we specialize in hardwood installation, refinishing, sanding, and luxury vinyl plank installation.</p>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <div className="rating-header">
            <div className="rating-stars-minimal">?????</div>
            <p className="rating-text-minimal">Average rating from verified homeowners</p>
            <h2 className="section-title">5-Star Rated Flooring Company</h2>
            <a href="https://share.google/hLQEgyVnPVm99mozg" target="_blank" rel="noopener noreferrer" className="reviews-link">Read all reviews on Google ?</a>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">?????</div>
              <p className="testimonial-text">&quot;Senior Floors exceeded our expectations. The team was professional, clean, and organized throughout the entire installation. Our new hardwood floors look absolutely stunning!&quot;</p>
              <p className="testimonial-author">? Sarah M., Homeowner</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">?????</div>
              <p className="testimonial-text">&quot;Outstanding quality workmanship and reliability. They helped us choose the perfect luxury vinyl plank for our kitchen, and the installation was flawless. Highly recommend!&quot;</p>
              <p className="testimonial-author">? James R., Homeowner</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">?????</div>
              <p className="testimonial-text">&quot;From consultation to completion, the experience was excellent. Clear communication, transparent pricing, and beautiful results. Couldn&apos;t be happier with our new floors!&quot;</p>
              <p className="testimonial-author">? Maria L., Homeowner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Denver Flooring Services We Offer</h2>
          <p className="section-subtitle">Complete hardwood flooring solutions for Denver homes ? from installation to refinishing to repairs.</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/parquet.png" alt="Hardwood Sanding & Refinishing" loading="lazy" />
              </div>
              <h3 className="service-title">Hardwood Sanding & Refinishing</h3>
              <p className="service-description">Renew old floors, fix scratches and stains, apply custom stain and finish that enhances your home&apos;s value.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/hammer.png" alt="Hardwood & Engineered Wood Installation" loading="lazy" />
              </div>
              <h3 className="service-title">Hardwood & Engineered Wood Installation Denver</h3>
              <p className="service-description">Expert hardwood floor installation in Denver homes. We handle subfloor preparation, moisture testing, and precise installation of solid hardwood and engineered wood.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/laminating.png" alt="Luxury Vinyl Plank (LVP) & Laminate" loading="lazy" />
              </div>
              <h3 className="service-title">Luxury Vinyl Plank (LVP) & Laminate</h3>
              <p className="service-description">Durable, versatile solutions for high-traffic areas with wood-like appearance and easy maintenance.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/stairs.png" alt="Stairs, Rails & Custom Layouts" loading="lazy" />
              </div>
              <h3 className="service-title">Stairs, Rails & Custom Flooring Patterns</h3>
              <p className="service-description">Custom hardwood stair installation, handrail updates, and specialty patterns for luxury Denver homes.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/tools.png" alt="Repairs & Floor Restoration" loading="lazy" />
              </div>
              <h3 className="service-title">Repairs & Floor Restoration</h3>
              <p className="service-description">Fix loose pieces, damaged areas, transitions, and leveling to extend the life of your floors.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src="/assets/house.png" alt="Residential & Select Commercial" loading="lazy" />
              </div>
              <h3 className="service-title">Residential & Commercial Flooring Denver</h3>
              <p className="service-description">Premium flooring installation for Denver residential homes and select commercial spaces.</p>
            </div>
          </div>
          <div className="services-cta">
            <p className="services-cta-text">Not sure what you need?</p>
            <a href="#contact" className="btn btn-primary">Talk to a Flooring Specialist</a>
          </div>
        </div>
      </section>

      <section className="why-choose" id="why-choose">
        <div className="container">
          <h2 className="section-title">Why Choose Senior Floors Over Other Denver Flooring Companies</h2>
          <div className="differentiators-grid">
            {['Free in-home estimates with transparent pricing ? no hidden fees', 'Premium materials only ? we never cut corners on quality', 'Licensed & insured Denver flooring contractors with 10+ years experience', '5-star Google rating ? trusted by hundreds of Denver homeowners', 'Local Denver company ? fast response times, same-day estimates', 'Satisfaction guarantee ? we stand behind every installation'].map((text, i) => (
              <div key={i} className="differentiator-item">
                <div className="differentiator-icon">?</div>
                <p className="differentiator-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="container">
          <h2 className="section-title">Our Simple Flooring Process</h2>
          <div className="process-steps">
            {[
              { n: 1, title: 'Free Consultation and Estimate', desc: 'We visit your home to assess your needs and provide a detailed, no-obligation estimate.' },
              { n: 2, title: 'Material Selection with Expert Guidance', desc: 'Choose from premium flooring options with expert guidance to find the perfect match for your style and budget.' },
              { n: 3, title: 'Professional Installation with Minimal Disruption', desc: 'Our expert team handles everything with precision and care, working efficiently to minimize disruption.' },
              { n: 4, title: 'Final Walkthrough and Satisfaction Guarantee', desc: 'We conduct a thorough walkthrough to ensure everything meets our high standards.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="process-step">
                <div className="step-number">{n}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-description">{desc}</p>
              </div>
            ))}
          </div>
          <div className="process-cta">
            <a href="#contact" className="btn btn-primary">Start with a Free Consultation</a>
          </div>
        </div>
      </section>

      <section className="local-trust">
        <div className="container">
          <div className="local-content">
            <h2 className="section-title">Denver&apos;s Local Flooring Experts You Can Trust</h2>
            <p className="local-text">As a locally owned and operated Denver flooring company, we understand the unique needs of Colorado homes. We proudly serve residential homeowners across Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, and the entire metro area.</p>
            <div className="local-cta">
              <a href="tel:+17207519813" className="btn btn-secondary">Call Your Local Experts</a>
              <a href="#contact" className="btn btn-primary">Request Free Estimate</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-header">
            <h2 className="section-title">Ready to Transform Your Denver Home&apos;s Floors?</h2>
            <p className="section-subtitle">Get your free in-home estimate today. We&apos;ll visit your Denver area home to assess your flooring needs and provide a detailed, no-obligation quote within 24 hours.</p>
          </div>
          <div className="contact-content-with-gallery">
            <div className="gallery-section">
              <h3 className="gallery-title">Recent Work Gallery</h3>
              <div className="gallery-container">
                <div className="gallery-viewport">
                  <div className="gallery-slider" id="gallerySlider">
                    {[
                      { img: '/assets/project1.jpg', desc: 'Full hardwood refinishing ? single-family home in Cherry Creek, Denver, CO' },
                      { img: '/assets/project2.jpg', desc: 'New white oak installation ? open concept living room in Greenwood Village (DTC)' },
                      { img: '/assets/project3.jpg', desc: 'Chevron pattern installation ? luxury home near Morrison' },
                      { img: '/assets/project4.jpg', desc: 'Stair refinishing and handrail update ? Lakewood residence' },
                    ].map((item, i) => (
                      <div key={i} className={`gallery-item ${i === 0 ? 'active' : ''}`}>
                        <img src={item.img} alt={`Recent work ${i + 1}`} loading="lazy" />
                        <div className={`gallery-description ${i === 0 ? 'active' : ''}`}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <LeadForm formId="contactForm" isHero={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2 className="final-cta-title">Ready to Transform Your Denver Home&apos;s Floors?</h2>
          <p className="final-cta-text">Join hundreds of satisfied Denver homeowners who chose Senior Floors. Get your free in-home estimate today ? no obligation, same-day response.</p>
          <div className="final-cta-buttons">
            <a href="#contact" className="btn btn-primary btn-large">Get a Free Estimate Today</a>
            <a href="tel:+17207519813" className="btn btn-secondary btn-large">Call (720) 751-9813</a>
          </div>
        </div>
      </section>

      <div className="sticky-cta" aria-label="Quick contact options">
        <a href="#contact" className="btn btn-primary btn-sticky">Get a Free Estimate</a>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <img src={LOGO} alt="Senior Floors" className="footer-logo" width={120} height={90} />
              <p className="footer-description">Elegant, durable flooring installed with precision and care. Denver&apos;s trusted hardwood flooring experts.</p>
              <div className="trust-badges" role="list">
                <div className="trust-badge" role="listitem">Licensed</div>
                <div className="trust-badge" role="listitem">Insured</div>
                <div className="trust-badge" role="listitem">10+ Years Experience</div>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Our Services</h4>
              <ul className="footer-links">
                <li>Hardwood Sanding & Refinishing</li>
                <li>Hardwood Installation</li>
                <li>Luxury Vinyl Plank (LVP)</li>
                <li>Stairs & Custom Layouts</li>
                <li>Floor Repairs & Restoration</li>
                <li>Residential & Commercial</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="footer-contact-info">
                <p className="footer-contact-item"><strong>Phone:</strong><br /><a href="tel:+17207519813">(720) 751-9813</a></p>
                <p className="footer-contact-item"><strong>Email:</strong><br /><a href="mailto:contact@senior-floors.com">contact@senior-floors.com</a></p>
                <p className="footer-contact-item"><strong>Service Areas:</strong><br />Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, DTC, & Metro Area</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>? {new Date().getFullYear()} Senior Floors. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
