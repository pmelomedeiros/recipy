import Link from 'next/link';
import { fetchRecipeById } from '../api/fetch-recipe-by-id';
import { Recipe, RecipeDifficulty } from '../types/recipe';

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

const difficultyColors = {
  [RecipeDifficulty.EASY]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [RecipeDifficulty.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [RecipeDifficulty.HARD]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

function formatTime(minutes?: number): string {
  if (!minutes) return 'N/A';
  
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  
  try {
    const recipe = await fetchRecipeById(id);
    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {recipe.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              By {recipe.user.name}
            </p>
          </div>
          <Link
            href={`/recipes/${id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Edit Recipe
          </Link>
        </div>

        {/* Description */}
        {recipe.description && (
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {recipe.description}
            </p>
          </div>
        )}

        {/* Recipe Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Prep Time
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatTime(recipe.prepTime)}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Cook Time
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatTime(recipe.cookTime)}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total Time
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {totalTime > 0 ? formatTime(totalTime) : 'N/A'}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Servings
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {recipe.servings || 'N/A'}
            </span>
          </div>
        </div>

        {/* Difficulty and Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty:</span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                difficultyColors[recipe.difficulty]
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
          
          {recipe.recipeCategories && recipe.recipeCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories:</span>
              <div className="flex flex-wrap gap-1">
                {recipe.recipeCategories.map((recipeCategory) => (
                  <span
                    key={recipeCategory.id}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {recipeCategory.category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ingredients
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              {recipe.recipeIngredients.map((recipeIngredient, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>
                    {recipeIngredient.quantity} {recipeIngredient.unit} {recipeIngredient.ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Instructions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/recipes"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Recipe Not Found</h1>
        <p className="text-gray-600">The recipe you're looking for doesn't exist or couldn't be loaded.</p>
        <Link
          href="/recipes"
          className="text-blue-500 hover:text-blue-600 font-medium mt-4 inline-block"
        >
          ← Back to Recipes
        </Link>
      </div>
    );
  }
}