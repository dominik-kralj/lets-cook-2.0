import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import { useGetAllRecipes } from "./hooks/useRecipes"
import { AddRecipeModal } from "./components/AddRecipeModal"
import { Skeleton } from "@/shared/components/ui/skeleton"

function RecipesPage() {
	const { data, isLoading, error } = useGetAllRecipes()

	if (isLoading)
		return (
			<div className="px-6">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-2xl font-bold">My Recipes</h1>
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
	if (error) return <div>Something went wrong</div>
	if (!data?.length) return <div>No recipes yet</div>

	return (
		<div className="px-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">My Recipes</h1>
				<AddRecipeModal />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{data.map(({ id, name, description }) => (
					<Card key={id}>
						<CardHeader>
							<CardTitle>{name}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>{description}</CardDescription>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

export default RecipesPage
