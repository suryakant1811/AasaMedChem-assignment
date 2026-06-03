import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getPostLoginPath } from '@/lib/authRoutes';
import { LoginForm } from '@/components/LoginForm';

type LoginPageProps = {
  searchParams?: {
    next?: string;
    signedOut?: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect(getPostLoginPath(user.role, searchParams?.next));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Sign in</h1>
        <p className="mt-3 text-slate-600">Use your account credentials to continue.</p>
        {searchParams?.signedOut ? <p className="mt-4 text-sm font-medium text-green-700">You have been signed out.</p> : null}
      </div>

      <LoginForm redirectTo={searchParams?.next} />

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-700">Test credentials</p>
        <ul className="mt-3 space-y-2 text-sm font-mono text-slate-700">
          <li>Admin: suraj@gmail.com / 11111111</li>
          <li>Seller: seller@aasamedchem.test / Seller1234!</li>
        </ul>
      </div>
    </main>
  );
}
