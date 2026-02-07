# Admin Panel / CMS Guide

## ?? Acesso ao Admin Panel

**URL**: `/admin`  
**Login**: `admin@example.com`  
**Password**: `admin123`

## ?? Funcionalidades Implementadas

### ? 1. Autenticação & Segurança
- Login seguro com NextAuth
- Role-based access (Admin / Editor)
- Proteção de rotas admin

### ? 2. Dashboard
- Estatísticas em tempo real
- Visão geral de serviços, cidades, blog e leads
- Leads recentes

### ? 3. Services Management (CMS)
**Acesso**: `/admin/services`

**Funcionalidades**:
- ? Criar novos serviços
- ? Editar serviços existentes
- ? Deletar serviços
- ? Campos editáveis:
  - Nome, slug, descrição
  - Meta title, meta description, keywords
  - Benefits (lista editável)
  - Process steps (lista editável)
  - FAQs (lista editável)
  - Schema toggles (FAQ, Service)
  - Published/Draft status
  - Featured flag

**Como usar**:
1. Acesse `/admin/services`
2. Clique em "Add New Service"
3. Preencha os campos
4. Salve - a página será gerada automaticamente em `/services/[slug]`

### ? 4. Cities Management (CMS)
**Acesso**: `/admin/cities`

**Funcionalidades**:
- ? Adicionar novas cidades
- ? Editar cidades existentes
- ? Deletar cidades
- ? Campos editáveis:
  - Nome, estado, ZIP code
  - Slug (URL)
  - Meta tags SEO
  - Descrição e conteúdo local
  - Neighborhoods (lista editável)
  - Coordenadas (lat/lng)
  - Published status

**Geração Automática de Páginas**:
Quando você adiciona uma cidade, o sistema automaticamente gera:
- `/flooring-installer-[city-slug]` (página geral)
- `/hardwood-flooring-[city-slug]` (para cada serviço publicado)
- `/epoxy-flooring-[city-slug]` (para cada serviço publicado)
- E assim por diante...

### ? 5. Blog Management (CMS)
**Acesso**: `/admin/blog`

**Funcionalidades**:
- ? Criar posts de blog
- ? Editar posts existentes
- ? Deletar posts
- ? Campos editáveis:
  - Título, slug, excerpt
  - Conteúdo completo
  - Meta tags SEO
  - Categoria e tags
  - Featured image
  - Target city (opcional para SEO local)
  - Published/Draft status

**Workflow**:
1. Criar post como Draft
2. Editar e revisar
3. Marcar como Published quando pronto
4. Post aparece automaticamente em `/blog`

### ? 6. Lead Management
**Acesso**: `/admin/leads`

**Funcionalidades**:
- ? Ver todos os leads
- ? Filtrar por status (New, Contacted, Qualified, Converted, Lost)
- ? Visualizar detalhes do lead
- ? Exportar leads (CSV) - pronto para implementar
- ? Status tracking
- ? Notes field para anotações

**Status dos Leads**:
- **NEW**: Lead recém-criado
- **CONTACTED**: Cliente foi contatado
- **QUALIFIED**: Lead qualificado
- **CONVERTED**: Conversão realizada
- **LOST**: Lead perdido

## ?? SEO Management

### Meta Tags
Todos os modelos (Services, Cities, Blog) têm campos para:
- Meta Title (auto-gerado se vazio)
- Meta Description (auto-gerado se vazio)
- Keywords

### Schema Markup
- ? LocalBusiness schema (automático)
- ? Service schema (toggle por serviço)
- ? FAQ schema (toggle por serviço)
- ? Review schema (preparado)

### URLs
- ? URLs amigáveis e editáveis (slugs)
- ? Sitemap.xml dinâmico (atualiza automaticamente)
- ? Robots.txt otimizado

## ?? Integração com Páginas

### Páginas Dinâmicas do CMS

**Services** (`/services/[slug]`):
- Carrega dados do banco de dados
- Meta tags do CMS
- Schema markup baseado em toggles
- Conteúdo editável via Admin Panel

**Cities** (`/flooring-installer-[city]`):
- Carrega dados do banco de dados
- Gera automaticamente quando cidade é adicionada
- Conteúdo local editável
- Neighborhoods dinâmicos

**Blog** (`/blog/[slug]`):
- Posts gerenciados via CMS
- Categorias e tags
- SEO otimizado
- Target city para SEO local

## ?? Workflow Recomendado

### Adicionar Novo Serviço:
1. `/admin/services` ? "Add New Service"
2. Preencher informações básicas
3. Adicionar benefits, process steps, FAQs
4. Configurar SEO
5. Publicar
6. Página disponível em `/services/[slug]`

### Adicionar Nova Cidade:
1. `/admin/cities` ? "Add New City"
2. Preencher nome, estado, ZIP
3. Adicionar neighborhoods
4. Adicionar conteúdo local específico
5. Configurar SEO
6. Publicar
7. Páginas geradas automaticamente:
   - `/flooring-installer-[city]`
   - `/[service]-[city]` para cada serviço

### Criar Post de Blog:
1. `/admin/blog` ? "New Post"
2. Escrever conteúdo
3. Adicionar categoria e tags
4. Configurar SEO
5. Opcional: vincular a uma cidade
6. Publicar quando pronto
7. Post aparece em `/blog`

## ?? Próximos Passos (Opcional)

### Integrações Futuras:
- [ ] Email notifications para novos leads
- [ ] CRM integration (GoHighLevel, HubSpot)
- [ ] Image upload/management
- [ ] Rich text editor para conteúdo
- [ ] Analytics dashboard
- [ ] A/B testing para CTAs
- [ ] Review management via CMS

## ?? Notas Importantes

1. **Primeiro Login**: Use `admin@example.com` / `admin123`
2. **Mudar Senha**: Implementar página de settings (futuro)
3. **Backup**: O banco SQLite está em `prisma/dev.db` - faça backup regularmente
4. **Produção**: Para produção, considere migrar para PostgreSQL
5. **Imagens**: Atualmente URLs - considere upload de imagens no futuro

## ?? Troubleshooting

**Erro de autenticação**: Verifique se o usuário existe no banco
**Páginas não aparecem**: Verifique se estão marcadas como "Published"
**Sitemap não atualiza**: Recarregue a página `/sitemap.xml`
