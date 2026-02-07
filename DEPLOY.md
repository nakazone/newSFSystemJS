# Deploy – Senior Floors (projeto unificado)

Um único repositório contém:

| Parte | Pasta | Descrição |
|-------|--------|-----------|
| **Landing Page** | `apps/landing` | HTML, CSS, JS + formulários |
| **Sistema** | `apps/landing` | PHP (CRM, API, admin: `system.php`, `crm.php`, `api/`, `admin-modules/`) |
| **Novo Site** | `apps/website` | Next.js (rota base `/newsite`) |

## Build (tudo a partir da raiz)

```bash
cd senior-floors
npm install
npm run build
```

- **Novo Site:** build Next.js em `apps/website/.next`
- **Landing + Sistema:** arquivos em `apps/landing` (não há passo de build; PHP e estáticos já estão prontos)

## Deploy por parte

### 1. Landing Page (ex.: Netlify)

- **Pasta a publicar:** `apps/landing`
- **Build command:** vazio ou `echo 'Static'`
- Configuração atual: `apps/landing/netlify.toml`

### 2. Sistema (PHP) (ex.: Hostinger)

- **Pasta a enviar:** a mesma `apps/landing` (contém `system.php`, `crm.php`, `api/`, `config/`, etc.)
- Pode ser o mesmo deploy da landing no mesmo domínio (ex.: `senior-floors.com`) ou subdomínio.

### 3. Novo Site (Next.js) (ex.: Vercel / Node)

- **Pasta do projeto:** `apps/website`
- **Build:** `npm run build` (na raiz: `npm run build:website`)
- **Start:** `npm run start:website` ou `npm run start -w website`
- Em Vercel: root directory = `apps/website` (ou use monorepo e indique `apps/website` como app).

## Comandos úteis (raiz)

```bash
npm run build           # build do site + preparo da landing
npm run build:website   # só Next.js
npm run build:landing   # só preparo da landing
npm run dev:website     # Next.js em desenvolvimento (porta 3000)
npm run dev:landing     # servidor estático da landing (porta 8000)
npm run start:website   # produção Next.js (após build)
```

## Resumo

- **Alterações e deploys** ficam em um único repositório.
- **Landing + Sistema** = mesma pasta `apps/landing` (uma vez no servidor PHP, tudo já está lá).
- **Novo Site** = `apps/website`; build e deploy como qualquer app Next.js.
