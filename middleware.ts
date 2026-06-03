import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canAccessPath, getDefaultAuthenticatedPath } from '@/lib/authRoutes';

const AUTH_TOKEN_NAME = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-to-a-secure-phrase';

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(url);
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function base64UrlToJson<T>(value: string): T {
  const bytes = base64UrlToBytes(value);
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

async function verifyToken(token: string) {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    return null;
  }

  const decodedHeader = base64UrlToJson<{ alg?: string }>(header);
  if (decodedHeader.alg !== 'HS256') {
    return null;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${header}.${payload}`),
  );

  if (!isValid) {
    return null;
  }

  const decodedPayload = base64UrlToJson<{ role?: string; exp?: number }>(payload);
  if (!decodedPayload.role || (decodedPayload.exp && decodedPayload.exp <= Math.floor(Date.now() / 1000))) {
    return null;
  }

  return { role: decodedPayload.role };
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_TOKEN_NAME)?.value;

  // Protected routes requiring authentication
  const protectedPaths = ['/admin', '/seller', '/quotations', '/products'];
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return redirectToLogin(request);
    }

    if (!canAccessPath(payload.role, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = getDefaultAuthenticatedPath(payload.role);
      url.search = '';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/quotations/:path*', '/products/:path*'],
};
