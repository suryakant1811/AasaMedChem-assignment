import type { ProductUnit } from '@prisma/client';

export type ProductView = {
  id: string;
  name: string;
  sku: string;
  category?: string | null;
  description?: string | null;
  baseUnit: ProductUnit;
  baseQuantity: string;
  price: string;
};
