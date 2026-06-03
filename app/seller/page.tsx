import Link from 'next/link';
import { requireSeller } from '@/lib/guards';
import { getAllProducts } from '@/lib/products';
import { getUserQuotations } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default async function SellerPage() {
  const user = await requireSeller();
  const products = await getAllProducts();
  const quotations = await getUserQuotations();

  const pendingQuotations = quotations.filter((q) => q.status === 'PENDING').length;
  const approvedQuotations = quotations.filter((q) => q.status === 'APPROVED').length;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Seller dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Welcome, {user.email}</h1>
        <p className="mt-3 text-slate-600">Browse products, create quotations, and track orders.</p>
      </section>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-slate-700">Available products</p>
          <p className="mt-4 text-5xl font-bold text-slate-900">{products.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">My quotations</p>
          <p className="mt-4 text-5xl font-bold text-slate-900">{quotations.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Pending approvals</p>
          <p className="mt-4 text-5xl font-bold text-yellow-600">{pendingQuotations}</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">Browse products</h2>
          <p className="mt-3 text-slate-600">View and search the product catalog with flexible unit pricing.</p>
          <Link href="/products" className="mt-4 block">
            <Button className="w-full">Browse catalog</Button>
          </Link>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">Create quotation</h2>
          <p className="mt-3 text-slate-600">Add multiple products and create a quotation for the admin.</p>
          <Link href="/quotations/new" className="mt-4 block">
            <Button className="w-full">New quotation</Button>
          </Link>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-slate-900">My quotations</h2>
          <p className="mt-3 text-slate-600">Track the status of all your submitted quotations.</p>
          <Link href="/quotations" className="mt-4 block">
            <Button className="w-full">View quotations</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
