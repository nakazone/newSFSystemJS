# Varredura PHP vs Node – Senior Floors

Mapeamento de **todos** os arquivos PHP e equivalência em Node (Next.js).

## Legenda
- **OK** = já existe em Node (API ou página)
- **FALTANDO** = será implementado
- **N/A** = não aplicável (ex: config PHP, testes, utilitários de deploy)

---

## 1. Entrada / formulários

| PHP | Node | Status |
|-----|------|--------|
| send-lead.php | POST /api/send-lead | OK |
| api/receive-lead-handler.php | POST /api/receive-lead | OK |
| contact-form-handler.php | (lógica em send-lead) | OK |
| contact-form-handler-smtp.php | (idem) | OK |
| forward-lead.php | (LP chama API direto) | N/A |

---

## 2. Autenticação e painel

| PHP | Node | Status |
|-----|------|--------|
| admin.php (login + router) | /admin/login + middleware | OK |
| crm.php (wrapper CRM) | app/admin/layout + AdminShell | OK |
| verify-password.php, get-password-hash.php, setup-admin-password.php, generate-password-hash.php | ADMIN_PASSWORD em .env | OK |
| admin-config.php | .env (SESSION_SECRET, ADMIN_PASSWORD) | OK |

---

## 3. API – Leads

| PHP | Node | Status |
|-----|------|--------|
| api/leads/list.php | (list = GET /api/leads com q, limit) | OK |
| api/leads/search.php | GET /api/leads?q= | OK |
| api/leads/get.php | GET /api/leads/[id] | OK |
| api/leads/update.php | PATCH /api/leads/[id] | OK |
| api/leads/notes.php | POST /api/leads/[id]/notes | OK |
| api/leads/tags.php | POST /api/leads/[id]/tags | OK |
| api/leads/create.php | (form = send-lead) | OK |
| api/leads/create-manual.php | POST /api/leads (admin) | FALTANDO |

---

## 4. API – Customers

| PHP | Node | Status |
|-----|------|--------|
| api/customers/list.php | GET /api/customers | FALTANDO |
| api/customers/get.php | GET /api/customers/[id] | FALTANDO |
| api/customers/create.php | POST /api/customers | FALTANDO |
| api/customers/update.php | PATCH /api/customers/[id] | FALTANDO |
| api/customers/notes.php | POST /api/customers/[id]/notes | FALTANDO |
| api/customers/tags.php | POST /api/customers/[id]/tags | FALTANDO |

---

## 5. API – Projects

| PHP | Node | Status |
|-----|------|--------|
| api/projects/list.php | GET /api/projects | FALTANDO |
| api/projects/get.php | GET /api/projects/[id] | FALTANDO |
| api/projects/create.php | POST /api/projects | FALTANDO |
| api/projects/update.php | PATCH /api/projects/[id] | FALTANDO |
| api/projects/notes.php | POST /api/projects/[id]/notes | FALTANDO |
| api/projects/tags.php | POST /api/projects/[id]/tags | FALTANDO |
| api/projects/checklist.php | (checklist) | FALTANDO |
| api/projects/documents.php | (documents) | FALTANDO |
| api/projects/issues.php | (issues) | FALTANDO |

---

## 6. API – Pipeline

| PHP | Node | Status |
|-----|------|--------|
| api/pipeline/stages.php | GET /api/pipeline/stages | FALTANDO |
| api/pipeline/leads.php | GET /api/pipeline/leads | FALTANDO |
| api/pipeline/move.php | POST /api/pipeline/move | FALTANDO |

---

## 7. API – Quotes

| PHP | Node | Status |
|-----|------|--------|
| api/quotes/list.php | GET /api/quotes | FALTANDO |
| api/quotes/get.php | GET /api/quotes/[id] | FALTANDO |
| api/quotes/create.php | POST /api/quotes | FALTANDO |
| api/quotes/update.php | PATCH /api/quotes/[id] | FALTANDO |
| api/quotes/accept.php | POST /api/quotes/[id]/accept | FALTANDO |
| api/quotes/decline.php | POST /api/quotes/[id]/decline | FALTANDO |
| api/quotes/send.php | POST /api/quotes/[id]/send | FALTANDO |
| api/quotes/pdf.php | GET /api/quotes/[id]/pdf | FALTANDO |
| api/quotes/public-get.php | GET /api/quotes/public/[token] | FALTANDO |
| api/quotes/convert-project.php | POST /api/quotes/[id]/convert-project | FALTANDO |

---

## 8. API – Activities

| PHP | Node | Status |
|-----|------|--------|
| api/activities/list.php | GET /api/activities | FALTANDO |
| api/activities/create.php | POST /api/activities | FALTANDO |

---

## 9. API – Assignment

| PHP | Node | Status |
|-----|------|--------|
| api/assignment/assign.php | POST /api/assignment/assign | FALTANDO |
| api/assignment/history.php | GET /api/assignment/history | FALTANDO |

---

## 10. API – Contracts

