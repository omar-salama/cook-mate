import { NextResponse } from "next/server"
import prisma from '../../../lib/prisma';

  export async function GET() {
    const recipes = await prisma.recipe.findMany()
    return NextResponse.json(recipes)
  }
  
  export async function POST(request: Request) {
  
      const json = await request.json();
      const post = await prisma.recipe.create({
        data: json
      })
  
  return NextResponse.json({ post })
  }
