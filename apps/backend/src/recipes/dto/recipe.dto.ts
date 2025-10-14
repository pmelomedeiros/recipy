import { Difficulty } from '@prisma/client';

export class RecipeIngredientDto {
  id: string;
  quantity: string;
  unit?: string;
  ingredient: {
    id: string;
    name: string;
    description?: string;
  };
}

export class RecipeCategoryDto {
  id: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
}

export class RecipeDto {
  id: string;
  title: string;
  description?: string;
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty: Difficulty;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  recipeIngredients?: RecipeIngredientDto[];
  recipeCategories?: RecipeCategoryDto[];
}

export class PaginatedRecipeDto {
  recipes: RecipeDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}