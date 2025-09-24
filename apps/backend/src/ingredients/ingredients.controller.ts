import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { QueryIngredientDto } from './dto/query-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return await this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryIngredientDto) {
    return await this.ingredientsService.findAll(queryDto);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return await this.ingredientsService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return await this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.ingredientsService.remove(id);
  }
}