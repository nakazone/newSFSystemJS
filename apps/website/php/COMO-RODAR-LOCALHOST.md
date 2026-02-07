# Como rodar o PHP no localhost

O localhost não funcionava porque **o PHP não está instalado** (ou não está no PATH) no seu computador. Siga uma das opções abaixo.

---

## Opção 1: Instalar PHP com Homebrew (recomendado no Mac)

### 1. Instalar o Homebrew (se ainda não tiver)

Abra o **Terminal** e cole:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Siga as instruções. No final, ele pode pedir para você rodar comandos como:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 2. Instalar o PHP

```bash
brew install php
```

### 3. Rodar o servidor

Na pasta do projeto (onde está a pasta `php/`):

```bash
./php/start-local-server.sh
```

Ou:

```bash
cd php
php -S localhost:8000 -t . router.php
```

Abra no navegador: **http://localhost:8000**

---

## Opção 2: MAMP (Mac ou Windows, com interface)

1. Baixe o MAMP: https://www.mamp.info/
2. Instale e abra o MAMP.
3. Em **Preferences** → **Web Server**, defina **Document Root** para a pasta **php** do projeto.  
   Exemplo: `/Users/naka/flooring-website/php`
4. Clique em **Start Servers**.
5. Abra no navegador: **http://localhost:8888** (ou a porta que o MAMP mostrar).

Se o MAMP usar outra pasta (ex.: htdocs), copie todo o conteúdo da pasta `php/` para essa pasta e acesse **http://localhost:8888**.

---

## Opção 3: XAMPP (Mac ou Windows)

1. Baixe o XAMPP: https://www.apachefriends.org/
2. Instale e inicie o **Apache**.
3. Copie todo o conteúdo da pasta **php/** do projeto para a pasta **htdocs** do XAMPP (ex.: `C:\xampp\htdocs` no Windows ou `/Applications/XAMPP/htdocs` no Mac).
4. Abra: **http://localhost/**

---

## Opção 4: Testar direto no servidor (Hostinger)

Se não quiser instalar nada no computador:

1. Faça o deploy na Hostinger conforme o guia **COMO-FAZER-DEPLOY.md**.
2. Acesse: **https://www.senior-floors.com/newsite/**
3. Compare com o site em Next.js.

---

## Depois que o PHP estiver instalado

Na pasta do projeto:

```bash
./php/start-local-server.sh
```

Ou com outra porta:

```bash
./php/start-local-server.sh 8080
```

Abra: **http://localhost:8000** (ou **http://localhost:8080**).

Para parar o servidor: **Ctrl+C** no terminal.

---

## Resumo do problema

- **Por que não funcionava:** o comando `php` não foi encontrado (PHP não instalado ou não no PATH).
- **Solução:** instalar o PHP (Homebrew, MAMP ou XAMPP) e depois rodar `./php/start-local-server.sh`.
