import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-slate-900 sm:text-6xl">AasaMedChem Inventory</h1>
        <p className="mt-6 text-xl text-slate-600">Professional pharmaceutical inventory and quotation management system</p>

        {user ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user.role === 'ADMIN' && (
              <>
                <Link href="/admin">
                  <Button>Go to dashboard</Button>
                </Link>
                <Link href="/admin/products">
                  <Button variant="secondary">Manage products</Button>
                </Link>
              </>
            )}
            {(user.role === 'SELLER' || user.role === 'BUYER') && (
              <>
                <Link href="/seller">
                  <Button>Go to dashboard</Button>
                </Link>
                <Link href="/products">
                  <Button variant="secondary">Browse products</Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Create account</Button>
            </Link>
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-8">
          <div className="text-4xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-slate-900">Product management</h2>
          <p className="mt-3 text-slate-600">Manage your pharmaceutical inventory with precise unit conversions and real-time pricing.</p>
        </Card>
        <Card className="p-8">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold text-slate-900">Quotations</h2>
          <p className="mt-3 text-slate-600">Create detailed quotations with flexible quantities and automatic price calculations.</p>
        </Card>
        <Card className="p-8">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-semibold text-slate-900">Secure & Fast</h2>
          <p className="mt-3 text-slate-600">Built with modern security practices and optimized for performance.</p>
        </Card>
      </section>

      {!user && (
        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Get started</h2>
          <p className="mt-3 text-slate-600">Create an account to start managing your pharmaceutical inventory today</p>
          <Link href="/register" className="mt-6 block">
            <Button className="mx-auto">Create your account</Button>
          </Link>
        </section>
      )}
    </main>
  );
}
