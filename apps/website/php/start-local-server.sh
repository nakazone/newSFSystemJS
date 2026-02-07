#!/bin/bash
# Inicia o servidor PHP local para testar a versão PHP do site
# Uso: ./start-local-server.sh   ou   ./start-local-server.sh 8080

cd "$(dirname "$0")"
PORT="${1:-8000}"

# Garantir que PATH inclui Homebrew (Mac Intel e Apple Silicon)
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Tentar encontrar o PHP (macOS: PATH, Homebrew, XAMPP, MAMP)
PHP_CMD=""
for p in php /opt/homebrew/bin/php /usr/local/bin/php /Applications/MAMP/bin/php/php*/bin/php /Applications/XAMPP/xamppfiles/bin/php; do
    if command -v "$p" &>/dev/null; then
        PHP_CMD="$p"
        break
    fi
    if [ -x "$p" ] 2>/dev/null; then
        PHP_CMD="$p"
        break
    fi
done
# MAMP: versão mais recente na pasta
if [ -z "$PHP_CMD" ] && [ -d /Applications/MAMP/bin/php ]; then
    PHP_CMD=$(ls -d /Applications/MAMP/bin/php/php*/bin/php 2>/dev/null | tail -1)
fi

if [ -z "$PHP_CMD" ] || ! "$PHP_CMD" -v &>/dev/null; then
    echo ""
    echo "  ERRO: PHP não encontrado no Mac."
    echo ""
    echo "  Siga o guia: php/INSTALAR-E-RODAR-MAC.md"
    echo ""
    echo "  Resumo rápido (no Terminal):"
    echo "  1) Instalar Homebrew:"
    echo "     /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  2) Instalar PHP:  brew install php"
    echo "  3) Rodar:         ./php/start-local-server.sh"
    echo ""
    exit 1
fi

echo ""
echo "  Senior Floors - PHP (localhost)"
echo "  ==============================="
echo ""
echo "  PHP: $PHP_CMD"
echo "  URL: http://localhost:$PORT"
echo ""
echo "  Abra no navegador: http://localhost:$PORT"
echo ""
echo "  Para parar: Ctrl+C"
echo ""
"$PHP_CMD" -S "localhost:$PORT" -t . router.php
