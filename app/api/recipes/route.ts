import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const recipes = await prisma.recipe.findMany();
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  // protect if user isn't logged in
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
      { status: 401 }
    );
  }

  const json = await request.json();
  const post = await prisma.recipe.create({
    data: json,
  });

  return NextResponse.json({ post });
}
