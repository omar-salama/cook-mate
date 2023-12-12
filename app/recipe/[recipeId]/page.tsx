import prisma from '../../../lib/prisma';

export default async function RecipeDetails({ params }: { params: { recipeId: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.recipeId
    }
  });

  return (
    <div>
      {recipe?.name}</div>
  );
}
