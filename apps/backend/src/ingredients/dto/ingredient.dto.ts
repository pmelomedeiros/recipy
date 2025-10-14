export class IngredientDto {
  id: string;
  name: string;
  description?: string;
  _count?: {
    recipeIngredients: number;
  };
}

export class PaginatedIngredientDto {
  ingredients: IngredientDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}