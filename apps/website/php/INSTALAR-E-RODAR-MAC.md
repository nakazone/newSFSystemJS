# Rodar o PHP no localhost no Mac

Siga estes passos **no Terminal do Mac** (Terminal.app ou iTerm), um bloco por vez.

---

## Passo 1: Instalar o Homebrew

Abra o **Terminal** (Spotlight: `Cmd + Espaço`, digite "Terminal").

Cole e pressione Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Digite a **senha do Mac** se pedir (não aparece ao digitar).
- Quando perguntar, pressione **Enter** para continuar.
- No final, o instalador pode mostrar 2 linhas para você rodar (algo como `echo 'eval...'` e `eval...`). **Copie e rode essas 2 linhas** no Terminal para o comando `brew` funcionar.

---

## Passo 2: Instalar o PHP

No mesmo Terminal, rode:

```bash
brew install php
```

Aguarde terminar.

---

## Passo 3: Rodar o servidor PHP

Vá até a pasta do projeto e inicie o servidor:

```bash
cd /Users/naka/flooring-website
./php/start-local-server.sh
```

Deve aparecer algo como:

```
  URL: http://localhost:8000
  Abra no navegador: http://localhost:8000
```

Abra no navegador: **http://localhost:8000**

Para parar o servidor: **Ctrl+C** no Terminal.

---

## Se o Homebrew estiver em outro lugar

Se depois de instalar o Homebrew o comando `brew` não for encontrado, rode as linhas que o instalador mostrou no final (algo como):

```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

No Mac com chip **Apple Silicon (M1/M2/M3)**, costuma ser:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Depois feche e abra o Terminal de novo e rode:

```bash
brew install php
cd /Users/naka/flooring-website
./php/start-local-server.sh
```

---

## Resumo (3 comandos)

1. Instalar Homebrew:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Instalar PHP:
   ```bash
   brew install php
   ```
3. Subir o servidor:
   ```bash
   cd /Users/naka/flooring-website && ./php/start-local-server.sh
   ```

Depois acesse: **http://localhost:8000**
