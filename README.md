# Senior Floors ù Projeto Unificado

Um ùnico projeto Node.js que reùne **Landing Page**, **Sistema (PHP)** e **Novo Site (Next.js)** da Senior Floors. Facilita alteraùùes e deploys a partir de um sù repositùrio.

## Estrutura

```
senior-floors/
??? apps/
?   ??? landing/     # Landing Page + Sistema (HTML, CSS, JS e PHP)
?   ?   ??? index.html, styles.css, script.js
?   ?   ??? system.php, crm.php, send-lead.php
?   ?   ??? api/           # API PHP (leads, quotes, etc.)
?   ?   ??? admin-modules/ # Mùdulos do admin
?   ?   ??? config/        # Configuraùùes PHP
?   ??? website/     # Novo Site (Next.js, basePath: /newsite)
?       ??? app/, components/, lib/
?       ??? prisma/
??? scripts/         # Scripts de build (prepare-landing, postinstall)
??? package.json     # Workspaces e scripts na raiz
??? DEPLOY.md        # Guia de deploy por ambiente
??? README.md
```

## Prù-requisitos

- Node.js 18+
- (Para Sistema PHP) PHP no servidor de deploy

## Instalaùùo

```bash
cd senior-floors
npm install
```

O `postinstall` gera o Prisma Client do app `website`.

## Desenvolvimento

```bash
# Novo Site (Next.js) ù http://localhost:3000/newsite
npm run dev:website

# Landing Page (servidor estùtico) ù http://localhost:8000
npm run dev:landing
```

Para testar o Sistema (PHP) localmente, use um servidor PHP na pasta `apps/landing` (ex.: `php -S localhost:8080` em `apps/landing`).

## Build

```bash
npm run build
```

- **Landing:** Next.js em `apps/landing/.next` (API de leads em Node)
- **Novo Site:** Next.js em `apps/website/.next`

## Deploy

Consulte **[DEPLOY.md](./DEPLOY.md)** para:

- Landing (ex.: Netlify)
- Sistema PHP (ex.: Hostinger)
- Novo Site Next.js (ex.: Vercel ou Node)

## Comandos (raiz)

| Comando | Descriùùo |
|--------|-----------|
| `npm run build` | Build do website + preparo da landing |
| `npm run build:website` | Sù o build Next.js |
| `npm run build:landing` | Sù o preparo da landing |
| `npm run dev:website` | Dev do Novo Site (porta 3000) |
| `npm run dev:landing` | Servidor estùtico da landing (porta 8000) |
| `npm run start:website` | Servir Novo Site em produùùo (apùs build) |

## Origem dos projetos

- **Landing + Sistema:** conteùdo anterior de `senior-floors-landing`
- **Novo Site:** conteùdo anterior de `flooring-website`

Tudo passa a ser mantido neste repositùrio ùnico.
