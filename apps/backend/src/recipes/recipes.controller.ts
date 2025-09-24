import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { QueryRecipeDto } from './dto/query-recipe.dto';

@Controller('recipes')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipesService.create(createRecipeDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryRecipeDto) {
    return await this.recipesService.findAll(queryDto);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Query() queryDto: QueryRecipeDto
  ) {
    return await this.recipesService.findByUser(userId, queryDto);
  }

  @Get('category/:categoryId')
  async findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() queryDto: QueryRecipeDto
  ) {
    return await this.recipesService.findByCategory(categoryId, queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return await this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(id);
  }
}