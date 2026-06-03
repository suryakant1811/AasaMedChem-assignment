import Link from 'next/link';
import { requireAdmin } from '@/lib/guards';
import { getAllQuotations } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Table } from '@/components/Table';
import { EmptyState } from '@/components/StateCards';
import { Button } from '@/components/Button';
import { formatINR } from '@/lib/pricing';

export default async function AdminQuotationsPage() {
  await requireAdmin();
  const quotations = await getAllQuotations();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Admin quotations</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Manage quotations</h1>
        <p className="mt-2 text-slate-600">Review and process all incoming quotations and orders.</p>
      </div>

      {quotations.length === 0 ? (
        <EmptyState title="No quotations" description="There are no quotations yet." icon="📋" />
      ) : (
        <Table
          headers={['Customer', 'Seller', 'Items', 'Total', 'Status', 'Date', 'Action']}
          rows={quotations.map((q) => [
            q.customer,
            q.user?.email || 'Unknown',
            q.items.length,
            formatINR(q.totalAmount),
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                q.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : q.status === 'APPROVED'
                    ? 'bg-green-100 text-green-800'
                    : q.status === 'REJECTED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
              }`}
            >
              {q.status}
            </span>,
            new Date(q.createdAt).toLocaleDateString(),
            <Link href={`/admin/quotations/${q.id}`}>
              <Button variant="ghost" className="text-xs">
                Review
              </Button>
            </Link>,
          ])}
        />
      )}
    </main>
  );
}
