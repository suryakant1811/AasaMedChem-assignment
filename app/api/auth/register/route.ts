import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createSessionToken, createAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/validations/authValidation';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message ?? 'Invalid registration details.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'A user with that email already exists.' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(parsed.data.password);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        password: hashedPassword,
        name: parsed.data.name,
        role: parsed.data.role,
      },
    });

    const token = createSessionToken({ id: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
    response.cookies.set(createAuthCookie(token));

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
