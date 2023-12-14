type IRecipe = {
  id?: string;
  name: string;
  description: string;
  steps: string[];
  ingredients: string[];
  createdAt?: Date;
  authorId?: String;
};
