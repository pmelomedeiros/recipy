import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipy - All Recipes",
  description: "Browse and discover delicious recipes from our community",
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            All Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover delicious recipes from our community
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}