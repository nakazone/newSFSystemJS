/**
 * Runs prisma generate with a fallback DATABASE_URL when not set.
 * Used in CI (e.g. Netlify) so the build can generate the Prisma client
 * without requiring DATABASE_URL to be configured at install/build time.
 */
const { execSync } = require('child_process');

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./prisma/dev.db';
}

execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
