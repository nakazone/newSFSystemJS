# Como fazer push para o Git

O projeto já está commitado localmente. Para enviar ao GitHub/GitLab:

## Opção 1: Usar o script (mais fácil)

```bash
bash push-to-git.sh https://github.com/SEU-USUARIO/flooring-website.git
```

**Substitua `SEU-USUARIO` e `flooring-website` pela URL real do seu repositório.**

## Opção 2: Comandos manuais

```bash
# 1. Adicione o remote (substitua pela URL do seu repositório)
git remote add origin https://github.com/SEU-USUARIO/flooring-website.git

# 2. Faça o push
git push -u origin main
```

## Se você ainda não criou o repositório no GitHub:

1. Acesse https://github.com/new
2. Nome do repositório: `flooring-website` (ou outro nome)
3. **NÃO** marque "Initialize with README" (já temos arquivos)
4. Clique em "Create repository"
5. Copie a URL que aparece (ex.: `https://github.com/seu-usuario/flooring-website.git`)
6. Use essa URL no comando acima

## Se der erro de autenticação:

Você pode precisar configurar um Personal Access Token ou usar SSH:

**HTTPS com token:**
- GitHub: Settings → Developer settings → Personal access tokens → Generate new token
- Use o token como senha quando pedir

**SSH (recomendado):**
```bash
git remote set-url origin git@github.com:SEU-USUARIO/flooring-website.git
git push -u origin main
```

---

**Status atual:** ✅ Commit criado localmente (129 arquivos)
**Próximo passo:** Adicionar remote e fazer push
