export async function fetchRecipes() {
  const response = await fetch('/api/recipes');
  const recipes = await response.json();
  return recipes;
}
export function createRecipe(values: IRecipe) {
  return fetch(`/api/recipes`, {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
