#!/bin/bash

# Script de Deploy Automatizado para Hostinger
# Uso: ./deploy-ftp.sh

echo "🚀 Deploy Automatizado - Senior Floors"
echo "========================================"
echo ""

# Verificar se o ZIP existe
if [ ! -f "deploy-package.zip" ]; then
    echo "❌ Arquivo deploy-package.zip não encontrado!"
    echo "Criando o pacote..."
    zip -r deploy-package.zip php/ -x "*.git*" "*.DS_Store" "php/data/*.txt" "php/data/.gitkeep"
fi

echo "✅ Pacote ZIP encontrado: deploy-package.zip"
echo ""

# Solicitar credenciais FTP
read -p "🌐 Host FTP (ex: ftp.senior-floors.com): " FTP_HOST
read -p "👤 Username FTP: " FTP_USER
read -s -p "🔒 Password FTP: " FTP_PASS
echo ""
read -p "📁 Caminho remoto (ex: /public_html/newsite ou /domains/senior-floors.com/public_html/newsite): " FTP_PATH

echo ""
echo "📤 Fazendo upload para $FTP_HOST$FTP_PATH..."
echo ""

# Usar curl para fazer upload via FTP
curl -T deploy-package.zip \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST$FTP_PATH/deploy-package.zip"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload concluído!"
    echo ""
    echo "⚠️  IMPORTANTE: Agora você precisa:"
    echo "1. Acessar o File Manager da Hostinger"
    echo "2. Ir até $FTP_PATH"
    echo "3. Extrair o arquivo deploy-package.zip"
    echo "4. Deletar o arquivo ZIP após extrair"
    echo "5. Configurar permissão 755 na pasta data/"
    echo ""
    echo "🌐 Ou acesse: https://hpanel.hostinger.com → Files → File Manager"
else
    echo ""
    echo "❌ Erro no upload. Verifique as credenciais FTP."
    echo ""
    echo "💡 Alternativa: Use o File Manager da Hostinger:"
    echo "   1. Acesse: https://hpanel.hostinger.com"
    echo "   2. Files → File Manager"
    echo "   3. Navegue até $FTP_PATH"
    echo "   4. Upload → Selecione deploy-package.zip"
    echo "   5. Extraia o ZIP"
fi
