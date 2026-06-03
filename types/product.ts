export type ProductView = {
  id: string;
  name: string;
  sku: string;
  category?: string | null;
  description?: string | null;
  baseUnit: string;
  baseQuantity: string;
  price: string;
};
