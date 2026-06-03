import Link from 'next/link';
import { requireAdmin } from '@/lib/guards';
import { getAllProducts } from '@/lib/products';
import { getAllQuotations } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default async function AdminPage() {
  const user = await requireAdmin();
  const products = await getAllProducts();
  const quotations = await getAllQuotations();

  const pendingQuotations = quotations.filter((q) => q.status === 'PENDING').length;
  const approvedQuotations = quotations.filter((q) => q.status === 'APPROVED').length;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Welcome back, {user.email}</h1>
        <p className="mt-3 text-slate-600">Manage products, quotations, and orders from here.</p>
      </section>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-sm font-medium text-slate-700">Total products</p>
          <p className="mt-4 text-5xl font-bold text-slate-900">{products.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Total quotations</p>
          <p className="mt-4 text-5xl font-bold text-slate-900">{quotations.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Pending</p>
          <p className="mt-4 text-5xl font-bold text-yellow-600">{pendingQuotations}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Approved</p>
          <p className="mt-4 text-5xl font-bold text-green-600">{approvedQuotations}</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">Product management</h2>
          <p className="mt-3 text-slate-600">Create, edit, and manage your product inventory.</p>
          <Link href="/admin/products" className="mt-4 block">
            <Button className="w-full">Go to products</Button>
          </Link>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">Quotation management</h2>
          <p className="mt-3 text-slate-600">Review, approve, or reject incoming quotations.</p>
          <Link href="/admin/quotations" className="mt-4 block">
            <Button className="w-full">Go to quotations</Button>
          </Link>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
          <p className="mt-3 text-slate-600">View sales trends and business metrics (coming soon).</p>
          <Button className="w-full mt-4" disabled>
            Coming soon
          </Button>
        </Card>
      </div>
    </main>
  );
}
