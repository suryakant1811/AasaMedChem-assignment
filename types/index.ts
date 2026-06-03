import Decimal from 'decimal.js';
import type { ProductUnit } from '@prisma/client';

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  description: string | null;
  baseUnit: ProductUnit;
  baseQuantity: Decimal;
  price: Decimal;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  customer: string;
  totalAmount: string;
  placedAt: string;
  items: OrderItem[];
};
