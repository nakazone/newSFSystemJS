# Migração PHP para Node.js – Senior Floors CRM

Este documento descreve o que já foi migrado e o que ainda pode ser feito.

## Concluído (Node.js)

### Landing e captação
- **Landing page** – Next.js (React) em `/`
- **POST /api/send-lead** – formulário da landing (salva lead no MySQL)
- **POST /api/receive-lead** – compatível com o fluxo antigo

### Autenticação admin
- **POST /api/auth/login** – login com `ADMIN_PASSWORD` (env) + qualquer email
- **POST /api/auth/logout** – encerra sessão
- **GET /api/auth/session** – retorna usuário logado
- Login: definir `ADMIN_PASSWORD` no `.env` e acessar `/admin/login`

### API CRM (protegida por sessão)
- **GET /api/leads** – lista leads (query: `q`, `limit`)
- **GET /api/leads/[id]** – detalhe do lead (com notas e tags)
- **PATCH /api/leads/[id]** – atualiza lead (status, priority, owner_id, etc.)
- **POST /api/leads/[id]/notes** – adiciona nota
- **POST /api/leads/[id]/tags** – adiciona tag
- **GET /api/users** – lista usuários

### Painel admin (UI)
- **/admin** – dashboard (contagens + últimos leads)
- **/admin/login** – tela de login
- **/admin/leads** – lista de leads
- **/admin/leads/[id]** – detalhe do lead (status, notas, tags)
- **/admin/customers** – lista de clientes
- **/admin/customers/[id]** – detalhe do cliente
- **/admin/projects** – lista de projetos
- **/admin/projects/[id]** – detalhe do projeto
- **/admin/users** – lista de usuários

### Banco (Prisma)
- Modelos: Lead, LeadNote, LeadTag, Customer, CustomerNote, CustomerTag, Project, ProjectNote, ProjectTag, Activity, AssignmentHistory, Coupon, CouponUsage, User
- Mesmo MySQL do CRM PHP; schema em `prisma/schema.prisma`

## Ainda em PHP (referência)

Os arquivos antigos continuam na pasta (podem ser movidos para `legacy/`):
- `api/*.php` – endpoints PHP
- `admin-modules/*.php` – telas do painel em PHP
- `admin.php`, `crm.php`, `system.php`
- `config/`, `database/`, etc.

## Próximos passos (opcional)

1. **Quotes (orçamentos)** – criar tabelas `quotes` e `quote_items` no Prisma (se existirem no MySQL) e rotas `/api/quotes`, páginas `/admin/quotes`.
2. **Pipeline (Kanban)** – tabela `pipeline_stages`, coluna `pipeline_stage_id` em leads, página Kanban em `/admin/pipeline`.
3. **Visits** – tabela `visits`, CRUD em API e páginas em `/admin/visits`.
4. **Coupons** – já no schema; adicionar API e UI em `/admin/coupons`.
5. **Contratos** – se houver tabela `contracts`, model + API + UI.
6. **Senha por usuário** – adicionar coluna `password_hash` em `users`, hash com bcrypt e login por email/senha no banco (além de `ADMIN_PASSWORD`).

## Como rodar

```bash
# Na raiz do monorepo
npm run dev:landing

# Ou dentro de apps/landing
npm run dev
```

Acesse:
- Landing: http://localhost:8000
- Admin: http://localhost:8000/admin (redireciona para login se não autenticado)

Configure em `apps/landing/.env`:
- `DATABASE_URL` – MySQL do CRM
- `ADMIN_PASSWORD` – senha do admin
