"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { fetchRecipes } from "@/lib/api";
import RecipeCard from "@/components/recipe-card";

export default function RecipesPage() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadRecipes() {
			try {
				setLoading(true);
				setError(null);
				const fetchedRecipes = await fetchRecipes();
				setRecipes(fetchedRecipes);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "An error occurred while fetching recipes"
				);
				console.error("Error loading recipes:", err);
			} finally {
				setLoading(false);
			}
		}

		loadRecipes();
	}, []);

	if (loading) {
		return (
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }, (_, i) => (
					<div
						key={i}
						className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
					>
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
						<div className="grid grid-cols-2 gap-4 mb-4">
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
				<div className="flex items-center">
					<svg
						className="w-6 h-6 text-red-600 dark:text-red-400 mr-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 className="text-lg font-medium text-red-800 dark:text-red-200">
							Error Loading Recipes
						</h3>
						<p className="text-red-600 dark:text-red-400 mt-1">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Recipes Grid */}
			{recipes.length === 0 ? (
				<div className="text-center py-12">
					<svg
						className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
						No recipes yet
					</h3>
					<p className="text-gray-500 dark:text-gray-400">
						Be the first to add a recipe to the collection!
					</p>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{recipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			)}
		</>
	);
}
