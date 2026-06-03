import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const quotation = await prisma.quotation.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { product: true },
      },
      user: true,
    },
  });

  if (!quotation) {
    return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
  }

  return NextResponse.json(quotation);
}
