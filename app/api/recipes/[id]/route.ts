import { NextResponse } from "next/server"
import prisma from '../../../../lib/prisma';

export async function GET(
  { params }: { params: { id: string } }
) {
  const post = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json(post)
}