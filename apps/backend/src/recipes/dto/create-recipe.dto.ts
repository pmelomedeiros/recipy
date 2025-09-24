import { IsString, IsOptional, IsArray, IsInt, IsEnum, IsNotEmpty, Min, Max, ArrayMinSize, Length, IsUUID, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Difficulty } from '@prisma/client';

export class CreateRecipeIngredientDto {
  @IsString({ message: 'Ingredient ID must be a string' })
  @IsNotEmpty({ message: 'Ingredient ID is required' })
  @IsUUID(4, { message: 'Ingredient ID must be a valid UUID' })
  ingredientId: string;

  @IsString({ message: 'Quantity must be a string' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @Length(1, 50, { message: 'Quantity must be between 1 and 50 characters' })
  @Transform(({ value }) => value?.trim())
  quantity: string;

  @IsOptional()
  @IsString({ message: 'Unit must be a string' })
  @Length(1, 20, { message: 'Unit must be between 1 and 20 characters' })
  @Transform(({ value }) => value?.trim())
  unit?: string;
}

export class CreateRecipeDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 200, { message: 'Title must be between 3 and 200 characters' })
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(0, 1000, { message: 'Description cannot exceed 1000 characters' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsArray({ message: 'Instructions must be an array' })
  @ArrayMinSize(1, { message: 'At least one instruction is required' })
  @IsString({ each: true, message: 'Each instruction must be a string' })
  @Length(5, 500, { each: true, message: 'Each instruction must be between 5 and 500 characters' })
  instructions: string[];

  @IsOptional()
  @IsInt({ message: 'Preparation time must be an integer' })
  @Min(0, { message: 'Preparation time cannot be negative' })
  @Max(1440, { message: 'Preparation time cannot exceed 24 hours (1440 minutes)' })
  prepTime?: number;

  @IsOptional()
  @IsInt({ message: 'Cooking time must be an integer' })
  @Min(0, { message: 'Cooking time cannot be negative' })
  @Max(1440, { message: 'Cooking time cannot exceed 24 hours (1440 minutes)' })
  cookTime?: number;

  @IsOptional()
  @IsInt({ message: 'Servings must be an integer' })
  @Min(1, { message: 'Servings must be at least 1' })
  @Max(50, { message: 'Servings cannot exceed 50' })
  servings?: number;

  @IsOptional()
  @IsEnum(Difficulty, { 
    message: 'Difficulty must be one of: EASY, MEDIUM, HARD' 
  })
  difficulty?: Difficulty;

  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  userId: string;

  @IsOptional()
  @IsArray({ message: 'Ingredients must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientDto)
  ingredients?: CreateRecipeIngredientDto[];

  @IsOptional()
  @IsArray({ message: 'Category IDs must be an array' })
  @IsString({ each: true, message: 'Each category ID must be a string' })
  @IsUUID(4, { each: true, message: 'Each category ID must be a valid UUID' })
  categoryIds?: string[];
}