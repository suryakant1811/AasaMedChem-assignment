'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.push('/login');
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Logout</h1>
        <p className="mt-3 text-slate-600">Click below to sign out and clear your current session.</p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex items-center justify-center rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
      >
        {isLoggingOut ? 'Logging out…' : 'Sign out'}
      </button>
    </main>
  );
}
