'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className = '' }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.replace('/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50 ${className}`}
    >
      {isLoggingOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
