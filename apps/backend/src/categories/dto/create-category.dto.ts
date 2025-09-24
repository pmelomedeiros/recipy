import { IsString, IsOptional, IsNotEmpty, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  @Matches(/^[a-zA-Z\s\-&]+$/, { 
    message: 'Name must contain only letters, spaces, hyphens, and ampersands' 
  })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(0, 300, { message: 'Description cannot exceed 300 characters' })
  @Transform(({ value }) => value?.trim())
  description?: string;
}