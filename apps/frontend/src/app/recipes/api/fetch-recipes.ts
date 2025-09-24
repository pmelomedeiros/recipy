import { Recipe } from '../types/recipe';
import { RECIPES_URL } from './url';

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(RECIPES_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : data.recipes || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}