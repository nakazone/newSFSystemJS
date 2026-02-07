# 🚀 Deploy Rápido - Senior Floors

## Método mais rápido: File Manager da Hostinger

### Passo 1: Preparar arquivos localmente
✅ **Já está pronto!** Todos os arquivos estão na pasta `php/` e no GitHub.

### Passo 2: Acessar Hostinger
1. Acesse: https://hpanel.hostinger.com
2. Faça login
3. Vá em **Files** → **File Manager**

### Passo 3: Criar pasta `/newsite`
1. Navegue até `public_html` (ou `domains/senior-floors.com/public_html`)
2. Clique em **New Folder**
3. Nome: `newsite`
4. Clique em **Create**

### Passo 4: Baixar do GitHub
**Opção A: Via ZIP (mais fácil)**
1. Acesse: https://github.com/nakazone/newSF/archive/refs/heads/main.zip
2. Baixe o arquivo ZIP
3. Extraia localmente
4. Entre na pasta `newSF-main/php/`
5. Selecione **TODOS** os arquivos e pastas dentro de `php/`:
   - `index.php`, `config.php`, `about.php`, `contact.php`, etc.
   - Pasta `includes/`
   - Pasta `services/`
   - Pasta `api/`
   - Pasta `data/`
   - Pasta `assets/`
   - Pasta `videos/`
   - Pasta `flooring/`
   - Arquivo `.htaccess`

**Opção B: Via Git (se tiver SSH)**
```bash
cd public_html/newsite
git clone https://github.com/nakazone/newSF.git temp
mv temp/php/* .
mv temp/php/.* . 2>/dev/null || true
rm -rf temp
```

### Passo 5: Upload no File Manager
1. No File Manager, entre na pasta `public_html/newsite`
2. Clique em **Upload**
3. Arraste todos os arquivos selecionados OU clique em **Select Files** e escolha todos
4. Aguarde o upload terminar (pode demorar alguns minutos)

### Passo 6: Configurar permissões
1. Selecione a pasta `data/`
2. Botão direito → **Change Permissions**
3. Defina: **755** ou **775**
4. Clique em **Change**

### Passo 7: Testar
Acesse: **https://www.senior-floors.com/newsite/**

✅ Deve aparecer a home do site!

---

## ✅ Checklist de verificação

- [ ] Pasta `newsite` criada em `public_html`
- [ ] Todos os arquivos PHP enviados
- [ ] Pasta `assets/` com imagens (project1.jpg, project2.jpg, etc.)
- [ ] Pasta `videos/` com `bg_seniorFloors.mp4`
- [ ] Arquivo `.htaccess` enviado
- [ ] Pasta `data/` com permissão 755 ou 775
- [ ] Site acessível em `https://www.senior-floors.com/newsite/`

---

## 🔧 Se algo não funcionar

### Erro 404
- Verifique se `index.php` está em `public_html/newsite/`
- Verifique se `.htaccess` foi enviado

### Imagens não aparecem
- Verifique se `assets/` está em `public_html/newsite/assets/`
- Verifique se os arquivos de imagem estão dentro

### Formulário não funciona
- Verifique permissões da pasta `data/` (755)
- Verifique se `api/estimate.php` existe

---

## 📞 Próximos passos

1. Teste todas as páginas principais
2. Teste o formulário de contato
3. Verifique se as imagens carregam
4. Verifique se o vídeo do hero funciona

**Tudo pronto!** 🎉
