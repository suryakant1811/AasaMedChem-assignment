import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSessionToken, createAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/validations/authValidation';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: { email: parsed.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const isValidPassword = await verifyPassword(parsed.password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const token = createSessionToken({ id: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}
