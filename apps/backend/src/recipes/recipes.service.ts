import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { RecipeResponseDto, PaginatedRecipeResponseDto } from './dto/recipe-response.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly database: DatabaseService) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeResponseDto> {
    const { ingredients, categoryIds, ...recipeData } = createRecipeDto;

    // Verify user exists
    const userExists = await this.database.user.findUnique({
      where: { id: createRecipeDto.userId },
    });

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    // Verify categories exist if provided
    if (categoryIds && categoryIds.length > 0) {
      const categoriesCount = await this.database.category.count({
        where: { id: { in: categoryIds } },
      });

      if (categoriesCount !== categoryIds.length) {
        throw new BadRequestException('One or more categories not found');
      }
    }

    // Verify ingredients exist if provided
    if (ingredients && ingredients.length > 0) {
      const ingredientIds = ingredients.map(ing => ing.ingredientId);
      const ingredientsCount = await this.database.ingredient.count({
        where: { id: { in: ingredientIds } },
      });

      if (ingredientsCount !== ingredientIds.length) {
        throw new BadRequestException('One or more ingredients not found');
      }
    }

    const recipe = await this.database.recipe.create({
      data: {
        ...recipeData,
        recipeIngredients: ingredients ? {
          create: ingredients.map(ing => ({
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
            unit: ing.unit,
          })),
        } : undefined,
        recipeCategories: categoryIds ? {
          create: categoryIds.map(categoryId => ({
            categoryId,
          })),
        } : undefined,
      },
      include: this.getRecipeInclude(),
    });

    return this.formatRecipeResponse(recipe);
  }

  async findAll(queryDto: QueryRecipeDto): Promise<PaginatedRecipeResponseDto> {
    const { page = 1, limit = 10, search, difficulty, categoryId, userId, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (userId) {
      where.userId = userId;
    }

    if (categoryId) {
      where.recipeCategories = {
        some: { categoryId },
      };
    }

    const [recipes, total] = await Promise.all([
      this.database.recipe.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: this.getRecipeInclude(),
      }),
      this.database.recipe.count({ where }),
    ]);

    const formattedRecipes = recipes.map(recipe => this.formatRecipeResponse(recipe));

    return {
      recipes: formattedRecipes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<RecipeResponseDto> {
    const recipe = await this.database.recipe.findUnique({
      where: { id },
      include: this.getRecipeInclude(),
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return this.formatRecipeResponse(recipe);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeResponseDto> {
    const existingRecipe = await this.database.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      throw new NotFoundException('Recipe not found');
    }

    const { ingredients, categoryIds, ...recipeData } = updateRecipeDto;

    // Verify categories exist if provided
    if (categoryIds && categoryIds.length > 0) {
      const categoriesCount = await this.database.category.count({
        where: { id: { in: categoryIds } },
      });

      if (categoriesCount !== categoryIds.length) {
        throw new BadRequestException('One or more categories not found');
      }
    }

    // Verify ingredients exist if provided
    if (ingredients && ingredients.length > 0) {
      const ingredientIds = ingredients.map(ing => ing.ingredientId);
      const ingredientsCount = await this.database.ingredient.count({
        where: { id: { in: ingredientIds } },
      });

      if (ingredientsCount !== ingredientIds.length) {
        throw new BadRequestException('One or more ingredients not found');
      }
    }

    // Update recipe with transaction to handle relationships
    const updatedRecipe = await this.database.$transaction(async (tx) => {
      // Update basic recipe data
      const recipe = await tx.recipe.update({
        where: { id },
        data: recipeData,
      });

      // Update ingredients if provided
      if (ingredients !== undefined) {
        await tx.recipeIngredient.deleteMany({
          where: { recipeId: id },
        });

        if (ingredients.length > 0) {
          await tx.recipeIngredient.createMany({
            data: ingredients.map(ing => ({
              recipeId: id,
              ingredientId: ing.ingredientId,
              quantity: ing.quantity,
              unit: ing.unit,
            })),
          });
        }
      }

      // Update categories if provided
      if (categoryIds !== undefined) {
        await tx.recipeCategory.deleteMany({
          where: { recipeId: id },
        });

        if (categoryIds.length > 0) {
          await tx.recipeCategory.createMany({
            data: categoryIds.map(categoryId => ({
              recipeId: id,
              categoryId,
            })),
          });
        }
      }

      return recipe;
    });

    // Fetch the complete updated recipe
    const completeRecipe = await this.database.recipe.findUnique({
      where: { id },
      include: this.getRecipeInclude(),
    });

    return this.formatRecipeResponse(completeRecipe);
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.database.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    await this.database.recipe.delete({
      where: { id },
    });
  }

  async findByUser(userId: string, queryDto: QueryRecipeDto): Promise<PaginatedRecipeResponseDto> {
    return this.findAll({ ...queryDto, userId });
  }

  async findByCategory(categoryId: string, queryDto: QueryRecipeDto): Promise<PaginatedRecipeResponseDto> {
    return this.findAll({ ...queryDto, categoryId });
  }

  private getRecipeInclude() {
    return {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
      recipeIngredients: {
        include: {
          ingredient: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
      recipeCategories: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    };
  }

  private formatRecipeResponse(recipe: any): RecipeResponseDto {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      user: recipe.user,
      recipeIngredients: recipe.recipeIngredients?.map(ri => ({
        id: ri.id,
        quantity: ri.quantity,
        unit: ri.unit,
        ingredient: ri.ingredient,
      })),
      recipeCategories: recipe.recipeCategories?.map(rc => ({
        id: rc.id,
        category: rc.category,
      })),
    };
  }
}