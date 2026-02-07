# ⚡ Deploy Rápido - Next.js (Resumo)

Guia rápido para deploy do site Next.js. Para detalhes completos, veja **GUIA-DEPLOY-NEXTJS.md**.

---

## 🎯 Escolha sua plataforma

### Opção 1: Vercel (MAIS FÁCIL - Recomendado) ⭐

1. Acesse: https://vercel.com → Login com GitHub
2. **Add New Project** → Importe `nakazone/newSF`
3. Configure variáveis:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.senior-floors.com/newsite`
   - `DATABASE_URL` = sua conexão
   - `NEXTAUTH_SECRET` = gerar com `openssl rand -base64 32`
4. Clique **Deploy**
5. ✅ Pronto! Deploy automático a cada push

**Tempo:** 5-10 minutos

---

### Opção 2: Netlify

1. Acesse: https://netlify.com → Login com GitHub
2. **Add new site** → Import `nakazone/newSF`
3. Build: `npm install && npx prisma generate && npm run build`
4. Publish: `.next`
5. Variáveis: `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, etc.
6. **Deploy**

**Tempo:** 10-15 minutos

---

### Opção 3: Hostinger (Node.js)

1. **hPanel** → **Node.js** → **Create App**
2. Conecte Git: `https://github.com/nakazone/newSF.git`
3. Build: `npm install && npx prisma generate && npm run build`
4. Start: `npm start`
5. Variáveis: configure no painel
6. **Deploy**

**Tempo:** 15-20 minutos

---

### Opção 4: Hostinger VPS (Avançado)

1. SSH no VPS
2. Instalar Node.js, Nginx, PM2
3. Clonar projeto: `git clone https://github.com/nakazone/newSF.git`
4. Build: `npm install && npm run build`
5. PM2: `pm2 start npm --name "flooring" -- start`
6. Configurar Nginx proxy para `/newsite`
7. SSL via Let's Encrypt

**Tempo:** 30-60 minutos

---

## 📝 Variáveis de ambiente (todas as plataformas)

```env
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite
DATABASE_URL=sua-string-de-conexao
NEXTAUTH_SECRET=gerar-com-openssl-rand-base64-32
NEXTAUTH_URL=https://www.senior-floors.com/newsite
```

---

## 🔄 Atualizar após mudanças

```bash
git add .
git commit -m "Sua alteração"
git push origin main
```

**Vercel/Netlify:** Deploy automático  
**Hostinger:** Redeploy manual ou auto-deploy se configurado

---

## ✅ Testar localmente antes

```bash
npm install
npx prisma generate
npm run build
npm start
```

Acesse: **http://localhost:3000/newsite**

---

## 🆘 Problemas?

Veja **GUIA-DEPLOY-NEXTJS.md** → seção **Troubleshooting**

---

**Recomendação:** Use **Vercel** para começar rápido. Depois pode migrar para Hostinger se necessário.
