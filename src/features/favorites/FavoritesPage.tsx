import RecipeCard from "@/features/recipes/components/RecipeCard"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { useFavorites } from "./hooks/useFavorites"

function FavoritesLoadingSkeleton() {
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

function FavoritesPage() {
	const { favorites, isLoading } = useFavorites()

	return (
		<div>
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 border-b bg-background px-6 py-4">
				<h1 className="text-2xl font-bold">Favorites</h1>
			</div>
			{isLoading ? (
				<FavoritesLoadingSkeleton />
			) : !favorites?.length ? (
				<p className="text-muted-foreground">No favorites yet — heart a recipe to save it here.</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{favorites.map(
						(favorite) =>
							favorite.recipes && (
								<RecipeCard key={favorite.id} recipe={favorite.recipes} showActions={false} />
							),
					)}
				</div>
			)}
		</div>
	)
}

export default FavoritesPage
