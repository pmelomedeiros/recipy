import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { QueryIngredientDto } from './dto/query-ingredient.dto';
import { IngredientResponseDto, PaginatedIngredientResponseDto } from './dto/ingredient-response.dto';

@Injectable()
export class IngredientsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<IngredientResponseDto> {
    const existingIngredient = await this.database.ingredient.findUnique({
      where: { name: createIngredientDto.name },
    });

    if (existingIngredient) {
      throw new ConflictException('Ingredient with this name already exists');
    }

    const ingredient = await this.database.ingredient.create({
      data: createIngredientDto,
      include: {
        _count: {
          select: { recipeIngredients: true },
        },
      },
    });

    return this.formatIngredientResponse(ingredient);
  }

  async findAll(queryDto: QueryIngredientDto): Promise<PaginatedIngredientResponseDto> {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'asc' } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [ingredients, total] = await Promise.all([
      this.database.ingredient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: { recipeIngredients: true },
          },
        },
      }),
      this.database.ingredient.count({ where }),
    ]);

    const formattedIngredients = ingredients.map(ingredient => 
      this.formatIngredientResponse(ingredient)
    );

    return {
      ingredients: formattedIngredients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<IngredientResponseDto> {
    const ingredient = await this.database.ingredient.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recipeIngredients: true },
        },
      },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }

    return this.formatIngredientResponse(ingredient);
  }

  async findByName(name: string): Promise<IngredientResponseDto> {
    const ingredient = await this.database.ingredient.findUnique({
      where: { name },
      include: {
        _count: {
          select: { recipeIngredients: true },
        },
      },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }

    return this.formatIngredientResponse(ingredient);
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<IngredientResponseDto> {
    const existingIngredient = await this.database.ingredient.findUnique({
      where: { id },
    });

    if (!existingIngredient) {
      throw new NotFoundException('Ingredient not found');
    }

    if (updateIngredientDto.name && updateIngredientDto.name !== existingIngredient.name) {
      const nameExists = await this.database.ingredient.findUnique({
        where: { name: updateIngredientDto.name },
      });

      if (nameExists) {
        throw new ConflictException('Ingredient name already in use');
      }
    }

    const updatedIngredient = await this.database.ingredient.update({
      where: { id },
      data: updateIngredientDto,
      include: {
        _count: {
          select: { recipeIngredients: true },
        },
      },
    });

    return this.formatIngredientResponse(updatedIngredient);
  }

  async remove(id: string): Promise<void> {
    const ingredient = await this.database.ingredient.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recipeIngredients: true },
        },
      },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }

    if (ingredient._count.recipeIngredients > 0) {
      throw new ConflictException(
        'Cannot delete ingredient that is used in recipes. Remove from all recipes first.'
      );
    }

    await this.database.ingredient.delete({
      where: { id },
    });
  }

  private formatIngredientResponse(ingredient: any): IngredientResponseDto {
    return {
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      _count: ingredient._count,
    };
  }
}