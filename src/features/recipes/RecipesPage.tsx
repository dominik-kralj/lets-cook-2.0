import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import { useGetAllRecipes } from "./hooks/useRecipes"

function RecipesPage() {
	const { data, isLoading, error } = useGetAllRecipes()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Something went wrong</div>
	if (!data?.length) return <div>No recipes yet</div>

	return (
		<div className="p-6">
			<h1 className="mb-6 text-2xl font-bold">My Recipes</h1>

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
