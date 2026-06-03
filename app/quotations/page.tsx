import Link from 'next/link';
import { requireAuth } from '@/lib/guards';
import { getUserQuotations } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/StateCards';
import { formatINR } from '@/lib/pricing';
import { Table } from '@/components/Table';

export default async function UserQuotationsPage() {
  await requireAuth();
  const quotations = await getUserQuotations();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">My quotations</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Quotation history</h1>
          <p className="mt-2 text-slate-600">View and track all your quotations.</p>
        </div>
        <Link href="/quotations/new">
          <Button>New quotation</Button>
        </Link>
      </div>

      {quotations.length === 0 ? (
        <EmptyState title="No quotations" description="Create a new quotation to get started." icon="📋" />
      ) : (
        <Table
          headers={['Customer', 'Items', 'Total', 'Status', 'Date', 'Action']}
          rows={quotations.map((q) => [
            q.customer,
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
            <Link href={`/quotations/${q.id}`}>
              <Button variant="ghost" className="text-xs">
                View
              </Button>
            </Link>,
          ])}
        />
      )}
    </main>
  );
}
