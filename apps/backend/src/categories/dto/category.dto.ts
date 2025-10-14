export class CategoryDto {
  id: string;
  name: string;
  description?: string;
  _count?: {
    recipeCategories: number;
  };
}

export class PaginatedCategoryDto {
  categories: CategoryDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}