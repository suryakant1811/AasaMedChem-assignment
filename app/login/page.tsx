import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getPostLoginPath } from '@/lib/authRoutes';
import { AuthShell } from '@/components/AuthShell';
import { LoginForm } from '@/components/LoginForm';
import Link from 'next/link';

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
    <AuthShell
      eyebrow="Secure login"
      title="Welcome back"
      description="Access your sourcing dashboard, quotations, and verified pharma catalogue."
      footer={
        <>
          New to AasaMedChem?{' '}
          <Link href="/register" className="font-semibold text-teal-700 hover:text-teal-900">
            Create an account
          </Link>
        </>
      }
    >
      {searchParams?.signedOut ? (
        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          You have been signed out.
        </div>
      ) : null}
      <LoginForm redirectTo={searchParams?.next} />

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-800">Demo credentials</p>
        <ul className="mt-3 space-y-2 text-sm font-mono text-slate-700">
          <li>Admin: suraj@gmail.com / 11111111</li>
          <li>Seller: seller@aasamedchem.test / Seller1234!</li>
        </ul>
      </div>
    </AuthShell>
  );
}
