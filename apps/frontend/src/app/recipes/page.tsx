import { fetchRecipes } from "./api";
import RecipesGrid from "./components/recipes-grid";
import NoRecipesFound from "./components/no-recipes-found";
import ErrorMessage from "@/components/error-message";

export default async function RecipesPage() {
	try {
		const recipes = await fetchRecipes();

		if (recipes.length === 0) {
			return <NoRecipesFound />;
		}

		return <RecipesGrid recipes={recipes} />;
	} catch (error) {
		return (
			<ErrorMessage
				title="Error Loading Recipes"
				description={
					error instanceof Error
						? error.message
						: "An error occurred while fetching recipes"
				}
			/>
		);
	}
}
