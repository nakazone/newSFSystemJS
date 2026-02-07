# 🚀 Deploy Automatizado - Senior Floors

## 📦 Pacote Pronto Criado

Foi criado um arquivo ZIP: `deploy-package.zip` com todos os arquivos necessários.

---

## ⚡ Deploy Rápido (3 passos)

### Passo 1: Baixar o ZIP
O arquivo `deploy-package.zip` já está pronto no seu computador.

### Passo 2: Acessar Hostinger File Manager
1. Acesse: https://hpanel.hostinger.com
2. Login → **Files** → **File Manager**
3. Navegue até `public_html`
4. Crie a pasta `newsite` (se não existir)

### Passo 3: Upload e Extrair
1. Entre na pasta `public_html/newsite`
2. Clique em **Upload**
3. Envie o arquivo `deploy-package.zip`
4. Após upload, clique com botão direito no ZIP → **Extract**
5. Selecione "Extract here" ou "Extract to newsite/"
6. Delete o arquivo ZIP após extrair

### Passo 4: Permissões
1. Selecione a pasta `data/`
2. Botão direito → **Change Permissions** → **755**
3. Clique em **Change**

### Passo 5: Testar
Acesse: **https://www.senior-floors.com/newsite/**

---

## 🔄 Alternativa: Via Git (se tiver SSH)

Se você tiver acesso SSH na Hostinger:

```bash
cd public_html
mkdir -p newsite
cd newsite
git clone https://github.com/nakazone/newSF.git temp
cp -r temp/php/* .
cp -r temp/php/.* . 2>/dev/null || true
rm -rf temp
chmod 755 data/
```

---

## ✅ Verificação Pós-Deploy

Teste estas URLs:
- ✅ https://www.senior-floors.com/newsite/
- ✅ https://www.senior-floors.com/newsite/about
- ✅ https://www.senior-floors.com/newsite/contact
- ✅ https://www.senior-floors.com/newsite/services/
- ✅ https://www.senior-floors.com/newsite/services/hardwood-refinishing
- ✅ Formulário em /free-estimate

---

## 🆘 Problemas?

### Erro 404
- Verifique se `index.php` está em `public_html/newsite/`
- Verifique se `.htaccess` foi extraído

### Imagens não aparecem
- Verifique se `assets/` está em `public_html/newsite/assets/`
- Verifique se os arquivos estão dentro da pasta

### Formulário não funciona
- Verifique permissões da pasta `data/` (deve ser 755)
- Verifique se `api/estimate.php` existe

---

**Status:** ✅ Pacote pronto para upload  
**Próximo passo:** Fazer upload do ZIP no File Manager da Hostinger
