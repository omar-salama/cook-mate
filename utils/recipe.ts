export async function fetchRecipes(orderBy: string) {
  const response = await fetch(`/api/recipes?orderBy=${orderBy}`);
  const recipes = await response.json();
  return recipes;
}
export function createRecipe(values: IRecipeCreate) {
  return fetch(`/api/recipes`, {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export async function fetchRecipeDetails(recipeId: string) {
  const response = await fetch(`/api/recipes/${recipeId}`)
  const RecipeDetails = await response.json();
  return RecipeDetails;
}
