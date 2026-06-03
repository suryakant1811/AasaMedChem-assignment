import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function seed() {
  console.log('🌱 Starting database seed...');

  // Seed users
  const adminEmail = 'admin@aasamedchem.test';
  const sellerEmail = 'seller@aasamedchem.test';

  const adminPassword = await hashPassword('Admin1234!');
  const sellerPassword = await hashPassword('Seller1234!');

  const admin = await prisma.user.upsert({
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

  const seller = await prisma.user.upsert({
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

  // Create suraj admin user
  const surajPassword = await hashPassword('11111111');
  const surajAdmin = await prisma.user.upsert({
    where: { email: 'suraj@gmail.com' },
    update: {
      password: surajPassword,
      role: 'ADMIN',
    },
    create: {
      email: 'suraj@gmail.com',
      password: surajPassword,
      name: 'Suraj Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Seeded users');

  // Seed products
  // Weight-based product
  const paracetamol = await prisma.product.upsert({
    where: { sku: 'PCM-001' },
    update: {},
    create: {
      name: 'Paracetamol Powder',
      sku: 'PCM-001',
      category: 'Pain Relief',
      description: 'High-quality paracetamol powder for pharmaceutical use',
      baseUnit: 'G',
      baseQuantity: new Decimal('500000'),
      price: new Decimal('150'),
    },
  });

  // Volume-based product
  const coughSyrup = await prisma.product.upsert({
    where: { sku: 'SYRUP-002' },
    update: {},
    create: {
      name: 'Cough Syrup',
      sku: 'SYRUP-002',
      category: 'Cough & Cold',
      description: 'Effective cough syrup for all ages',
      baseUnit: 'ML',
      baseQuantity: new Decimal('100000'),
      price: new Decimal('85'),
    },
  });

  // Unit-based product
  const tablets = await prisma.product.upsert({
    where: { sku: 'TAB-003' },
    update: {},
    create: {
      name: 'Aspirin Tablets',
      sku: 'TAB-003',
      category: 'Pain Relief',
      description: 'Aspirin tablets 500mg - pack of 100',
      baseUnit: 'UNIT',
      baseQuantity: new Decimal('50000'),
      price: new Decimal('5'),
    },
  });

  console.log('✅ Seeded products');

  // Seed multiple quotations for testing
  // Quotation 1 - PENDING (for suraj admin, from seller)
  const quotation1 = await prisma.quotation.create({
    data: {
      customer: 'City Hospital',
      userId: seller.id,
      status: 'PENDING',
      totalAmount: new Decimal('50000'),
      items: {
        create: [
          {
            productId: paracetamol.id,
            quantity: new Decimal('50'),
            unit: 'KG',
            baseQuantity: new Decimal('50000'),
            baseUnit: 'G',
            unitPrice: new Decimal('150'),
            totalPrice: new Decimal('7500'),
          },
          {
            productId: coughSyrup.id,
            quantity: new Decimal('25'),
            unit: 'L',
            baseQuantity: new Decimal('25000'),
            baseUnit: 'ML',
            unitPrice: new Decimal('85'),
            totalPrice: new Decimal('2125'),
          },
        ],
      },
    },
  });

  // Quotation 2 - APPROVED
  const quotation2 = await prisma.quotation.create({
    data: {
      customer: 'Apollo Clinic',
      userId: seller.id,
      status: 'APPROVED',
      totalAmount: new Decimal('100000'),
      items: {
        create: [
          {
            productId: tablets.id,
            quantity: new Decimal('2000'),
            unit: 'UNIT',
            baseQuantity: new Decimal('2000'),
            baseUnit: 'UNIT',
            unitPrice: new Decimal('5'),
            totalPrice: new Decimal('10000'),
          },
          {
            productId: paracetamol.id,
            quantity: new Decimal('100'),
            unit: 'KG',
            baseQuantity: new Decimal('100000'),
            baseUnit: 'G',
            unitPrice: new Decimal('150'),
            totalPrice: new Decimal('15000'),
          },
        ],
      },
    },
  });

  // Quotation 3 - PENDING (different customer)
  const quotation3 = await prisma.quotation.create({
    data: {
      customer: 'Max Healthcare',
      userId: seller.id,
      status: 'PENDING',
      totalAmount: new Decimal('75000'),
      items: {
        create: [
          {
            productId: coughSyrup.id,
            quantity: new Decimal('100'),
            unit: 'L',
            baseQuantity: new Decimal('100000'),
            baseUnit: 'ML',
            unitPrice: new Decimal('85'),
            totalPrice: new Decimal('8500'),
          },
        ],
      },
    },
  });

  console.log('✅ Seeded multiple quotations');

  console.log('\n📊 Seed summary:');
  console.log(`   Admin users: ${admin.email}, suraj@gmail.com`);
  console.log(`   Seller user: ${seller.email}`);
  console.log(`   Products seeded: ${paracetamol.name}, ${coughSyrup.name}, ${tablets.name}`);
  console.log(`   Quotations created: 3 (PENDING: 2, APPROVED: 1)`);
  console.log('\n✨ Database seed complete!\n');
}

seed()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
