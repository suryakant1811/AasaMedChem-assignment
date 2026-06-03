import type { DocumentStatus, ProductUnit } from '@prisma/client';

export type QuotationItemData = {
  productId: string;
  quantity: string;
  unit: ProductUnit;
  baseQuantity: string;
  baseUnit: ProductUnit;
  unitPrice: string;
  totalPrice: string;
};

export type QuotationView = {
  id: string;
  customer: string;
  status: DocumentStatus;
  totalAmount: string;
  createdAt: string;
  sellerEmail?: string;
};

export type QuotationDetailView = {
  id: string;
  customer: string;
  status: DocumentStatus;
  totalAmount: string;
  createdAt: string;
  items: QuotationDetailItem[];
};

export type QuotationDetailItem = {
  id: string;
  productName: string;
  productSku: string;
  quantity: string;
  unit: ProductUnit;
  baseQuantity: string;
  baseUnit: ProductUnit;
  unitPrice: string;
  totalPrice: string;
};
