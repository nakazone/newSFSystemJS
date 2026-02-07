# Deploy do Sistema (CRM) no Netlify

## Netlify tem banco de dados?

**Nao.** O Netlify nao oferece banco de dados. Ele so hospeda o app (front + serverless/Next.js). Voce precisa de um **banco MySQL externo** e configurar a URL no Netlify.

---

## Passo a passo

### 1. Ter um banco MySQL na nuvem

Escolha um provedor e crie um banco MySQL (ou compativel). Exemplos:

| Provedor | Observacao |
|----------|------------|
| **Railway** | [railway.app](https://railway.app) – plano free com MySQL; cria o projeto e add “MySQL”. |
| **Aiven** | [aiven.io](https://aiven.io) – trial gratuito. |
| **PlanetScale** | [planetscale.com](https://planetscale.com) – MySQL compativel (plano pago; free foi descontinuado). |
| **Hostinger / outro hosting** | Se ja tiver hospedagem com MySQL, use o usuario/senha/host que eles fornecem. |

Anote: **host**, **porta** (geralmente 3306), **usuario**, **senha** e **nome do banco**.

A **connection string** fica assim:

```
mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO
```

(Se a URL for para uso em variavel de ambiente, troque caracteres especiais na senha por encoding, ex.: `@` por `%40`.)

---

### 2. Criar o site no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com) e faca login.
2. **Add new site** > **Import an existing project** e conecte o repositorio Git (GitHub/GitLab/Bitbucket).
3. **Build settings** (importante):
   - **Base directory:** `apps/system`
   - **Build command:** `npm run build`
   - **Deixar** “Publish directory” em branco (o plugin Next.js cuida disso).

Se estiver usando o `netlify.toml` na **raiz do monorepo**, o Base directory pode ser preenchido automaticamente por esse arquivo.

---

### 3. Variaveis de ambiente no Netlify

Em **Site configuration** > **Environment variables** > **Add variable** (ou **Add env vars**), adicione:

| Variavel | Valor | Obrigatorio |
|----------|--------|-------------|
| `DATABASE_URL` | `mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO` (use a URL do passo 1) | Sim |
| `ADMIN_PASSWORD` | Senha de login do sistema (ex.: a que voce usa no .env local) | Sim |
| `SESSION_SECRET` | Uma string longa e aleatoria (para assinar o cookie de sessao) | Recomendado |

Depois salve e faca um **Trigger deploy** (redeploy) para as variaveis serem usadas no build e em runtime.

---

### 4. Rodar as migrations no banco

O Netlify **nao** roda migrations automaticamente. Uma vez criado o banco:

- Rode as migrations **na sua maquina** (ou em outro ambiente que acesse o mesmo banco), por exemplo:

  ```bash
  cd apps/system
  # Coloque no .env a mesma DATABASE_URL que usou no Netlify
  npx prisma db push
  # ou
  npx prisma migrate deploy
  ```

- Opcional: criar o usuario admin:

  ```bash
  npm run create-admin
  ```

Assim as tabelas e o usuario existem antes do primeiro acesso no Netlify.

---

### 5. Deploy

- **Deploy automatico:** a cada push na branch que o Netlify esta observando, o build roda de novo (com Base directory `apps/system` e o comando `npm run build`).
- Apos o deploy, a URL do sistema sera algo como:
  - `https://SEU-SITE.netlify.app/system`
  - `https://SEU-SITE.netlify.app/system/login`

---

## Resumo

- **Netlify nao tem banco:** voce usa um MySQL externo e configura `DATABASE_URL`.
- **Base directory:** `apps/system`.
- **Build:** `npm run build` (ja inclui `prisma generate`).
- **Env vars:** `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
- **Migrations e usuario admin:** rode localmente (ou em outro lugar) contra o mesmo banco antes de testar no Netlify.

Se algo falhar no deploy, confira os logs de build no Netlify e a documentacao do [Next.js no Netlify](https://docs.netlify.com/frameworks/nextjs/).
