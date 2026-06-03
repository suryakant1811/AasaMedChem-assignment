import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/guards';
import { createProduct } from '@/lib/products';
import { productSchema } from '@/validations/productValidation';

const BASE_UNITS = ['G', 'ML', 'UNIT'] as const;

export default async function NewProductPage() {
  await requireAdmin();

  async function createAction(formData: FormData) {
    'use server';

    const raw = {
      name: formData.get('name'),
      sku: formData.get('sku'),
      category: formData.get('category'),
      description: formData.get('description'),
      baseUnit: formData.get('baseUnit'),
      baseQuantity: formData.get('baseQuantity'),
      price: formData.get('price'),
    };

    const validated = productSchema.parse(raw);

    await createProduct({
      name: validated.name,
      sku: validated.sku,
      category: validated.category,
      description: validated.description,
      baseUnit: validated.baseUnit,
      baseQuantity: validated.baseQuantity.toString(),
      price: validated.price.toString(),
    });

    redirect('/admin/products');
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">New product</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Create a product</h1>
        <p className="mt-2 text-slate-600">Add inventory items with the correct internal base unit and price.</p>
      </div>

      <form action={createAction} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Product name</span>
          <input name="name" type="text" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">SKU</span>
          <input name="sku" type="text" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <input name="category" type="text" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea name="description" rows={4} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Base unit</span>
            <select name="baseUnit" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none">
              {BASE_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Stock quantity</span>
            <input name="baseQuantity" type="number" min="0" step="any" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Price per base unit</span>
          <input name="price" type="number" min="0" step="any" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
          Save product
        </button>
      </form>
    </main>
  );
}
