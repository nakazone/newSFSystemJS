# Estrutura do projeto Senior Floors

Três aplicações separadas:

## 1. Landing (`apps/landing`)

- **Conteúdo:** Apenas a landing page e formulários de captação.
- **Rotas:** `/` (página principal).
- **APIs:** `POST /api/send-lead`, `POST /api/receive-lead`.
- **Porta dev:** 8000.
- **Comando:** `npm run dev:landing`.

## 2. Sistema CRM (`apps/system`)

- **Conteúdo:** Dashboard, leads, customers, projects, users, quotes, pipeline, etc.
- **Caminho base:** `/system` (todas as rotas do app ficam sob `/system`).
- **Exemplos:** `/system` (dashboard), `/system/login`, `/system/leads`, `/system/customers`, `/system/projects`, `/system/users`.
- **Porta dev:** 8001.
- **Comando:** `npm run dev:system`.
- **URL local:** http://localhost:8001/system (login em http://localhost:8001/system/login).
- **Variáveis:** `.env` com `DATABASE_URL` e `ADMIN_PASSWORD` (mesmo DB da landing).

## 3. Site (`apps/website`)

- **Conteúdo:** Site institucional (páginas, blog, serviços, cidades, etc.).
- **Caminho base:** `/newsite` (configurado em `basePath`).
- **Admin do site:** contém o caminho `/admin` (ex.: `/newsite/admin` para blog, cities, services, leads).
- **Comando:** `npm run dev:website`.

## Resumo de caminhos

| App     | Caminho base | Admin / Sistema      |
|---------|--------------|----------------------|
| Landing | `/`          | —                    |
| System  | `/system`    | Todo o app é o “admin” (CRM) |
| Website | `/newsite`   | `/admin` (blog, cidades, serviços, leads) |

## Scripts na raiz

- `npm run build` — build dos três apps.
- `npm run dev:landing` — sobe a landing na porta 8000.
- `npm run dev:system` — sobe o sistema na porta 8001 (acesso em `/system`).
- `npm run dev:website` — sobe o site (admin em `/newsite/admin`).
