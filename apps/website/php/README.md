# Senior Floors – versão PHP

Versão em PHP do site para hospedagem em **Hostinger** (ou qualquer servidor com PHP). Funciona em **www.senior-floors.com/newsite**.

## Estrutura

- `config.php` – Base path (`/newsite`), URL do site, menus
- `includes/head.php`, `header.php`, `footer.php` – Layout
- `index.php` – Home
- `about.php`, `contact.php`, `free-estimate.php` – Páginas estáticas
- `services/index.php` – Lista de serviços
- `services/hardwood-refinishing.php` – Página do serviço Hardwood Refinishing
- `api/estimate.php` – Recebe o formulário de orçamento (POST)
- `data/` – Pasta para `estimates.txt` (opcional; criar com permissão de escrita)

## Antes de subir para o servidor

1. **Copiar assets do projeto Next.js para dentro da pasta PHP**
   - De `public/assets/` → copie todo o conteúdo para `php/assets/`
   - De `public/videos/` → copie todo o conteúdo para `php/videos/`
   - Assim as imagens e o vídeo do hero funcionarão.

2. **Base path**
   - Em `config.php`, `BASE_PATH` está como `'/newsite'`.
   - Se for publicar na raiz do domínio, altere para `''` e no `.htaccess` comente ou remova a linha `RewriteBase /newsite`.

## Deploy na Hostinger

1. Crie no painel a pasta (ou subdomínio) que corresponda a **/newsite** no seu domínio (ex.: `public_html/newsite`).
2. Envie **todo o conteúdo da pasta `php/`** para dentro dessa pasta (não a pasta `php` em si).
   - Exemplo: conteúdo de `php/` → `public_html/newsite/`
   - Deve haver `index.php`, `config.php`, `about.php`, pasta `services/`, pasta `api/`, pasta `includes/`, etc.
3. Garanta que `php/assets/` e `php/videos/` existam no servidor com os arquivos copiados (ver acima).
4. Permissões: a pasta `data/` (se existir) deve ter permissão de escrita (ex.: 755 ou 775) para o PHP gravar `estimates.txt`.

## URLs após o deploy

- Home: `https://www.senior-floors.com/newsite/` ou `https://www.senior-floors.com/newsite/index.php`
- About: `https://www.senior-floors.com/newsite/about` ou `.../about.php`
- Contact: `.../contact`
- Free estimate: `.../free-estimate`
- Services: `.../services/`
- Hardwood Refinishing: `.../services/hardwood-refinishing`

Se o servidor tiver `mod_rewrite` e o `.htaccess` estiver ativo, as URLs sem `.php` (ex.: `/about`) podem funcionar; senão, use `/about.php`.

## Formulário de orçamento

- O POST é enviado para `api/estimate.php`.
- Os dados são validados e, opcionalmente, salvos em `data/estimates.txt`.
- Depois do envio, o usuário é redirecionado para `free-estimate?sent=1` (página de agradecimento).
- Para receber por email, descomente e configure a linha `mail(...)` em `api/estimate.php`.

## Adicionar outros serviços

- Copie `services/hardwood-refinishing.php` para algo como `services/hardwood-installation.php`.
- Ajuste título, descrição, passos e benefícios dentro do arquivo.
- O link no menu já aponta para `/services/hardwood-installation` (definido em `config.php`).
