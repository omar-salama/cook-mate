export async function fetchRecipes() {
  const response = await fetch('/api/recipes');
  const recipes = await response.json();
  return recipes;
}
