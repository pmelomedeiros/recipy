import { Recipe } from '@/types/recipe';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    
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

export async function fetchRecipeById(id: string): Promise<Recipe> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}