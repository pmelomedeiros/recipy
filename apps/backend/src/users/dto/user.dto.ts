export class UserDto {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    recipes: number;
  };
}

export class PaginatedUserDto {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}