type IRecipe = {
  id?: string;
  name: string;
  description: string;
  steps: string[];
  ingredients: string[];
  createdAt: string;
  authorId?: String;
  rating: number;
  author: {
    name: string;
  };
};

type IRecipeCreate = Omit<IRecipe, 'author' | 'rating' | 'createdAt'>
