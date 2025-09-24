export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: string;
  unit?: string;
  ingredient: Ingredient;
}

export interface RecipeCategory {
  id: string;
  recipeId: string;
  categoryId: string;
  category: Category;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty: Difficulty;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  recipeIngredients: RecipeIngredient[];
  recipeCategories: RecipeCategory[];
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  page?: number;
  limit?: number;
}