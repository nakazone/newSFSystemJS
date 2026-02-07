# Ver o PHP no localhost

**Se aparecer erro ao rodar:** PHP pode não estar instalado. Veja **COMO-RODAR-LOCALHOST.md** para instalar.

Para rodar a versão PHP localmente e comparar com o Next.js:

## Opção 1: Script (recomendado)

Na pasta do projeto (raiz), execute:

```bash
./php/start-local-server.sh
```

Ou a partir da pasta `php/`:

```bash
cd php
./start-local-server.sh
```

## Opção 2: Comando direto

```bash
cd php
php -S localhost:8000 -t . router.php
```

## Acessar no navegador

Abra: **http://localhost:8000**

### URLs para comparar com o Next.js

| Página        | PHP (localhost)                    | Next.js (geralmente porta 3000)   |
|---------------|------------------------------------|-----------------------------------|
| Home          | http://localhost:8000/             | http://localhost:3000/            |
| About         | http://localhost:8000/about        | http://localhost:3000/about       |
| Contact       | http://localhost:8000/contact      | http://localhost:3000/contact     |
| Services      | http://localhost:8000/services/    | http://localhost:3000/services    |
| Hardwood Ref. | http://localhost:8000/services/hardwood-refinishing | http://localhost:3000/services/hardwood-refinishing |
| Portfolio     | http://localhost:8000/portfolio    | http://localhost:3000/portfolio   |
| Reviews       | http://localhost:8000/reviews      | http://localhost:3000/reviews      |
| Free Estimate | http://localhost:8000/free-estimate | http://localhost:3000/free-estimate |

## Parar o servidor

Pressione **Ctrl+C** no terminal onde o servidor está rodando.

## Configuração localhost

O arquivo `config.php` detecta automaticamente quando está em localhost e usa:

- `BASE_PATH` = '' (vazio)
- `SITE_URL` = http://localhost:8000

Assim os links funcionam corretamente no ambiente local. Em produção (senior-floors.com/newsite) continua usando `/newsite`.
