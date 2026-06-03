import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export async function Header() {
  const user = await getCurrentUser();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-rose-100 text-rose-700';
      case 'SELLER':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-slate-900">🏥 AasaMedChem</div>
        </Link>

        <nav className="flex items-center gap-8">
          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <>
                  <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    Dashboard
                  </Link>
                  <Link href="/admin/products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    Products
                  </Link>
                  <Link href="/admin/quotations" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    Quotations
                  </Link>
                </>
              )}
              {(user.role === 'SELLER' || user.role === 'BUYER') && (
                <>
                  <Link href="/seller" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    Dashboard
                  </Link>
                  <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    Catalog
                  </Link>
                  <Link href="/quotations" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                    My Quotations
                  </Link>
                </>
              )}

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Logged in as</p>
                  <p className="text-sm font-medium text-slate-900">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </div>

              <Link href="/logout" className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition">
                Sign out
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
                Sign in
              </Link>
              <Link href="/register" className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
