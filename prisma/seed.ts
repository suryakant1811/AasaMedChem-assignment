import { hashPassword } from '../lib/auth';
import { prisma } from '../lib/prisma';

async function seed() {
  const adminEmail = 'admin@aasamedchem.test';
  const sellerEmail = 'seller@aasamedchem.test';

  const adminPassword = await hashPassword('Admin1234!');
  const sellerPassword = await hashPassword('Seller1234!');

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: adminPassword,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: sellerEmail },
    update: {
      password: sellerPassword,
      role: 'SELLER',
    },
    create: {
      email: sellerEmail,
      password: sellerPassword,
      name: 'Seller User',
      role: 'SELLER',
    },
  });

  console.log('✅ Seeded admin and seller test users.');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
