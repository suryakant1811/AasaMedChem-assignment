import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          AasaMedChem
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <>
                  <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Dashboard
                  </Link>
                  <Link href="/admin/products" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Products
                  </Link>
                  <Link href="/admin/quotations" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Quotations
                  </Link>
                </>
              )}
              {(user.role === 'SELLER' || user.role === 'BUYER') && (
                <>
                  <Link href="/seller" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Dashboard
                  </Link>
                  <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Catalog
                  </Link>
                  <Link href="/quotations" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    My quotations
                  </Link>
                </>
              )}
              <span className="text-sm text-slate-600">{user.email}</span>
              <Link href="/logout" className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900">
                Sign out
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Sign in
              </Link>
              <Link href="/register" className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
