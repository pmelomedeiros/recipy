"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Recipe, RecipeDifficulty } from "../../types/recipe";
import { updateRecipe } from "../../api/update-recipe";

interface EditRecipeFormProps {
	recipe: Recipe;
}

interface RecipeFormData {
	title: string;
	description: string;
	instructions: Array<{ value: string }>;
	prepTime: number;
	cookTime: number;
	servings: number;
	difficulty: RecipeDifficulty;
	ingredients: Array<{
		quantity: string;
		unit: string;
		ingredientName: string;
	}>;
}

export function EditRecipeForm({ recipe }: EditRecipeFormProps) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<RecipeFormData>({
		defaultValues: {
			title: recipe.title,
			description: recipe.description || "",
			instructions: recipe.instructions.map(instruction => ({ value: instruction })),
			prepTime: recipe.prepTime || 0,
			cookTime: recipe.cookTime || 0,
			servings: recipe.servings || 1,
			difficulty: recipe.difficulty,
			ingredients: recipe.recipeIngredients.map((ri) => ({
				quantity: ri.quantity,
				unit: ri.unit || "",
				ingredientName: ri.ingredient.name,
			})),
		},
	});

	const ingredientFieldArray = useFieldArray({
		control,
		name: "ingredients" as const,
	});

	const instructionFieldArray = useFieldArray({
		control,
		name: "instructions" as const,
	});

	const ingredientFields = ingredientFieldArray.fields;
	const appendIngredient = ingredientFieldArray.append;
	const removeIngredient = ingredientFieldArray.remove;

	const instructionFields = instructionFieldArray.fields;
	const appendInstruction = instructionFieldArray.append;
	const removeInstruction = instructionFieldArray.remove;

	const onSubmit = async (data: RecipeFormData) => {
		try {
			const updateData = {
				title: data.title,
				description: data.description,
				instructions: data.instructions.map(inst => inst.value).filter(Boolean),
				prepTime: data.prepTime,
				cookTime: data.cookTime,
				servings: data.servings,
				difficulty: data.difficulty,
				ingredients: data.ingredients.map(ing => ({
					quantity: ing.quantity,
					unit: ing.unit,
					ingredientName: ing.ingredientName,
				})).filter(ing => ing.quantity && ing.ingredientName),
			};

			await updateRecipe(recipe.id, updateData);
			router.push(`/recipes/${recipe.id}`);
		} catch (error) {
			console.error("Error saving recipe:", error);
			alert("Failed to save recipe. Please try again.");
		}
	};

	const handleReset = () => {
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Basic Info */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Basic Information</h2>

				<div>
					<label htmlFor="title" className="block text-sm font-medium mb-1">
						Recipe Title *
					</label>
					<input
						id="title"
						{...register("title", { required: "Title is required" })}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.title && (
						<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium mb-1"
					>
						Description
					</label>
					<textarea
						id="description"
						{...register("description")}
						rows={3}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label
							htmlFor="prepTime"
							className="block text-sm font-medium mb-1"
						>
							Prep Time (minutes)
						</label>
						<input
							id="prepTime"
							type="number"
							{...register("prepTime", { min: 0 })}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="cookTime"
							className="block text-sm font-medium mb-1"
						>
							Cook Time (minutes)
						</label>
						<input
							id="cookTime"
							type="number"
							{...register("cookTime", { min: 0 })}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="servings"
							className="block text-sm font-medium mb-1"
						>
							Servings
						</label>
						<input
							id="servings"
							type="number"
							{...register("servings", { min: 1 })}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="difficulty"
						className="block text-sm font-medium mb-1"
					>
						Difficulty
					</label>
					<select
						id="difficulty"
						{...register("difficulty")}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value={RecipeDifficulty.EASY}>Easy</option>
						<option value={RecipeDifficulty.MEDIUM}>Medium</option>
						<option value={RecipeDifficulty.HARD}>Hard</option>
					</select>
				</div>
			</div>

			{/* Ingredients */}
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Ingredients</h2>
					<button
						type="button"
						onClick={() =>
							appendIngredient({ quantity: "", unit: "", ingredientName: "" })
						}
						className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
					>
						Add Ingredient
					</button>
				</div>

				{ingredientFields.map((field, index) => (
					<div key={field.id} className="flex gap-2 items-start">
						<div className="flex-1">
							<input
								{...register(`ingredients.${index}.quantity` as const)}
								placeholder="Quantity"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="flex-1">
							<input
								{...register(`ingredients.${index}.unit` as const)}
								placeholder="Unit (e.g., cups, tbsp)"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="flex-2">
							<input
								{...register(`ingredients.${index}.ingredientName` as const)}
								placeholder="Ingredient name"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<button
							type="button"
							onClick={() => removeIngredient(index)}
							className="bg-red-500 text-white px-2 py-2 rounded text-sm hover:bg-red-600"
						>
							Remove
						</button>
					</div>
				))}
			</div>

			{/* Instructions */}
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">Instructions</h2>
					<button
						type="button"
						onClick={() => appendInstruction({ value: "" })}
						className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
					>
						Add Step
					</button>
				</div>

				{instructionFields.map((field, index) => (
					<div key={field.id} className="flex gap-2 items-start">
						<span className="text-sm font-medium text-gray-500 mt-2 min-w-[3rem]">
							Step {index + 1}:
						</span>
						<textarea
							{...register(`instructions.${index}.value` as const)}
							rows={2}
							className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							type="button"
							onClick={() => removeInstruction(index)}
							className="bg-red-500 text-white px-2 py-2 rounded text-sm hover:bg-red-600"
						>
							Remove
						</button>
					</div>
				))}
			</div>

			{/* Form Actions */}
			<div className="flex gap-4 pt-6 border-t">
				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Saving..." : "Save Recipe"}
				</button>

				<button
					type="button"
					onClick={handleReset}
					disabled={!isDirty || isSubmitting}
					className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
				>
					Reset Changes
				</button>

				<button
					type="button"
					onClick={() => router.push(`/recipes/${recipe.id}`)}
					disabled={isSubmitting}
					className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
