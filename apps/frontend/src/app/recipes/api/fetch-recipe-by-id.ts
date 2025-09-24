import { Recipe } from '../types/recipe';
import { RECIPES_URL } from './url';

export async function fetchRecipeById(id: string): Promise<Recipe> {
  try {
    const response = await fetch(`${RECIPES_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}