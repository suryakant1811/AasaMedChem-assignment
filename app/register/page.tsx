'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/AuthShell';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('SELLER');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, role }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed.');
        return;
      }

      router.replace(role === 'SELLER' || role === 'BUYER' ? '/seller' : '/login');
      router.refresh();
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Verified access"
      title="Create your account"
      description="Join the marketplace to source pharma materials, manage quotations, and work with trusted suppliers."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-900">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/70">
        <div className="grid gap-6">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-teal-600 focus:bg-white focus:outline-none"
              autoComplete="name"
              required
            />
          </label>

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
              autoComplete="new-password"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-teal-600 focus:bg-white focus:outline-none"
            >
              <option value="SELLER">Seller</option>
              <option value="BUYER">Buyer</option>
            </select>
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-900 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
