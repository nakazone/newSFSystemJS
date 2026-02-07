#!/bin/bash
echo "🚀 Preparando deploy no Git..."

if [ -d .git ]; then
  echo "✓ Repositório Git já existe"
else
  echo "📦 Inicializando repositório Git..."
  git init
  git branch -M main
fi

echo "📝 Adicionando arquivos..."
git add .

if git diff --cached --quiet; then
  echo "⚠️  Nenhuma mudança para commitar."
  exit 0
fi

echo "💾 Criando commit inicial..."
git commit -m "Initial commit: Senior Floors website (Next.js + PHP versions)

- Next.js version: Full app with Prisma, NextAuth, admin panel
- PHP version: Standalone PHP site in /php folder for Hostinger
- Configured for www.senior-floors.com/newsite
- Includes: services, portfolio, blog, contact forms, SEO"

echo ""
echo "✅ Commit criado com sucesso!"
echo ""
echo "📤 Próximos passos:"
echo ""
echo "1. Crie um repositório no GitHub/GitLab"
echo ""
echo "2. Adicione o remote e faça push:"
echo "   git remote add origin https://github.com/SEU-USUARIO/flooring-website.git"
echo "   git push -u origin main"
echo ""
