# Deploy do site (www.senior-floors.com/newsite)

Há duas versões do site:

1. **Next.js** (pasta raiz) – requer Node.js na Hostinger (planos com Node.js ou VPS).
2. **PHP** (pasta `php/`) – roda em qualquer hospedagem com PHP (Hostinger shared, etc.). **Recomendado se você não tiver Node.js.**

Para usar a **versão PHP**, siga o **README na pasta `php/`** (`php/README.md`): copie o conteúdo de `php/` para a pasta `/newsite` no servidor (ex.: `public_html/newsite`) e copie também `public/assets` e `public/videos` para dentro de `php/assets` e `php/videos` antes de enviar.

---

O restante deste documento descreve o deploy da versão **Next.js**.

## 1. Inicializar Git e fazer o primeiro push

No terminal, na pasta do projeto:

```bash
cd /Users/naka/flooring-website

# Inicializar repositório
git init

# Adicionar todos os arquivos (respeitando .gitignore)
git add .

# Primeiro commit
git commit -m "Initial commit: Senior Floors website (newsite)"

# Adicionar o remote do GitHub/GitLab (substitua pela URL do seu repositório)
git remote add origin https://github.com/SEU-USUARIO/flooring-website.git

# Enviar para a branch main
git branch -M main
git push -u origin main
```

Se o repositório já existir e tiver conteúdo:

```bash
git remote add origin https://github.com/SEU-USUARIO/flooring-website.git
git branch -M main
git push -u origin main
```

## 2. Variáveis de ambiente no deploy

No painel da sua plataforma (Vercel, Netlify, etc.), configure:

| Variável | Valor |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.senior-floors.com/newsite` |

Para banco de dados e auth, se usar:

- `DATABASE_URL` – connection string do banco (ex.: SQLite em Vercel Blob ou Postgres)
- `NEXTAUTH_SECRET` – segredo para sessões
- `NEXTAUTH_URL` – `https://www.senior-floors.com/newsite`

## 3. Deploy na Vercel (recomendado para Next.js)

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. **Add New** → **Project** e importe o repositório Git.
3. Em **Root Directory** deixe em branco.
4. Em **Environment Variables** adicione `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com/newsite`.
5. Deploy. A Vercel gera uma URL (ex. `seu-projeto.vercel.app`); o app já usa `/newsite` por causa do `basePath`.

Para servir em **www.senior-floors.com/newsite**:

- No domínio principal (senior-floors.com), configure no **DNS ou no servidor** um proxy/reverse proxy para a URL do projeto Vercel, com path `/newsite`, **ou**
- Use **Vercel Custom Domain** e configure um subdomínio (ex. `newsite.senior-floors.com`) se preferir; para manter exatamente `www.senior-floors.com/newsite` é necessário proxy no domínio principal.

## 4. Deploy na Netlify

