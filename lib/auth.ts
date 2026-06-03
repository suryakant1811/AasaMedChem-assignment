import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import type { UserRole } from '@prisma/client';
import type { CurrentUser } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me-to-a-secure-phrase';
const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(user: CurrentUser) {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as CurrentUser;
}

export function getAuthCookie() {
  return cookies().get(COOKIE_NAME)?.value;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = getAuthCookie();
  if (!token) {
    return null;
  }

  try {
    const payload = verifySessionToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export function createAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const,
    maxAge: COOKIE_MAX_AGE,
  };
}

export function createAuthCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    ...createAuthCookieOptions(),
  };
}

export function clearAuthCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const,
    maxAge: 0,
  };
}
