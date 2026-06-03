import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { useRecipes } from "./hooks/useRecipes"
import { AddRecipeModal } from "./components/AddRecipeModal"
import { Skeleton } from "@/shared/components/ui/skeleton"
import RecipeCard from "./components/RecipeCard"

function RecipesLoadingSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={i}>
					<CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
					<CardContent>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="mt-2 h-4 w-2/3" />
					</CardContent>
				</Card>
			))}
		</div>
	)
}

function RecipesPage() {
	const { recipes: data, isLoading, isError } = useRecipes()

	if (isError) return <div>Something went wrong</div>

	return (
		<div>
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 flex items-center justify-between border-b bg-background px-6 py-4">
				<h1 className="text-2xl font-bold">My Recipes</h1>
				<AddRecipeModal />
			</div>
			{isLoading ? (
				<RecipesLoadingSkeleton />
			) : !data?.length ? (
				<p className="text-muted-foreground">No recipes yet</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			)}
		</div>
	)
}

export default RecipesPage