1. Acesse [netlify.com](https://netlify.com), **Add new site** → **Import an existing project** e conecte o Git.
2. Build command: `npm run build` (ou `npx prisma generate && npm run build` se usar Prisma).
3. Publish directory: `.next` (para Next.js standalone) ou use o preset **Next.js** da Netlify.
4. Adicione `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com/newsite` em **Site settings** → **Environment variables**.

## 5. Deploy na Hostinger

O site será hospedado na **Hostinger**. Há duas formas principais de publicar um app Next.js lá.

### Opção A: Node.js gerenciado (planos Business ou Cloud)

Se o seu plano tem **Node.js** (Hostinger detecta e oferece “Node.js Web App”):

1. **Painel Hostinger** → **Websites** → seu domínio → **Node.js** (ou **Advanced** → **Node.js**).
2. **Criar aplicação Node.js**:
   - Conecte o **repositório Git** (GitHub/GitLab) ou envie um **ZIP** do projeto.
   - Branch: `main`.
   - **Build command:** `npm install && npx prisma generate && npm run build`
   - **Start command:** `npm start` (ou `node .next/standalone/server.js` se usar output standalone — veja abaixo).
   - **Node version:** 18 ou 20.
3. **Variáveis de ambiente** no painel da aplicação:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com/newsite`
   - `DATABASE_URL` = connection string do banco (Hostinger oferece MySQL; para Prisma você pode usar MySQL ou um SQLite em disco se o plano permitir).
   - `NEXTAUTH_SECRET` e `NEXTAUTH_URL` = `https://www.senior-floors.com/newsite` (se usar login/admin).
4. **Subpasta /newsite:**  
   No painel, veja se é possível definir a aplicação para rodar em um **subpath** (ex.: `/newsite`). Se só for possível em subdomínio (ex.: `newsite.senior-floors.com`), use esse subdomínio e, no `next.config.js`, remova temporariamente o `basePath` ou use `basePath: ''` para esse deploy — a URL final será `https://newsite.senior-floors.com`.  
   Se o painel permitir “Application URL” ou “Subdirectory”, configure como `https://www.senior-floors.com/newsite` e mantenha `basePath: '/newsite'`.

Depois do primeiro deploy, rode o seed do banco (se usar Prisma) via **SSH** ou **Terminal** do painel (se existir):

```bash
npx prisma db push
npx prisma db seed
```

### Opção B: VPS Hostinger (controle total, URL www.senior-floors.com/newsite)

No **VPS** você controla Nginx e o processo Node. Assim o app pode ficar exatamente em **www.senior-floors.com/newsite**.

1. **Conectar por SSH** ao VPS (usuário e IP fornecidos pela Hostinger).
2. **Instalar Node.js** (ex.: 20.x), Git, Nginx e PM2:

```bash
# Exemplo em Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2
```

3. **Clonar o projeto e buildar** (em um diretório fora de `public_html`, ex.: `/var/www/flooring`):

```bash
cd /var/www
sudo git clone https://github.com/SEU-USUARIO/flooring-website.git flooring
cd flooring
sudo npm install
sudo npx prisma generate
# Configure .env com DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite
sudo npm run build
sudo npx prisma db push
sudo npx prisma db seed
```

4. **Iniciar com PM2** (Next.js escuta na porta 3000 por padrão):

```bash
sudo npm start
# Ou, para manter rodando com PM2:
sudo pm2 start npm --name "flooring" -- start
sudo pm2 save
sudo pm2 startup
```

5. **Configurar Nginx** para que `www.senior-floors.com/newsite` repasse para o Node. Crie um arquivo em `/etc/nginx/sites-available/senior-floors` (ou edite o existente):

```nginx
server {
    listen 80;
    server_name www.senior-floors.com senior-floors.com;

    # Site principal (PHP/outro) na raiz
    root /var/www/html;
    index index.php index.html;
    # ... configuração existente do site principal ...

    # Next.js em /newsite
    location /newsite {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative o site e recarregue o Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/senior-floors /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6. **SSL (HTTPS)** na Hostinger costuma ser pelo painel (Let’s Encrypt). Depois de ativar, ajuste o `server` para `listen 443 ssl` e as diretivas `ssl_*` que o painel tiver criado; o `location /newsite` continua igual.

### Banco de dados na Hostinger

- **Shared/Business:** normalmente MySQL. No Prisma você pode usar o driver `mysql` e `DATABASE_URL` no formato MySQL. Se quiser manter SQLite, verifique se o plano permite escrita em disco no diretório do app.
- **VPS:** pode usar SQLite (arquivo no servidor), MySQL ou Postgres instalado no próprio VPS.

Mantenha sempre no `.env` do servidor:

- `NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite`
- `DATABASE_URL=...`
- `NEXTAUTH_URL=https://www.senior-floors.com/newsite` (se usar admin)

---

## 6. Atualizações (deploys seguintes)

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

- **Vercel/Netlify:** o deploy é refeito automaticamente ao dar push.
- **Hostinger Node.js gerenciado:** o painel pode ter “Redeploy” ou integração com Git (push na branch configurada).
- **Hostinger VPS:** após o push, no servidor rode `cd /var/www/flooring && git pull && npm install && npm run build && pm2 restart flooring` (ou o nome do processo no PM2).

---

**Resumo:** O projeto está preparado com `basePath: '/newsite'`. Para Hostinger use Node.js gerenciado (se o plano tiver) ou VPS com Nginx e PM2; configure sempre `NEXT_PUBLIC_SITE_URL` e o banco (MySQL/SQLite/Postgres) conforme o seu plano.
