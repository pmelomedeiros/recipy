import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Recipes - Recipy",
  description: "Browse and discover delicious recipes from our community",
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}