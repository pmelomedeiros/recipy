import { Difficulty } from '@prisma/client';

export class RecipeIngredientResponseDto {
  id: string;
  quantity: string;
  unit?: string;
  ingredient: {
    id: string;
    name: string;
    description?: string;
  };
}

export class RecipeCategoryResponseDto {
  id: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
}

export class RecipeResponseDto {
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
  recipeIngredients?: RecipeIngredientResponseDto[];
  recipeCategories?: RecipeCategoryResponseDto[];
}

export class PaginatedRecipeResponseDto {
  recipes: RecipeResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}