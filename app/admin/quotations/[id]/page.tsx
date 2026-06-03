'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { updateQuotationStatus } from '@/actions/quotationActions';
import { Card } from '@/components/Card';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import { formatINR } from '@/lib/pricing';
import type { DocumentStatus } from '@prisma/client';

export default function AdminQuotationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quotation, setQuotation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/quotations/${params.id}`)
      .then((res) => res.json())
      .then(setQuotation)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [params.id]);

  async function handleStatusUpdate(status: DocumentStatus) {
    setIsUpdating(true);
    try {
      await updateQuotationStatus(params.id, status);
      setQuotation({ ...quotation, status });
      alert(`Quotation ${status.toLowerCase()}`);
    } catch {
      alert('Failed to update quotation');
    } finally {
      setIsUpdating(false);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
        <Card className="p-8 text-center">Loading...</Card>
      </main>
    );
  }

  if (!quotation) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
        <Card className="p-8 text-center text-red-600">Quotation not found</Card>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Card className="mb-8 p-8">
        <h1 className="text-4xl font-semibold text-slate-900">Quotation #{quotation.id.slice(0, 8)}</h1>
        <p className="mt-2 text-slate-600">Created on {new Date(quotation.createdAt).toLocaleDateString()}</p>
      </Card>

      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-slate-700">Customer</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{quotation.customer}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-700">Seller</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{quotation.user?.email}</p>
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
          rows={quotation.items.map((item: any) => [
            item.product.name,
            item.product.sku,
            item.quantity,
            item.unit,
            item.baseQuantity,
            item.baseUnit,
            formatINR(item.unitPrice),
            formatINR(item.totalPrice),
          ])}
        />
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="p-8 text-right">
          <p className="text-slate-600 mb-2">Total amount</p>
          <p className="text-3xl font-bold text-slate-900">{formatINR(quotation.totalAmount)}</p>
        </Card>

        {quotation.status === 'PENDING' && (
          <Card className="p-8 space-y-3">
            <Button onClick={() => handleStatusUpdate('APPROVED')} isLoading={isUpdating} className="w-full" variant="primary">
              Approve
            </Button>
            <Button onClick={() => handleStatusUpdate('REJECTED')} isLoading={isUpdating} className="w-full" variant="danger">
              Reject
            </Button>
          </Card>
        )}

        {quotation.status === 'APPROVED' && (
          <Card className="p-8">
            <Button onClick={() => handleStatusUpdate('COMPLETED')} isLoading={isUpdating} className="w-full" variant="primary">
              Mark completed
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
}
