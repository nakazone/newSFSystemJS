# 🚀 Guia Completo de Deploy - Next.js (Senior Floors)

Este guia detalha como fazer o deploy do site Next.js em **www.senior-floors.com/newsite**.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Código no GitHub: https://github.com/nakazone/newSF.git
- ✅ Conta na plataforma escolhida (Vercel, Netlify, Hostinger, etc.)
- ✅ Domínio configurado: `senior-floors.com`
- ✅ Node.js 18+ instalado localmente (para testes)

---

## 🔧 Preparação Pré-Deploy

### 1. Verificar configurações

O arquivo `next.config.js` já está configurado com:

```javascript
basePath: '/newsite'  // Site será servido em /newsite
```

**Não altere** isso se quiser manter a URL `www.senior-floors.com/newsite`.

### 2. Variáveis de ambiente necessárias

Crie um arquivo `.env.production` na raiz do projeto (ou configure no painel da plataforma):

```env
# URL do site (obrigatório)
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite

# Banco de dados (se usar Prisma)
DATABASE_URL="file:./prisma/dev.db"  # SQLite local
# ou para MySQL/Postgres:
# DATABASE_URL="mysql://user:password@host:3306/database"

# NextAuth (se usar admin/login)
NEXTAUTH_SECRET=seu-secret-aqui-gerar-com-openssl-rand-base64-32
NEXTAUTH_URL=https://www.senior-floors.com/newsite
```

**Gerar NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 3. Testar build localmente

Antes de fazer deploy, teste o build:

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Build de produção
npm run build

# Testar localmente
npm start
```

Acesse: **http://localhost:3000/newsite** (deve funcionar)

Se der erro, corrija antes de fazer deploy.

---

## 🌐 Opção 1: Deploy na Vercel (RECOMENDADO)

A Vercel é a plataforma oficial do Next.js e oferece deploy automático, CDN global e SSL gratuito.

### Passo 1: Criar conta e conectar repositório

1. Acesse: **https://vercel.com**
2. Faça login com GitHub (recomendado)
3. Clique em **Add New Project**
4. Importe o repositório: **nakazone/newSF**
5. Se não aparecer, clique em **Import Git Repository** e cole: `https://github.com/nakazone/newSF.git`

### Passo 2: Configurar projeto

Na tela de configuração:

**Framework Preset:** Next.js (detectado automaticamente)

**Root Directory:** Deixe em branco (raiz do repositório)

**Build Command:** `npm run build` (ou deixe padrão)

**Output Directory:** `.next` (padrão)

**Install Command:** `npm install` (padrão)

### Passo 3: Variáveis de ambiente

Na seção **Environment Variables**, adicione:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.senior-floors.com/newsite` | Production, Preview, Development |
| `DATABASE_URL` | `sua-string-de-conexao` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `seu-secret-gerado` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://www.senior-floors.com/newsite` | Production |

**Para banco de dados na Vercel:**

- **Opção A:** Vercel Postgres (pago, mas integrado)
  - No projeto Vercel → **Storage** → **Create Database** → **Postgres**
  - Copie a `DATABASE_URL` gerada

- **Opção B:** Vercel Blob (para SQLite)
  - Use um banco externo ou SQLite em disco (limitado)

- **Opção C:** Banco externo (MySQL/Postgres da Hostinger)
  - Configure a `DATABASE_URL` apontando para o banco externo

### Passo 4: Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-5 minutos)
3. Ao terminar, você terá uma URL: `seu-projeto.vercel.app/newsite`

### Passo 5: Configurar domínio customizado

Para usar `www.senior-floors.com/newsite`:

**Opção A: Subdomínio (mais fácil)**

1. No projeto Vercel → **Settings** → **Domains**
2. Adicione: `newsite.senior-floors.com`
3. Configure DNS no seu provedor:
   - Tipo: `CNAME`
   - Nome: `newsite`
   - Valor: `cname.vercel-dns.com`
4. No `next.config.js`, remova temporariamente `basePath: '/newsite'` ou use `basePath: ''`
5. URL final: **https://newsite.senior-floors.com**

**Opção B: Subpasta `/newsite` (requer proxy reverso)**

Para manter exatamente `www.senior-floors.com/newsite`:

1. Configure um proxy reverso no servidor principal (Hostinger)
2. O proxy redireciona `/newsite/*` para `seu-projeto.vercel.app/newsite/*`
3. Mantenha `basePath: '/newsite'` no `next.config.js`

**Configuração Nginx para proxy (se tiver VPS):**

```nginx
location /newsite {
    proxy_pass https://seu-projeto.vercel.app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host seu-projeto.vercel.app;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

### Passo 6: Seed do banco (se usar Prisma)

Após o primeiro deploy, rode o seed:

1. No projeto Vercel → **Deployments** → clique no último deploy → **Functions** → abra o terminal
2. Ou use Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.production
npx prisma db push
npx prisma db seed
```

### Passo 7: Deploy automático

A partir de agora, **todo push para `main`** no GitHub faz deploy automático na Vercel.

```bash
git add .
git commit -m "Sua alteração"
git push origin main
```

---

