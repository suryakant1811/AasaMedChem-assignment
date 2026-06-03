import { getAllProducts } from '@/lib/products';
import { requireAuth } from '@/lib/guards';
import { QuotationPlacement } from '@/components/QuotationPlacement';
import type { ProductView } from '@/types/product';

export default async function NewQuotationPage() {
  await requireAuth();

  const products = await getAllProducts();

  const productViews: ProductView[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category,
    description: p.description,
    baseUnit: p.baseUnit,
    baseQuantity: p.baseQuantity.toString(),
    price: p.price.toString(),
  }));

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <QuotationPlacement products={productViews} />
    </main>
  );
}
