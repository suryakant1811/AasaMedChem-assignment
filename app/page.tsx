import { PageHeader } from '@/components/PageHeader';
import { InfoCard } from '@/components/InfoCard';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12">
      <PageHeader
        title="Inventory & Order Management"
        description="Manage product stock and orders with a clean, extensible Next.js foundation."
      />

      <section className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Products"
          description="Track inventory levels, pricing, and SKU details for all items in stock."
        />
        <InfoCard
          title="Orders"
          description="View orders, manage order status, and inspect line items with Prisma-backed models."
        />
      </section>
    </main>
  );
}
