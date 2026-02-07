# 🚀 Como Fazer o Deploy - Guia Completo

## ✅ Pacote Pronto Criado!

O arquivo **`deploy-package.zip`** (23MB) está pronto com todos os arquivos necessários.

---

## 🎯 Método 1: File Manager (MAIS FÁCIL - Recomendado)

### Passo 1: Acessar Hostinger
1. Acesse: **https://hpanel.hostinger.com**
2. Faça login
3. Vá em **Files** → **File Manager**

### Passo 2: Criar pasta `/newsite`
1. Navegue até `public_html` (ou `domains/senior-floors.com/public_html`)
2. Clique em **New Folder**
3. Nome: `newsite`
4. Clique em **Create**

### Passo 3: Upload do ZIP
1. Entre na pasta `public_html/newsite`
2. Clique em **Upload**
3. Selecione o arquivo **`deploy-package.zip`** (está na pasta do projeto)
4. Aguarde o upload terminar

### Passo 4: Extrair o ZIP
1. Após upload, clique com botão direito no arquivo `deploy-package.zip`
2. Selecione **Extract** ou **Unzip**
3. Escolha "Extract here" ou "Extract to newsite/"
4. Aguarde a extração
5. **Delete o arquivo ZIP** após extrair

### Passo 5: Configurar permissões
1. Selecione a pasta `data/`
2. Botão direito → **Change Permissions**
3. Defina: **755**
4. Clique em **Change**

### Passo 6: Testar
Acesse: **https://www.senior-floors.com/newsite/**

✅ **Pronto!** O site deve estar funcionando!

---

## 🔧 Método 2: Script Automatizado (FTP)

Se você tem credenciais FTP:

### Opção A: Script Python
```bash
python3 deploy-ftp.py
```
Siga as instruções e forneça:
- Host FTP (ex: ftp.senior-floors.com)
- Username FTP
- Password FTP
- Caminho remoto (ex: /public_html/newsite)

### Opção B: Script Shell
```bash
./deploy-ftp.sh
```

**Nota:** Após o upload via FTP, você ainda precisa:
1. Extrair o ZIP no servidor (se enviou ZIP)
2. Configurar permissões da pasta `data/` (755)

---

## 📋 Checklist de Verificação

Após o deploy, verifique:

- [ ] Pasta `newsite` existe em `public_html`
- [ ] Arquivo `index.php` está em `public_html/newsite/`
- [ ] Arquivo `.htaccess` foi enviado
- [ ] Pasta `assets/` existe com imagens
- [ ] Pasta `videos/` existe com `bg_seniorFloors.mp4`
- [ ] Pasta `data/` tem permissão 755
- [ ] Site acessível em `https://www.senior-floors.com/newsite/`

---

## 🧪 Testes Pós-Deploy

Teste estas URLs:

1. ✅ **Home:** https://www.senior-floors.com/newsite/
2. ✅ **About:** https://www.senior-floors.com/newsite/about
3. ✅ **Contact:** https://www.senior-floors.com/newsite/contact
4. ✅ **Services:** https://www.senior-floors.com/newsite/services/
5. ✅ **Hardwood Refinishing:** https://www.senior-floors.com/newsite/services/hardwood-refinishing
6. ✅ **Portfolio:** https://www.senior-floors.com/newsite/portfolio
7. ✅ **Formulário:** Preencha em `/free-estimate` e teste

---

## 🆘 Problemas Comuns

### ❌ Erro 404 ao acessar `/newsite`
- Verifique se a pasta `newsite` existe em `public_html`
- Verifique se `index.php` está dentro de `public_html/newsite/`
- Verifique se `.htaccess` foi enviado

### ❌ Imagens não aparecem
- Verifique se a pasta `assets/` existe em `public_html/newsite/assets/`
- Verifique se os arquivos de imagem estão dentro (project1.jpg, project2.jpg, etc.)

### ❌ Vídeo do hero não aparece
- Verifique se a pasta `videos/` existe em `public_html/newsite/videos/`
- Verifique se `bg_seniorFloors.mp4` está dentro

### ❌ Formulário não funciona
- Verifique permissões da pasta `data/` (deve ser 755)
- Verifique se `api/estimate.php` existe
- Verifique se a pasta `data/` existe

### ❌ URLs com `.php` aparecem
- Verifique se `.htaccess` foi enviado
- Verifique se `mod_rewrite` está ativo (contate suporte Hostinger se necessário)

---

## 📞 Suporte

- **Hostinger:** https://www.hostinger.com.br/contato
- **Documentação:** Veja `HOSTINGER-DEPLOY.md` para mais detalhes

---

## 🎉 Status

✅ **Pacote criado:** `deploy-package.zip` (23MB)  
✅ **Código no GitHub:** https://github.com/nakazone/newSF.git  
✅ **Pronto para deploy!**

**Próximo passo:** Fazer upload do ZIP no File Manager da Hostinger
