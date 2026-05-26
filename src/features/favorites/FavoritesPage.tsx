import RecipeCard from "@/features/recipes/components/RecipeCard"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { useFavorites } from "./hooks/useFavorites"

function FavoritesPage() {
	const { favorites, isLoading } = useFavorites()

	if (isLoading)
		return (
			<div className="px-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold">Favorites</h1>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-3/4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-full" />
								<Skeleton className="mt-2 h-4 w-2/3" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		)

	if (!favorites?.length)
		return (
			<div className="px-6">
				<h1 className="mb-6 text-2xl font-bold">Favorites</h1>
				<p className="text-muted-foreground">
					No favorites yet — heart a recipe to save it here.
				</p>
			</div>
		)

	return (
		<div className="px-6">
			<h1 className="mb-6 text-2xl font-bold">Favorites</h1>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{favorites.map(
					(favorite) =>
						favorite.recipes && (
							<RecipeCard
								key={favorite.id}
								recipe={favorite.recipes}
								showActions={false}
							/>
						),
				)}
			</div>
		</div>
	)
}

export default FavoritesPage
