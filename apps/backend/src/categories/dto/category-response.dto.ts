export class CategoryResponseDto {
  id: string;
  name: string;
  description?: string;
  _count?: {
    recipeCategories: number;
  };
}

export class PaginatedCategoryResponseDto {
  categories: CategoryResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}