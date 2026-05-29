import { useParams, useNavigate } from "react-router"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useGetCollection } from "./hooks/useCollections"
import { useCollections } from "./hooks/useCollections"
import { useGetAllRecipes } from "@/features/recipes/hooks/useRecipes"
import RecipeCard from "@/features/recipes/components/RecipeCard"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { useState } from "react"

function AddRecipeDialog({ collectionId }: { collectionId: string }) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState("")
	const { data: recipes } = useGetAllRecipes()
	const { addRecipe } = useCollections()

	const filtered =
		recipes?.filter((r) =>
			r.name.toLowerCase().includes(search.toLowerCase()),
		) ?? []

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button size="sm">
						<Plus className="size-4" />
						Add Recipe
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Recipe to Collection</DialogTitle>
				</DialogHeader>
				<Input
					placeholder="Search recipes..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					autoComplete="off"
				/>
				<div className="mt-2 flex max-h-64 flex-col gap-2 overflow-y-auto">
					{filtered.map((recipe) => (
						<div
							key={recipe.id}
							className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
						>
							<span>{recipe.name}</span>
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									addRecipe({
										collection_id: collectionId,
										recipe_id: recipe.id,
									})
									setOpen(false)
								}}
							>
								Add
							</Button>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

function CollectionDetailPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError, refetch } = useGetCollection(id ?? "")
	const { removeRecipe } = useCollections()

	if (isLoading)
		return (
			<div className="px-6">
				<Skeleton className="mb-4 h-9 w-20" />
				<Skeleton className="mb-2 h-10 w-1/2" />
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="h-32 w-full" />
					))}
				</div>
			</div>
		)

	if (isError)
		return (
			<div className="flex flex-col items-center gap-4 p-6">
				<p>Something went wrong</p>
				<Button onClick={() => refetch()}>Try again</Button>
			</div>
		)

	if (!data) return null

	return (
		<div className="px-6 pb-10">
			<Button
				variant="ghost"
				onClick={() => navigate("/collections")}
				className="mb-4 -ml-3"
			>
				<ArrowLeft className="size-4" />
				Back
			</Button>

			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">{data.name}</h1>
					{data.description && (
						<p className="mt-1 text-muted-foreground">
							{data.description}
						</p>
					)}
				</div>
				<AddRecipeDialog collectionId={data.id} />
			</div>

			{!data.collection_recipes?.length ? (
				<p className="text-muted-foreground">
					No recipes in this collection yet.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.collection_recipes.map(
						(cr) =>
							cr.recipes && (
								<div key={cr.id} className="relative">
									<RecipeCard
										recipe={cr.recipes}
										showActions={false}
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute top-2 right-2 size-7"
										onClick={() =>
											removeRecipe({
												collection_id: data.id,
												recipe_id: cr.recipe_id,
											})
										}
									>
										<X className="size-3 text-destructive" />
									</Button>
								</div>
							),
					)}
				</div>
			)}
		</div>
	)
}

export default CollectionDetailPage
