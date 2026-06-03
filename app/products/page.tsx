import { getAllProducts } from '@/lib/products';
import { requireAuth } from '@/lib/guards';
import { ProductCard } from '@/components/ProductCard';
import type { ProductView } from '@/types/product';

export default async function ProductBrowsingPage({ searchParams }: { searchParams?: { query?: string; category?: string } }) {
  await requireAuth();

  const products = await getAllProducts();
  const categories = Array.from(new Set(products.map((product) => product.category || 'General'))).sort();
  const searchTerm = searchParams?.query?.toLowerCase() ?? '';
  const activeCategory = searchParams?.category ?? '';

  const filteredProducts = products
    .filter((product) => {
      if (activeCategory && activeCategory !== 'All') {
        return (product.category || 'General') === activeCategory;
      }
      return true;
    })
    .filter((product) => {
      if (!searchTerm) {
        return true;
      }
      return product.name.toLowerCase().includes(searchTerm);
    })
    .map((product) => ({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description,
      baseUnit: product.baseUnit,
      baseQuantity: product.baseQuantity.toString(),
      price: product.price.toString(),
    })) as ProductView[];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Product catalog</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Browse inventory</h1>
        <p className="mt-2 text-slate-600">Search and filter products by name and category, then calculate price in INR.</p>
      </div>

      <form method="get" className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 sm:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Search by name</span>
          <input
            name="query"
            defaultValue={searchParams?.query ?? ''}
            placeholder="Search products"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            name="category"
            defaultValue={activeCategory || 'All'}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Apply filters
        </button>
      </form>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm shadow-slate-200/50">
          No products match the current search or filter.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
