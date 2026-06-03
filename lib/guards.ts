import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getDefaultAuthenticatedPath } from '@/lib/authRoutes';

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
    redirect(getDefaultAuthenticatedPath(user.role));
  }

  return user;
}

export async function requireSeller() {
  const user = await requireAuth();
  if (user.role !== 'SELLER' && user.role !== 'BUYER') {
    redirect(getDefaultAuthenticatedPath(user.role));
  }

  return user;
}
