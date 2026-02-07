#!/bin/bash
# Script para preparar o projeto antes do deploy
# Verifica dependências, faz build de teste, etc.

set -e

echo "🔍 Preparando projeto para deploy..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js versão $NODE_VERSION detectada. Recomendado: Node.js 18+"
fi

echo "✅ Node.js $(node -v) encontrado"
echo ""

# Verificar se está na pasta correta
if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
    echo "❌ Execute este script na raiz do projeto (onde está package.json)"
    exit 1
fi

# Verificar .env.production
if [ ! -f ".env.production" ]; then
    echo "⚠️  Arquivo .env.production não encontrado"
    echo "   Criando template..."
    cat > .env.production << EOF
# URL do site (obrigatório)
NEXT_PUBLIC_SITE_URL=https://www.senior-floors.com/newsite

# Banco de dados
DATABASE_URL="file:./prisma/dev.db"

# NextAuth (gerar com: openssl rand -base64 32)
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://www.senior-floors.com/newsite
EOF
    echo "✅ Template criado. Edite .env.production com seus valores reais."
    echo ""
fi

# Verificar se .git está inicializado
if [ ! -d ".git" ]; then
    echo "⚠️  Git não inicializado. Inicializando..."
    git init
    echo "✅ Git inicializado"
    echo ""
fi

# Verificar se tem remote
if ! git remote | grep -q origin; then
    echo "⚠️  Remote 'origin' não configurado"
    echo "   Configure com: git remote add origin https://github.com/nakazone/newSF.git"
    echo ""
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install
echo "✅ Dependências instaladas"
echo ""

# Gerar Prisma Client
if [ -f "prisma/schema.prisma" ]; then
    echo "🔧 Gerando Prisma Client..."
    npx prisma generate
    echo "✅ Prisma Client gerado"
    echo ""
fi

# Testar build
echo "🏗️  Testando build de produção..."
npm run build
echo "✅ Build concluído com sucesso!"
echo ""

# Verificar tamanho do build
BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
echo "📊 Tamanho do build: $BUILD_SIZE"
echo ""

# Resumo
echo "✅ Projeto pronto para deploy!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure variáveis de ambiente na plataforma escolhida"
echo "   2. Faça push para GitHub: git push origin main"
echo "   3. Configure deploy na plataforma (Vercel, Netlify, Hostinger)"
echo ""
echo "📖 Veja GUIA-DEPLOY-NEXTJS.md para instruções detalhadas"
echo ""
