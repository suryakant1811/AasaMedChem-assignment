import { prisma } from '@/lib/prisma';
import type { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createProduct(data: {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}): Promise<Product> {
  return prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      quantity: data.quantity,
      price: data.price,
    },
  });
}
