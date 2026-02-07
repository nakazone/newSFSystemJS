# Flooring Website - Setup Guide

## ?? Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add:
   - `NEXT_PUBLIC_SITE_URL` - Your website URL
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)
   - `NEXT_PUBLIC_GOOGLE_VERIFICATION` - Google Search Console verification code
   - `NEXT_PUBLIC_FORM_ENDPOINT` - Form submission endpoint

3. **Update Company Information**
   
   Search and replace `[Company Name]` throughout the codebase with your actual company name.
   
   Update contact information:
   - Phone numbers: `(XXX) XXX-XXXX`
   - Email: `info@example.com`
   - Address: `[Street Address]`, `[City]`, `[State]`, `[ZIP]`

4. **Customize Cities and Service Areas**
   
   Edit `/data/cities.ts` to add your service areas.

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## ?? Pre-Launch Checklist

### SEO Configuration
- [ ] Update all `[Company Name]` placeholders
- [ ] Configure Google Search Console
- [ ] Set up Google Analytics
- [ ] Verify sitemap.xml is accessible
- [ ] Test robots.txt
- [ ] Add real business address and phone

### Content Updates
- [ ] Add real service images
- [ ] Update testimonials with real reviews
- [ ] Customize city data in `/data/cities.ts`
- [ ] Add blog content
- [ ] Update gallery with project photos

### Form Integration
- [ ] Configure form submission endpoint
- [ ] Set up email notifications
- [ ] Test form submissions
- [ ] Configure CRM integration (if applicable)

### Performance
- [ ] Optimize images (use WebP/AVIF)
- [ ] Test Core Web Vitals
- [ ] Verify Lighthouse score > 90
- [ ] Enable compression
- [ ] Set up CDN (if applicable)

### Legal
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Configure cookie consent (if needed)
- [ ] Ensure GDPR compliance (if applicable)

## ?? SEO Best Practices

1. **Local SEO**
   - Ensure all city pages have unique content
   - Add local business schema markup
   - Include neighborhood mentions
   - Get local citations

2. **Content Strategy**
   - Publish regular blog posts
   - Create location-specific content
   - Add FAQ sections
   - Include customer reviews

3. **Technical SEO**
   - Ensure all pages have unique meta titles/descriptions
   - Use proper heading hierarchy (H1, H2, H3)
   - Implement schema markup
   - Optimize URLs
   - Add breadcrumbs

## ?? Support

For questions or issues, refer to the main README.md file.
