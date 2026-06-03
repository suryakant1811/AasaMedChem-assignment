import { prisma } from '@/lib/prisma';
import type { Product } from '@/types';
import type { ProductUnit } from '@prisma/client';
import Decimal from 'decimal.js';

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createProduct(data: {
  name: string;
  sku: string;
  category?: string;
  description?: string;
  baseUnit: ProductUnit;
  baseQuantity: Decimal | number | string;
  price: Decimal | number | string;
}): Promise<Product> {
  return prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      category: data.category || null,
      description: data.description || null,
      baseUnit: data.baseUnit,
      baseQuantity: new Decimal(data.baseQuantity),
      price: new Decimal(data.price),
    },
  });
}
