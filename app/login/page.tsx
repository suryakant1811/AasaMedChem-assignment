'use client';
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function LoginPage() {
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
      console.log('Submitting login form...', { email, password });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      setIsSubmitting(false);

      if (!response.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      if (data.user?.role === 'ADMIN') {
        router.push('/admin');
        return;
      }

      if (data.user?.role === 'SELLER') {
        router.push('/seller');
        return;
      }

      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="text-3xl font-semibold text-slate-900">Login to your account</h1>
        <p className="mt-3 text-slate-600">Use your email and password to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
        <div className="grid gap-6">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full mt-4"
          >
            Sign in
          </Button>
        </div>
      </form>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">Test credentials:</p>
        <ul className="mt-3 space-y-2 text-sm font-mono text-slate-700">
          <li>Admin: suraj@gmail.com / 11111111</li>
          <li>Seller: seller@aasamedchem.test / Seller1234!</li>
        </ul>
      </div>
    </main>
  );
}

