#!/bin/bash
# Script para fazer push ao Git
# Uso: bash push-to-git.sh GITHUB_URL
# Exemplo: bash push-to-git.sh https://github.com/seu-usuario/flooring-website.git

if [ -z "$1" ]; then
  echo "❌ Erro: URL do repositório não fornecida"
  echo ""
  echo "Uso: bash push-to-git.sh GITHUB_URL"
  echo "Exemplo: bash push-to-git.sh https://github.com/seu-usuario/flooring-website.git"
  exit 1
fi

REPO_URL=$1

echo "🔗 Adicionando remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "📤 Fazendo push para origin/main..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Push realizado com sucesso!"
  echo ""
  echo "Seu código está disponível em: $REPO_URL"
else
  echo ""
  echo "❌ Erro ao fazer push. Verifique:"
  echo "  1. A URL do repositório está correta?"
  echo "  2. Você tem permissão para fazer push?"
  echo "  3. Você está autenticado no Git (git config --global user.name e user.email)?"
fi
