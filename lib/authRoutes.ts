import type { UserRole } from '@prisma/client';

export function getDefaultAuthenticatedPath(role: UserRole | string) {
  if (role === 'ADMIN') {
    return '/admin';
  }

  return '/seller';
}

export function canAccessPath(role: UserRole | string, pathname: string) {
  if (pathname.startsWith('/admin')) {
    return role === 'ADMIN';
  }

  if (pathname.startsWith('/seller') || pathname.startsWith('/quotations')) {
    return role === 'SELLER' || role === 'BUYER';
  }

  if (pathname.startsWith('/products')) {
    return role === 'ADMIN' || role === 'SELLER' || role === 'BUYER';
  }

  return true;
}

export function getPostLoginPath(role: UserRole | string, requestedPath?: string | null) {
  if (requestedPath && requestedPath.startsWith('/') && !requestedPath.startsWith('/login') && canAccessPath(role, requestedPath)) {
    return requestedPath;
  }

  return getDefaultAuthenticatedPath(role);
}
