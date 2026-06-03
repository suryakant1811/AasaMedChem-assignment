import { requireAuth } from '@/lib/guards';
import { getQuotationById } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Table } from '@/components/Table';
import { formatINR } from '@/lib/pricing';
import { redirect } from 'next/navigation';

export default async function QuotationDetailPage({ params }: { params: { id: string } }) {
  await requireAuth();
  const quotation = await getQuotationById(params.id);

  if (!quotation) {
    redirect('/quotations');
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Card className="mb-8 p-8">
        <h1 className="text-4xl font-semibold text-slate-900">Quotation #{quotation.id.slice(0, 8)}</h1>
        <p className="mt-2 text-slate-600">Created on {new Date(quotation.createdAt).toLocaleDateString()}</p>
      </Card>

      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <Card>
          <p className="text-sm font-medium text-slate-700">Customer</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{quotation.customer}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Status</p>
          <p
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              quotation.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800'
                : quotation.status === 'APPROVED'
                  ? 'bg-green-100 text-green-800'
                  : quotation.status === 'REJECTED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
            }`}
          >
            {quotation.status}
          </p>
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Items</h2>
        <Table
          headers={['Product', 'SKU', 'Qty', 'Unit', 'Base Qty', 'Base Unit', 'Price', 'Total']}
          rows={quotation.items.map((item) => [
            item.product.name,
            item.product.sku,
            item.quantity.toString(),
            item.unit,
            item.baseQuantity.toString(),
            item.baseUnit,
            formatINR(item.unitPrice),
            formatINR(item.totalPrice),
          ])}
        />
      </Card>

      <Card className="p-8 text-right">
        <p className="text-slate-600 mb-2">Total amount</p>
        <p className="text-4xl font-bold text-slate-900">{formatINR(quotation.totalAmount)}</p>
      </Card>
    </main>
  );
}
