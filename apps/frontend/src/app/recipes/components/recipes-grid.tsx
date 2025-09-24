import { Recipe } from '../types/recipe';
import RecipeCard from './recipe-card';

interface RecipesGridProps {
  recipes: Recipe[];
}

export default function RecipesGrid({ recipes }: RecipesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}