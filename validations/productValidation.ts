import { z } from 'zod';
import Decimal from 'decimal.js';

const decimalFromString = z.preprocess((value) => {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value;
}, z.string().refine((value) => !Number.isNaN(Number(value)) && value.length > 0, 'A valid number is required.').transform((value) => new Decimal(value)));

const optionalString = z.preprocess((value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return value;
}, z.string().optional());

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required.'),
  sku: z.string().min(2, 'SKU is required.'),
  category: optionalString,
  description: optionalString,
  baseUnit: z.enum(['G', 'ML', 'UNIT']),
  baseQuantity: decimalFromString,
  price: decimalFromString,
});

export type ProductSchema = z.infer<typeof productSchema>;
