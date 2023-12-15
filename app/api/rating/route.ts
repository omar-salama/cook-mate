import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { recipeId, userId, value } = (await req.json()) as {
    recipeId: string;
    userId: string;
    value: number;
  };
  console.log(recipeId, userId, value);
  try {
    // Check if the user has already rated the recipe
    const existingRating = await prisma.rating.findUnique({
      where: {
        recipeId_userId: {
          recipeId,
          userId,
        },
      },
    });

    if (existingRating) {
      const updatedRating = await prisma.rating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          value,
        },
      });

      // recalculate average rating
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
        include: {
          ratings: true,
        },
      });
      if (recipe) {
        const totalRatings = recipe.ratings.length;
        const sumRatings = recipe.ratings.reduce(
          (sum, rating) => sum + rating.value,
          0
        );
        const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

        await prisma.recipe.update({
          where: {
            id: recipeId,
          },
          data: {
            totalRatings,
            sumRatings,
            rating: averageRating,
          },
        });
        return NextResponse.json({ rating: updatedRating });
      }
    } else {
      // If the user has not rated, create a new rating
      const newRating = await prisma.rating.create({
        data: {
          recipeId,
          userId,
          value,
        },
      });

      // Recalculate average rating
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
        include: {
          ratings: true,
        },
      });
      if (recipe) {
        const totalRatings = recipe.ratings.length;
        const sumRatings = recipe.ratings.reduce(
          (sum, rating) => sum + rating.value,
          0
        );
        const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

        // Update the recipe with the new average rating
        await prisma.recipe.update({
          where: {
            id: recipeId,
          },
          data: {
            totalRatings,
            sumRatings,
            rating: averageRating,
          },
        });
        return NextResponse.json({ rating: newRating });
      }
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get('recipeId');
  const userId = searchParams.get('userId');
  try {
    if (recipeId && userId) {
      // Fetch user's rating for the specified recipe
      const userRating = await prisma.rating.findUnique({
        where: {
          recipeId_userId: {
            recipeId,
            userId,
          },
        },
      });

      return NextResponse.json({ userRating });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
