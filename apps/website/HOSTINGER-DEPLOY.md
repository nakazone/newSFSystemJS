# Deploy na Hostinger – Guia Completo

Este guia mostra como fazer o deploy do site **www.senior-floors.com/newsite** na Hostinger.

## 📋 Pré-requisitos

- Conta na Hostinger com domínio `senior-floors.com` configurado
- Acesso ao **File Manager** ou **FTP** da Hostinger
- Repositório Git: https://github.com/nakazone/newSF.git

---

## 🚀 Opção 1: Deploy via File Manager (mais fácil)

### Passo 1: Acessar o File Manager

1. Faça login no **hPanel** da Hostinger
2. Vá em **Files** → **File Manager**
3. Navegue até `public_html` (ou `domains/senior-floors.com/public_html`)

### Passo 2: Criar a pasta `/newsite`

1. Clique em **New Folder**
2. Nome: `newsite`
3. Clique em **Create**

### Passo 3: Baixar o código do GitHub

**Opção A: Via Git no servidor (se tiver SSH)**

```bash
cd public_html/newsite
git clone https://github.com/nakazone/newSF.git .
# Isso vai baixar tudo, mas precisamos só da pasta php/
```

**Opção B: Baixar ZIP do GitHub**

1. Acesse: https://github.com/nakazone/newSF/archive/refs/heads/main.zip
2. Baixe o ZIP
3. Extraia localmente
4. Entre na pasta `newSF-main/php/`
5. Selecione **todos os arquivos e pastas** dentro de `php/`:
   - `index.php`
   - `config.php`
   - `about.php`
   - `contact.php`
   - `free-estimate.php`
   - `.htaccess`
   - Pasta `includes/`
   - Pasta `services/`
   - Pasta `api/`
   - Pasta `data/`
   - Pasta `assets/` (se existir)
   - Pasta `videos/` (se existir)

### Passo 4: Enviar arquivos para Hostinger

1. No File Manager, entre na pasta `public_html/newsite`
2. Clique em **Upload**
3. Arraste todos os arquivos da pasta `php/` ou use **Select Files**
4. Aguarde o upload terminar

### Passo 5: Copiar assets (imagens e vídeos)

Se os assets não foram copiados automaticamente:

1. No File Manager, vá para `public_html/newsite`
2. Crie as pastas `assets` e `videos` se não existirem
3. Faça upload dos arquivos:
   - De `public/assets/` → `public_html/newsite/assets/`
   - De `public/videos/` → `public_html/newsite/videos/`

**Arquivos necessários:**
- `assets/logoSeniorFloors.png`
- `assets/project1.jpg`
- `assets/project2.jpg`
- `assets/project3.jpg`
- `assets/project4.jpg`
- `videos/bg_seniorFloors.mp4`

### Passo 6: Configurar permissões

1. Selecione a pasta `data/`
2. Clique com botão direito → **Change Permissions**
3. Defina como **755** ou **775** (permissão de escrita)
4. Clique em **Change**

### Passo 7: Testar o site

Acesse: **https://www.senior-floors.com/newsite/**

Se aparecer erro, verifique:
- ✅ Arquivo `index.php` existe em `public_html/newsite/`
- ✅ Arquivo `.htaccess` foi enviado
- ✅ Pasta `assets/` tem as imagens
- ✅ Permissões da pasta `data/` estão corretas

---

## 🔧 Opção 2: Deploy via FTP

### Passo 1: Obter credenciais FTP

1. No hPanel → **Files** → **FTP Accounts**
2. Anote: **Host**, **Username**, **Password**
3. Ou use o **FileZilla** ou outro cliente FTP

### Passo 2: Conectar via FTP

- **Host:** ftp.senior-floors.com (ou o fornecido pela Hostinger)
- **Username:** seu usuário FTP
- **Password:** sua senha FTP
- **Port:** 21 (ou 22 para SFTP)

### Passo 3: Navegar e criar pasta

1. Conecte e vá para `/public_html`
2. Crie a pasta `newsite` se não existir

### Passo 4: Enviar arquivos

1. Entre na pasta `newsite`
2. Envie **todo o conteúdo** da pasta `php/` do projeto:
   - Todos os `.php`
   - Pasta `includes/`
   - Pasta `services/`
   - Pasta `api/`
   - Pasta `data/`
   - Arquivo `.htaccess`
   - Pasta `assets/` (com imagens)
   - Pasta `videos/` (com vídeo)

### Passo 5: Configurar permissões via FTP

- Pasta `data/`: **755** ou **775**

---

## ⚙️ Configurações importantes

### 1. Verificar `.htaccess`

O arquivo `.htaccess` já está configurado com:
```apache
RewriteBase /newsite
```

Se o site não funcionar com URLs limpas (sem `.php`), verifique se `mod_rewrite` está ativo na Hostinger.

### 2. Verificar `config.php`

O arquivo já está configurado:
```php
define('BASE_PATH', '/newsite');
define('SITE_URL', 'https://www.senior-floors.com/newsite');
```

**Não precisa alterar** se o site estiver em `/newsite`.

### 3. Formulário de contato

O formulário salva em `data/estimates.txt`. Para receber por email:

1. Edite `api/estimate.php`
2. Descomente a linha:
   ```php
   mail(EMAIL, 'New Estimate Request from ' . $name, "Name: $name\nEmail: $email\nPhone: $phone\nService: $service");
   ```

---

## 🧪 Testes após deploy

1. **Home:** https://www.senior-floors.com/newsite/
2. **About:** https://www.senior-floors.com/newsite/about
3. **Contact:** https://www.senior-floors.com/newsite/contact
4. **Services:** https://www.senior-floors.com/newsite/services/
5. **Hardwood Refinishing:** https://www.senior-floors.com/newsite/services/hardwood-refinishing
6. **Formulário:** Preencha o formulário em `/free-estimate` e verifique se aparece a mensagem de sucesso

---

## 🔄 Atualizações futuras

Quando fizer mudanças no código:

1. **Commit e push no Git:**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin main
   ```

2. **Atualizar no servidor:**
   - **File Manager:** Delete os arquivos antigos e faça upload dos novos
   - **FTP:** Substitua os arquivos modificados
   - **Git (se tiver SSH):** `cd public_html/newsite && git pull`

---

## ❓ Problemas comuns

### Erro 404 ao acessar `/newsite`

- Verifique se a pasta `newsite` existe em `public_html`
- Verifique se `index.php` está dentro de `public_html/newsite/`

### Imagens não aparecem

- Verifique se a pasta `assets/` existe em `public_html/newsite/`
- Verifique se os arquivos de imagem estão dentro de `assets/`

### Formulário não funciona

- Verifique permissões da pasta `data/` (755 ou 775)
- Verifique se `api/estimate.php` existe e tem permissão de leitura

### URLs com `.php` aparecem

- Verifique se `.htaccess` foi enviado
- Verifique se `mod_rewrite` está ativo (contate suporte Hostinger se necessário)

---

## 📞 Suporte

- **Hostinger:** https://www.hostinger.com.br/contato
- **Documentação PHP:** Veja `php/README.md` no projeto

---

**Status:** ✅ Código pronto no GitHub  
**Próximo passo:** Fazer upload dos arquivos da pasta `php/` para `public_html/newsite/`
