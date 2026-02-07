#!/usr/bin/env node
/**
 * Postinstall do projeto unificado Senior Floors.
 * Gera o Prisma client para o app website (Next.js).
 */
const path = require('path');
const { execSync } = require('child_process');

const websiteDir = path.join(__dirname, '..', 'apps', 'website');
try {
  if (require('fs').existsSync(path.join(websiteDir, 'prisma', 'schema.prisma'))) {
    execSync('npx prisma generate', { cwd: websiteDir, stdio: 'inherit' });
  }
} catch (e) {
  console.warn('postinstall: prisma generate opcional falhou.', e.message);
}
