import { User } from './user';
import { Ingredient } from './ingredient';
import { Category } from './category';

export enum RecipeDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
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
  difficulty: RecipeDifficulty;
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