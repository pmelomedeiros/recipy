import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [DatabaseModule, RecipesModule, UsersModule, IngredientsModule, CategoriesModule],
})
export class AppModule {}
