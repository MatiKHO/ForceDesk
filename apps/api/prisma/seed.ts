import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'admin', password: 'hashed_admin', role: 'admin' },
      { username: 'warrior1', password: 'hashed_user', role: 'user' }
    ],
    skipDuplicates: true
  });

  await prisma.bug.create({
    data: {
      title: 'Bug del dragón',
      priority: 'Alta',
      status: 'OPEN'
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
