import { Recipe, Difficulty } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyColors = {
  [Difficulty.EASY]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [Difficulty.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [Difficulty.HARD]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
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

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {recipe.title}
          </h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              difficultyColors[recipe.difficulty]
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {recipe.description}
          </p>
        )}

        {/* Recipe Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Prep Time
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {formatTime(recipe.prepTime)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Cook Time
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {formatTime(recipe.cookTime)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total Time
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {totalTime > 0 ? formatTime(totalTime) : 'N/A'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Servings
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {recipe.servings || 'N/A'}
            </span>
          </div>
        </div>

        {/* Categories */}
        {recipe.recipeCategories && recipe.recipeCategories.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {recipe.recipeCategories.slice(0, 3).map((recipeCategory) => (
                <span
                  key={recipeCategory.id}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {recipeCategory.category.name}
                </span>
              ))}
              {recipe.recipeCategories.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{recipe.recipeCategories.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Author */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By {recipe.user.name}
          </p>
        </div>
      </div>
    </div>
  );
}