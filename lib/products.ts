import { prisma } from '@/lib/prisma';
import type { ProductUnit } from '@prisma/client';

export type ProductData = {
  name: string;
  sku: string;
  category?: string | null;
  description?: string | null;
  baseUnit: ProductUnit;
  baseQuantity: string;
  price: string;
};

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: ProductData) {
  return prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      category: data.category || null,
      description: data.description || null,
      baseUnit: data.baseUnit,
      baseQuantity: data.baseQuantity,
      price: data.price,
    },
  });
}

export async function updateProduct(id: string, data: ProductData) {
  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      sku: data.sku,
      category: data.category || null,
      description: data.description || null,
      baseUnit: data.baseUnit,
      baseQuantity: data.baseQuantity,
      price: data.price,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}
