'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { getPostLoginPath } from '@/lib/authRoutes';

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      router.replace(getPostLoginPath(data.user?.role, redirectTo));
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/70">
      <div className="grid gap-6">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-teal-600 focus:bg-white focus:outline-none"
            autoComplete="email"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-teal-600 focus:bg-white focus:outline-none"
            autoComplete="current-password"
            required
          />
        </label>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full rounded-lg bg-slate-950 hover:bg-teal-900">
          Sign in
        </Button>
      </div>
    </form>
  );
}
