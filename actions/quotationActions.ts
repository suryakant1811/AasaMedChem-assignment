'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import type { QuotationItemData } from '@/types/quotation';
import Decimal from 'decimal.js';

export async function createQuotation(customer: string, items: QuotationItemData[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not authenticated.');
  }

  const totalAmount = items.reduce((sum, item) => sum.plus(new Decimal(item.totalPrice)), new Decimal(0));

  const quotation = await prisma.quotation.create({
    data: {
      customer,
      totalAmount: totalAmount.toString(),
      userId: user.id,
      status: 'PENDING',
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unit: item.unit,
          baseQuantity: item.baseQuantity,
          baseUnit: item.baseUnit,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      },
    },
    include: {
      items: {
        include: { product: true },
      },
      user: true,
    },
  });

  return quotation;
}

export async function getQuotationById(id: string) {
  return prisma.quotation.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
      user: true,
    },
  });
}

export async function getAllQuotations() {
  return prisma.quotation.findMany({
    include: {
      items: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserQuotations() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not authenticated.');
  }

  return prisma.quotation.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateQuotationStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED') {
  return prisma.quotation.update({
    where: { id },
    data: { status },
  });
}
