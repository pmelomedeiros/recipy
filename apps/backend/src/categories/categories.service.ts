import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { CategoryDto, PaginatedCategoryDto } from './dto/category.dto';

type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: {
        recipeCategories: true;
      };
    };
  };
}>;

@Injectable()
export class CategoriesService {
  constructor(private readonly database: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const existingCategory = await this.database.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = await this.database.category.create({
      data: createCategoryDto,
      include: {
        _count: {
          select: { recipeCategories: true },
        },
      },
    });

    return this.formatCategoryResponse(category);
  }

  async findAll(queryDto: QueryCategoryDto): Promise<PaginatedCategoryDto> {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'asc' } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [categories, total] = await Promise.all([
      this.database.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: { recipeCategories: true },
          },
        },
      }),
      this.database.category.count({ where }),
    ]);

    const formattedCategories = categories.map(category => 
      this.formatCategoryResponse(category)
    );

    return {
      categories: formattedCategories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<CategoryDto> {
    const category = await this.database.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recipeCategories: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.formatCategoryResponse(category);
  }

  async findByName(name: string): Promise<CategoryDto> {
    const category = await this.database.category.findUnique({
      where: { name },
      include: {
        _count: {
          select: { recipeCategories: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.formatCategoryResponse(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const existingCategory = await this.database.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name && updateCategoryDto.name !== existingCategory.name) {
      const nameExists = await this.database.category.findUnique({
        where: { name: updateCategoryDto.name },
      });

      if (nameExists) {
        throw new ConflictException('Category name already in use');
      }
    }

    const updatedCategory = await this.database.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        _count: {
          select: { recipeCategories: true },
        },
      },
    });

    return this.formatCategoryResponse(updatedCategory);
  }

  async remove(id: string): Promise<void> {
    const category = await this.database.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recipeCategories: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category._count.recipeCategories > 0) {
      throw new ConflictException(
        'Cannot delete category that is used in recipes. Remove from all recipes first.'
      );
    }

    await this.database.category.delete({
      where: { id },
    });
  }

  private formatCategoryResponse(category: CategoryWithCount): CategoryDto {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      _count: category._count,
    };
  }
}