export class IngredientResponseDto {
  id: string;
  name: string;
  description?: string;
  _count?: {
    recipeIngredients: number;
  };
}

export class PaginatedIngredientResponseDto {
  ingredients: IngredientResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}