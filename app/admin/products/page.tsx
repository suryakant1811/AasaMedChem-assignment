import Link from 'next/link';
import { requireAdmin } from '@/lib/guards';
import { getAllProducts } from '@/lib/products';
import type { ProductView } from '@/types/product';

export default async function AdminProductsPage() {
  const user = await requireAdmin();
  const products = await getAllProducts();

  const productViews: ProductView[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: product.description,
    baseUnit: product.baseUnit,
    baseQuantity: product.baseQuantity.toString(),
    price: product.price.toString(),
  }));

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin products</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Manage inventory</h1>
          <p className="mt-2 text-slate-600">Create, edit, or delete products for your catalog.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Base stock</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 border-t border-slate-200">
            {productViews.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.description || 'No description'}</div>
                </td>
                <td className="px-6 py-4 text-slate-700">{product.sku}</td>
                <td className="px-6 py-4 text-slate-700">{product.category || 'General'}</td>
                <td className="px-6 py-4 text-slate-700">{product.baseQuantity} {product.baseUnit}</td>
                <td className="px-6 py-4 text-slate-700">₹{Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/products/${product.id}`} className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
