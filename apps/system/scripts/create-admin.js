const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

prisma.user.upsert({
  where: { email: 'leads@senior-floors.com' },
  update: { role: 'admin', is_active: 1 },
  create: {
    name: 'Leads Admin',
    email: 'leads@senior-floors.com',
    role: 'admin',
    is_active: 1,
  },
})
  .then((u) => {
    console.log('Admin criado/atualizado:', u.email, '(id:', u.id + ')')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error('Erro:', e.message)
    prisma.$disconnect()
    process.exit(1)
  })
