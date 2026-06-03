import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createSessionToken, createAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/validations/authValidation';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'A user with that email already exists.' }, { status: 409 });
  }

  const hashedPassword = await hashPassword(parsed.password);
  const user = await prisma.user.create({
    data: {
      email: parsed.email,
      password: hashedPassword,
      name: parsed.name,
      role: parsed.role,
    },
  });

  const token = createSessionToken({ id: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
  response.cookies.set(createAuthCookie(token));

  return response;
}
