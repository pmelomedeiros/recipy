import { fetchRecipeById } from '../../api/fetch-recipe-by-id';
import { EditRecipeForm } from './edit-recipe-form';

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;
  
  try {
    const recipe = await fetchRecipeById(id);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
        <EditRecipeForm recipe={recipe} />
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Recipe Not Found</h1>
        <p className="text-gray-600">The recipe you're looking for doesn't exist or couldn't be loaded.</p>
      </div>
    );
  }
}