import { requireSeller } from '@/lib/guards';

export default async function SellerPage() {
  const user = await requireSeller();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Seller dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Hello, {user.email}</h1>
        <p className="mt-3 text-slate-600">Seller users can view inventory, create quotations, and manage orders.</p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">Sales workflow</h2>
          <p className="mt-3 text-slate-600">Seller pages are protected by middleware and verify the user role on the server.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">Browse products</h2>
          <p className="mt-3 text-slate-600">View inventory with flexible unit pricing and stock availability.</p>
          <a href="/products" className="mt-4 inline-flex rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
            Browse catalog
          </a>
        </div>
      </div>
    </main>
  );
}