| PHP | Node | Status |
|-----|------|--------|
| api/contracts/list.php | GET /api/contracts | FALTANDO |
| api/contracts/create.php | POST /api/contracts | FALTANDO |

---

## 11. API – Coupons

| PHP | Node | Status |
|-----|------|--------|
| api/coupons/list.php | GET /api/coupons | FALTANDO |
| api/coupons/create.php | POST /api/coupons | FALTANDO |
| api/coupons/update.php | PATCH /api/coupons/[id] | FALTANDO |
| api/coupons/use.php | POST /api/coupons/[id]/use | FALTANDO |

---

## 12. API – Users

| PHP | Node | Status |
|-----|------|--------|
| api/users/list.php | GET /api/users | OK |
| api/users/create.php | POST /api/users | FALTANDO |
| api/users/update.php | PATCH /api/users/[id] | FALTANDO |
| api/users/permissions.php | (permissions) | FALTANDO |

---

## 13. API – Visits

| PHP | Node | Status |
|-----|------|--------|
| api/visits/list.php | GET /api/visits | FALTANDO |
| api/visits/get.php | GET /api/visits/[id] | FALTANDO |
| api/visits/create.php | POST /api/visits | FALTANDO |
| api/visits/update.php | PATCH /api/visits/[id] | FALTANDO |

---

## 14. Admin modules (UI)

| PHP | Node | Status |
|-----|------|--------|
| admin-modules/dashboard.php | /admin (page.tsx) | OK |
| admin-modules/lead-detail.php | /admin/leads/[id] | OK |
| admin-modules/customers.php | /admin/customers | OK |
| admin-modules/customer-detail.php | /admin/customers/[id] | OK |
| admin-modules/projects.php | /admin/projects | OK |
| admin-modules/project-detail.php | /admin/projects/[id] | OK |
| admin-modules/quotes.php | /admin/quotes | FALTANDO |
| admin-modules/quote-detail.php | /admin/quotes/[id] | FALTANDO |
| admin-modules/pipeline.php | /admin/pipeline | FALTANDO |
| admin-modules/visits.php | /admin/visits | FALTANDO |
| admin-modules/visit-detail.php | /admin/visits/[id] | FALTANDO |
| admin-modules/users.php | /admin/users | OK |
| admin-modules/user-detail.php | /admin/users/[id] | FALTANDO |
| admin-modules/coupons.php | /admin/coupons | FALTANDO |
| admin-modules/settings.php | /admin/settings | FALTANDO |

---

## 15. Páginas públicas / outros

| PHP | Node | Status |
|-----|------|--------|
| quote-view.php (orçamento público) | /quote/[token] (opcional) | FALTANDO |
| view-leads.php, leads-admin.php | (substituído por /admin/leads) | OK |
| system.php (router API) | Next.js API routes | OK |

---

## 16. Config / libs (lógica, não endpoint)

| PHP | Node | Status |
|-----|------|--------|
| config/database.php | DATABASE_URL + Prisma | OK |
| config/lead-logic.php | (round-robin: pode ir em lib) | Opcional |
| config/permissions.php | (permissions: pode ir em lib) | FALTANDO |
| config/pipeline.php | fallback estágios em /api/pipeline/stages | OK quando implementar |
| config/tags.php, audit.php, pipeline-rules.php, quotes.php, smtp, telegram | .env ou libs | N/A |
| libs/quotes-helper.php | lib (se fizer PDF/quote em Node) | Com quotes |
| libs/telegram-notifier.php | (opcional) lib Node | Opcional |
| templates/email-confirmation.php | (opcional) template Node | Opcional |

---

## 17. Utilitários / testes (não críticos para produção)

| PHP | Node | Status |
|-----|------|--------|
| executar-migration.php, executar-schema-completo.php | npx prisma migrate / sql manual | N/A |
| diagnostico-banco.php, verificar-leads-banco.php, verificar-atualizacoes-crm.php | (diagnóstico) | N/A |
| debug-crm-read.php, debug-save-path.php, error-check.php | (debug) | N/A |
| test-*.php, check-*.php | (testes manuais) | N/A |
| cron-workflows.php | (cron) script Node ou external | Opcional |

---

## Resumo

- **Já em Node:** entrada (send/receive lead), auth, admin layout, leads (list/get/update/notes/tags), users list, dashboard, leads/customers/projects/users list+detail.
- **A implementar para paridade total:**
  - APIs: leads create-manual; customers (list, get, create, update, notes, tags); projects (idem + checklist, documents, issues); pipeline (stages, leads, move); quotes (CRUD + accept/decline/send/pdf/public/convert); activities (list, create); assignment (assign, history); contracts (list, create); coupons (list, create, update, use); users (create, update, permissions); visits (list, get, create, update).
  - Admin UI: quotes (list + detail); pipeline (Kanban); visits (list + detail); user detail (edit); coupons; settings; opcional: quote público.

Implementação será feita na ordem: APIs (customers ? projects ? pipeline ? quotes ? restante) e depois as páginas admin faltantes.
