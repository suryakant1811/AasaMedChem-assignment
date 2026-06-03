import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSessionToken, createAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/validations/authValidation';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Login attempt:', body.email);
    
    const parsed = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (!user) {
      console.log('User not found:', parsed.email);
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(parsed.password, user.password);
    if (!isValidPassword) {
      console.log('Invalid password for user:', parsed.email);
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = createSessionToken({ id: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
    response.cookies.set(createAuthCookie(token));

    console.log('Login successful:', parsed.email);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 });
  }
}

