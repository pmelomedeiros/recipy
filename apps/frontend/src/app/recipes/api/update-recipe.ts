import { RECIPES_URL } from './url';

interface UpdateRecipeData {
  title: string;
  description?: string;
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
  ingredients?: Array<{
    ingredientId?: string;
    quantity: string;
    unit?: string;
    ingredientName?: string;
  }>;
  categoryIds?: string[];
}

export async function updateRecipe(id: string, data: UpdateRecipeData): Promise<void> {
  try {
    const updateData = {
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      difficulty: data.difficulty,
      // For now, we'll transform ingredient names to the expected format
      // In a real app, you'd need to handle ingredient creation/lookup
      ingredients: data.ingredients?.map(ing => ({
        quantity: ing.quantity,
        unit: ing.unit,
        // This would need proper ingredient ID resolution in a real app
        ingredientId: ing.ingredientId || '00000000-0000-0000-0000-000000000000'
      }))
    };

    const response = await fetch(`${RECIPES_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Failed to update recipe: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
}