import { IsString, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateIngredientDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  @Matches(/^[a-zA-Z\s\-'.,()]+$/, { 
    message: 'Name must contain only letters, spaces, hyphens, apostrophes, commas, periods, and parentheses' 
  })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(0, 500, { message: 'Description cannot exceed 500 characters' })
  @Transform(({ value }) => value?.trim())
  description?: string;
}