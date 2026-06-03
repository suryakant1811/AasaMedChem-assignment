'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.replace('/login?signedOut=1');
      router.refresh();
    }

    logout();
  }, [router]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Signing out</h1>
        <p className="mt-3 text-slate-600">Ending your session and returning you to login.</p>
      </div>
    </main>
  );
}
