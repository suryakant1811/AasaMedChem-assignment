export type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: string;
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
