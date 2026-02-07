# Flooring Website - Project Structure

## ?? Arquitetura do Projeto

```
flooring-website/
??? app/                          # Next.js App Router
?   ??? (routes)/
?   ?   ??? page.tsx             # Homepage
?   ?   ??? layout.tsx            # Root layout
?   ?   ??? globals.css           # Global styles
?   ?   ??? sitemap.ts           # Dynamic sitemap
?   ?   ??? robots.ts            # Robots.txt
?   ?   ??? not-found.tsx        # 404 page
?   ?   ?
?   ?   ??? services/            # Service pages
?   ?   ?   ??? page.tsx         # Services listing
?   ?   ?   ??? [slug]/          # Individual service pages
?   ?   ?       ??? page.tsx
?   ?   ?
?   ?   ??? flooring-installer-[city]/  # City landing pages
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? hardwood-flooring-[city]/   # Service + city pages
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? epoxy-flooring-[city]/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? free-estimate/       # Conversion pages
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? schedule-measurement/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? contact/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? service-areas/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? blog/                # Blog structure
?   ?   ?   ??? page.tsx
?   ?   ?   ??? [slug]/
?   ?   ?       ??? page.tsx
?   ?   ?
?   ?   ??? gallery/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? reviews/
?   ?   ?   ??? page.tsx
?   ?   ?
?   ?   ??? api/                 # API routes
?   ?       ??? estimates/
?   ?           ??? route.ts
?   ?
??? components/                   # React components
?   ??? layout/
?   ?   ??? Header.tsx           # Main navigation
?   ?   ??? Footer.tsx          # Footer
?   ?
?   ??? marketing/               # Marketing components
?   ?   ??? Hero.tsx
?   ?   ??? Services.tsx
?   ?   ??? Testimonials.tsx
?   ?   ??? WhyChooseUs.tsx
?   ?
?   ??? forms/
?   ?   ??? EstimateForm.tsx     # Lead generation form
?   ?
?   ??? ui/                      # UI components
?   ?   ??? CTA.tsx
?   ?   ??? Breadcrumbs.tsx
?   ?   ??? StickyMobileCTA.tsx
?   ?   ??? OptimizedImage.tsx
?   ?
?   ??? analytics/
?       ??? GoogleAnalytics.tsx
?
??? data/                        # Data files
?   ??? services.ts              # Service definitions
?   ??? cities.ts                # City/area data
?
??? lib/                         # Utilities
?   ??? utils.ts                 # Helper functions
?   ??? seo.ts                   # SEO utilities
?   ??? schema.ts                # Schema.org markup
?
??? types/                       # TypeScript types
?   ??? index.ts
?
??? public/                      # Static assets
?   ??? (images, etc.)
?
??? Configuration files
    ??? next.config.js
    ??? tailwind.config.ts
    ??? tsconfig.json
    ??? package.json
    ??? .env.example
```

## ?? Páginas Principais

### 1. Homepage (`/`)
- Hero com CTA forte
- Serviços em destaque
- Prova social (reviews, estrelas)
- Seção "Why Choose Us"
- CTA final

### 2. Páginas de Serviços (`/services/[slug]`)
- 8 serviços individuais:
  - Hardwood Flooring
  - Vinyl / LVP / LVT Flooring
  - Tile Flooring
  - Epoxy Flooring
  - Floor Refinishing
  - Flooring Repairs
  - Commercial Flooring
  - Residential Flooring

Cada página contém:
- H1 otimizado
- 900-1200 palavras de conteúdo
- Benefits section
- Process section
- Why Choose Us
- FAQs
- CTAs estratégicos

### 3. Landing Pages Locais
- `/flooring-installer-[city]` - Página geral por cidade
- `/hardwood-flooring-[city]` - Serviço específico + cidade
- `/epoxy-flooring-[city]` - Serviço específico + cidade

Estrutura escalável para adicionar mais cidades e serviços.

### 4. Páginas de Conversão
- `/free-estimate` - Formulário de estimativa
- `/schedule-measurement` - Agendamento de medição
- `/contact` - Contato geral

### 5. Blog (`/blog`)
- Listagem de posts
- Posts individuais (`/blog/[slug]`)
- Estrutura pronta para CMS headless

## ?? SEO Técnico Implementado

? **Schema Markup**
- LocalBusiness
- Service
- FAQPage
- Review (preparado)

? **Meta Tags Dinâmicos**
- Titles e descriptions por página
- Keywords otimizados
- Open Graph
- Twitter Cards

? **Sitemap & Robots**
- Sitemap.xml automático
- Robots.txt otimizado

? **Performance**
- Lazy loading de imagens
- Otimização de imagens (AVIF/WebP)
- Code splitting automático
- SSR/SSG para SEO

## ?? Conversão (CRO)

? **CTAs Estratégicos**
- Header sticky com CTA
- Mobile sticky CTA
- CTAs em todas as páginas
- Click-to-call no mobile

? **Formulários**
- Formulário de estimativa otimizado
- Validação com Zod
- Tracking de conversões

? **Prova Social**
- Reviews destacados
- Ratings visíveis
- Testimonials estratégicos

## ?? Próximos Passos

1. **Customização**
   - Substituir placeholders `[Company Name]`
   - Adicionar informações reais de contato
   - Configurar cidades de serviço

2. **Conteúdo**
   - Adicionar imagens reais
   - Criar conteúdo de blog
   - Adicionar reviews reais

3. **Integrações**
   - Configurar endpoint de formulário
   - Conectar Google Analytics
   - Configurar Google Ads tracking

4. **Deploy**
   - Configurar variáveis de ambiente
   - Deploy em produção
   - Verificar SEO técnico

## ?? Escalabilidade

O projeto está preparado para:
- ? Adicionar novas cidades facilmente
- ? Criar novos serviços
- ? Expandir blog com conteúdo
- ? Integrar CMS headless no futuro
- ? Adicionar mais landing pages locais
