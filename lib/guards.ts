import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN') {
    redirect('/login');
  }

  return user;
}

export async function requireSeller() {
  const user = await requireAuth();
  if (user.role !== 'SELLER') {
    redirect('/login');
  }

  return user;
}
