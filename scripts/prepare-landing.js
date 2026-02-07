#!/usr/bin/env node
/**
 * Prepara a Landing Page + Sistema para deploy.
 * A pasta apps/landing jù contùm os arquivos estùticos e PHP; este script
 * pode ser usado para minificar, validar ou copiar para uma pasta de output.
 */
const fs = require('fs');
const path = require('path');

const landingDir = path.join(__dirname, '..', 'apps', 'landing');
const outDir = path.join(__dirname, '..', 'dist', 'landing');

if (!fs.existsSync(landingDir)) {
  console.warn('apps/landing nùo encontrada. Pulando build da landing.');
  process.exit(0);
}

// Por enquanto apenas garante que dist/landing existe (para deploy unificado)
if (!fs.existsSync(path.join(__dirname, '..', 'dist'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'dist'), { recursive: true });
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('? Landing Page + Sistema preparados em apps/landing');
console.log('  Para deploy: use a pasta apps/landing (HTML, CSS, JS e PHP do sistema)');
