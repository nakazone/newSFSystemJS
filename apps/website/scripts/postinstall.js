/**
 * Runs prisma generate only when DATABASE_URL is set.
 * Allows npm install to succeed on CI (e.g. Netlify) where env may not be set.
 */
const { execSync } = require('child_process');

if (process.env.DATABASE_URL) {
  execSync('npx prisma generate', { stdio: 'inherit' });
} else {
  console.log('Skipping prisma generate (DATABASE_URL not set)');
}