## 🌐 Opção 2: Deploy na Netlify

A Netlify também oferece deploy fácil para Next.js.

### Passo 1: Criar conta e conectar repositório

1. Acesse: **https://netlify.com**
2. Faça login com GitHub
3. Clique em **Add new site** → **Import an existing project**
4. Conecte o repositório: **nakazone/newSF**

### Passo 2: Configurar build

**Build command:**

```bash
npm install && npx prisma generate && npm run build
```

**Publish directory:**

```
.next
```

**Ou use o preset Next.js:**

- Clique em **Show advanced**
- **New site from Git** → selecione **Next.js** como preset

### Passo 3: Variáveis de ambiente

**Site settings** → **Environment variables** → **Add variable**:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.senior-floors.com/newsite` |
| `DATABASE_URL` | `sua-string-de-conexao` |
| `NEXTAUTH_SECRET` | `seu-secret` |
| `NEXTAUTH_URL` | `https://www.senior-floors.com/newsite` |

### Passo 4: Configurar domínio

1. **Site settings** → **Domain management** → **Add custom domain**
2. Adicione: `newsite.senior-floors.com`
3. Configure DNS:
   - Tipo: `CNAME`
   - Nome: `newsite`
   - Valor: `seu-site.netlify.app`
4. Aguarde validação (pode levar alguns minutos)

### Passo 5: Deploy

1. Clique em **Deploy site**
2. Aguarde o build
3. Acesse: `seu-site.netlify.app/newsite` ou `newsite.senior-floors.com`

---

## 🏠 Opção 3: Deploy na Hostinger (Node.js)

A Hostinger oferece planos com Node.js gerenciado (Business/Cloud) ou VPS.

### 3A. Hostinger com Node.js Gerenciado

Se o seu plano tem **Node.js**:

#### Passo 1: Criar aplicação Node.js

1. **hPanel** → **Websites** → seu domínio → **Node.js** (ou **Advanced** → **Node.js**)
2. Clique em **Create Node.js App**
3. Preencha:
   - **App Name:** `senior-floors-newsite`
   - **Node Version:** 18 ou 20
   - **App Mode:** Production

#### Passo 2: Conectar repositório Git

**Opção A: Via Git**

1. Em **Source**, selecione **Git Repository**
2. Cole: `https://github.com/nakazone/newSF.git`
3. **Branch:** `main`
4. **Auto Deploy:** Ativado (deploy automático ao fazer push)

**Opção B: Via ZIP**

1. Baixe o projeto do GitHub como ZIP
2. Em **Source**, selecione **Upload Files**
3. Faça upload do ZIP e extraia

#### Passo 3: Configurar build

**Build Command:**

```bash
npm install && npx prisma generate && npm run build
```

**Start Command:**

```bash
npm start
```

**Working Directory:** Deixe em branco (raiz)

#### Passo 4: Variáveis de ambiente

No painel da aplicação, **Environment Variables**:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.senior-floors.com/newsite` |
| `DATABASE_URL` | `mysql://user:pass@host:3306/database` |
| `NEXTAUTH_SECRET` | `seu-secret` |
| `NEXTAUTH_URL` | `https://www.senior-floors.com/newsite` |

**Para MySQL na Hostinger:**

1. **hPanel** → **Databases** → **MySQL Databases**
2. Crie um banco e usuário
3. Use a connection string: `mysql://usuario:senha@localhost:3306/nome_do_banco`

#### Passo 5: Configurar subpasta `/newsite`

No painel da aplicação Node.js:

- **Application URL:** Configure como `https://www.senior-floors.com/newsite`
- Ou use **Subdirectory:** `/newsite`

Se não houver essa opção, você pode:

1. Deixar rodando em um subdomínio: `newsite.senior-floors.com`
2. Remover `basePath: '/newsite'` temporariamente do `next.config.js`
3. URL final: **https://newsite.senior-floors.com**

#### Passo 6: Deploy e seed

1. Clique em **Deploy** ou **Redeploy**
2. Aguarde o build (5-10 minutos)
3. Após o deploy, rode o seed via **SSH** ou **Terminal** do painel:

```bash
cd /home/usuario/apps/senior-floors-newsite
npx prisma db push
npx prisma db seed
```

### 3B. Hostinger VPS (controle total)

No VPS você tem controle completo e pode configurar exatamente `www.senior-floors.com/newsite`.

#### Passo 1: Conectar por SSH

```bash
ssh usuario@ip-do-vps
```

Ou use o **Terminal** do painel Hostinger.

#### Passo 2: Instalar Node.js, Nginx e PM2

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# Verificar instalações
node -v  # deve mostrar v20.x
npm -v
nginx -v
pm2 -v
```

#### Passo 3: Clonar e preparar o projeto

```bash
# Criar diretório (fora de public_html)
cd /var/www
sudo git clone https://github.com/nakazone/newSF.git flooring
cd flooring

# Instalar dependências
sudo npm install

# Gerar Prisma Client
sudo npx prisma generate

