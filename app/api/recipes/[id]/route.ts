import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(recipe);
}
