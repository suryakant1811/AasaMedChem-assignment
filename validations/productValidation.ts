import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required.'),
  sku: z.string().min(2, 'SKU is required.'),
  quantity: z.number().int().nonnegative('Quantity must be 0 or greater.'),
  price: z.number().nonnegative('Price must be 0 or greater.'),
});

export type ProductInput = z.infer<typeof productSchema>;