# Criar arquivo .env
sudo nano .env
```

Cole no `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite
DATABASE_URL="mysql://usuario:senha@localhost:3306/database"
NEXTAUTH_SECRET=seu-secret-aqui
NEXTAUTH_URL=https://www.senior-floors.com/newsite
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

```bash
# Build
sudo npm run build

# Configurar banco
sudo npx prisma db push
sudo npx prisma db seed
```

#### Passo 4: Iniciar com PM2

```bash
# Iniciar aplicação
cd /var/www/flooring
sudo pm2 start npm --name "flooring-newsite" -- start

# Salvar configuração do PM2
sudo pm2 save

# Configurar PM2 para iniciar no boot
sudo pm2 startup
# Rode o comando que aparecer (algo como: sudo env PATH=... pm2 startup systemd -u usuario)
```

#### Passo 5: Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/senior-floors
```

Cole a configuração:

```nginx
server {
    listen 80;
    server_name www.senior-floors.com senior-floors.com;

    # Site principal (PHP/outro) na raiz
    root /var/www/html;
    index index.php index.html;

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
        
        # Timeout para builds longos
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # Configuração do site principal (ajuste conforme necessário)
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;  # Ajuste a versão do PHP
    }
}
```

Ativar o site:

```bash
sudo ln -s /etc/nginx/sites-available/senior-floors /etc/nginx/sites-enabled/
sudo nginx -t  # Testar configuração
sudo systemctl reload nginx
```

#### Passo 6: Configurar SSL (HTTPS)

No painel Hostinger:

1. **SSL** → **Let's Encrypt**
2. Selecione o domínio
3. Clique em **Install**

Depois, atualize o Nginx para usar HTTPS:

```bash
sudo nano /etc/nginx/sites-available/senior-floors
```

Altere `listen 80;` para:

```nginx
server {
    listen 443 ssl http2;
    server_name www.senior-floors.com senior-floors.com;
    
    ssl_certificate /etc/letsencrypt/live/senior-floors.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/senior-floors.com/privkey.pem;
    
    # ... resto da configuração igual ...
}

# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name www.senior-floors.com senior-floors.com;
    return 301 https://$server_name$request_uri;
}
```

Recarregue:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### Passo 7: Testar

Acesse: **https://www.senior-floors.com/newsite**

---

## 🔄 Atualizações (Deploys Seguintes)

### Vercel/Netlify (automático)

```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

O deploy acontece automaticamente.

### Hostinger Node.js Gerenciado

Se configurou **Auto Deploy**, basta fazer push:

```bash
git push origin main
```

Se não, no painel clique em **Redeploy**.

### Hostinger VPS

```bash
ssh usuario@ip-do-vps
cd /var/www/flooring
git pull origin main
npm install
npx prisma generate
npm run build
pm2 restart flooring-newsite
```

Ou crie um script:

```bash
sudo nano /var/www/flooring/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/flooring
git pull origin main
npm install
npx prisma generate
npm run build
pm2 restart flooring-newsite
echo "Deploy concluído!"
```

Tornar executável:

```bash
chmod +x /var/www/flooring/deploy.sh
```

Depois, para fazer deploy:

```bash
ssh usuario@ip-do-vps "/var/www/flooring/deploy.sh"
```

---

## 🐛 Troubleshooting

### Erro: "Module not found"

**Solução:** Rode `npm install` e `npx prisma generate` antes do build.

### Erro: "Database connection failed"

**Solução:** Verifique `DATABASE_URL` nas variáveis de ambiente. Teste a conexão:

```bash
npx prisma db pull
```

### Erro: "404 Not Found" em `/newsite`

**Solução:** Verifique se `basePath: '/newsite'` está no `next.config.js` e se `NEXT_PUBLIC_SITE_URL` está correto.

### Build falha na Vercel/Netlify

**Solução:** Verifique os logs do build. Erros comuns:

- Dependências faltando: adicione no `package.json`
- Prisma não gerado: adicione `npx prisma generate` no build command
- Memória insuficiente: upgrade do plano ou otimize o build

### Site lento após deploy

**Solução:**

- Use CDN (Vercel/Netlify já incluem)
- Otimize imagens (Next.js Image component)
- Habilite cache no Nginx (se VPS)

### Erro: "Port 3000 already in use" (VPS)

**Solução:**

```bash
# Ver o que está usando a porta
sudo lsof -i :3000

# Parar processo antigo
pm2 stop flooring-newsite
pm2 delete flooring-newsite

# Reiniciar
pm2 start npm --name "flooring-newsite" -- start
```

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados configurado e seed rodado
- [ ] Domínio apontando corretamente
- [ ] SSL/HTTPS ativo
- [ ] Site acessível em `https://www.senior-floors.com/newsite`
- [ ] Formulários funcionando
- [ ] Imagens carregando
- [ ] Deploy automático configurado (se aplicável)

---

## 📞 Suporte

- **Vercel:** https://vercel.com/support
- **Netlify:** https://www.netlify.com/support/
- **Hostinger:** https://www.hostinger.com.br/contato
- **Documentação Next.js:** https://nextjs.org/docs/deployment

---

**Status:** ✅ Guia completo criado  
**Próximo passo:** Escolher plataforma e seguir o guia correspondente
