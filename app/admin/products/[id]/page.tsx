import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/guards';
import { deleteProduct, getProductById, updateProduct } from '@/lib/products';
import { productSchema } from '@/validations/productValidation';
import type { ProductView } from '@/types/product';

const BASE_UNITS = ['G', 'ML', 'UNIT'] as const;

export default async function EditProductPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const product = await getProductById(params.id);

  if (!product) {
    redirect('/admin/products');
  }

  const initialProduct: ProductView = {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category,
    description: product.description,
    baseUnit: product.baseUnit,
    baseQuantity: product.baseQuantity.toString(),
    price: product.price.toString(),
  };

  async function updateAction(formData: FormData) {
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

    await updateProduct(params.id, {
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

  async function deleteAction(formData: FormData) {
    'use server';
    await deleteProduct(params.id);
    redirect('/admin/products');
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Edit product</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{initialProduct.name}</h1>
        <p className="mt-2 text-slate-600">Update product details or remove it from inventory.</p>
      </div>

      <form action={updateAction} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <input type="hidden" name="id" value={initialProduct.id} />

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Product name</span>
          <input name="name" defaultValue={initialProduct.name} type="text" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">SKU</span>
          <input name="sku" defaultValue={initialProduct.sku} type="text" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <input name="category" defaultValue={initialProduct.category ?? ''} type="text" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea name="description" defaultValue={initialProduct.description ?? ''} rows={4} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Base unit</span>
            <select name="baseUnit" defaultValue={initialProduct.baseUnit} required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none">
              {BASE_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Stock quantity</span>
            <input name="baseQuantity" defaultValue={initialProduct.baseQuantity} type="number" min="0" step="any" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Price per base unit</span>
          <input name="price" defaultValue={initialProduct.price} type="number" min="0" step="any" required className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none" />
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Save changes
          </button>
          <button
            type="submit"
            formAction={deleteAction}
            className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Delete product
          </button>
        </div>
      </form>
    </main>
  );
}
