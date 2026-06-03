import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const AUTH_TOKEN_NAME = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-to-a-secure-phrase';

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { role: string };
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_TOKEN_NAME)?.value;

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/seller')) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const payload = verifyToken(token);

    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return redirectToLogin(request);
    }

    if (pathname.startsWith('/seller') && payload.role !== 'SELLER') {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};
