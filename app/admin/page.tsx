import { requireAdmin } from '@/lib/guards';

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Welcome, {user.email}</h1>
        <p className="mt-3 text-slate-600">Admin users can manage system settings, review user activity, and authorize seller workflows.</p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">User roles</h2>
          <p className="mt-3 text-slate-600">Admins have full access. Seller routes are protected separately from the admin area.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <h2 className="text-xl font-semibold text-slate-900">Product management</h2>
          <p className="mt-3 text-slate-600">Manage products in the admin catalog.</p>
          <a href="/admin/products" className="mt-4 inline-flex rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
            Go to products
          </a>
        </div>
      </div>
    </main>
  );
}
