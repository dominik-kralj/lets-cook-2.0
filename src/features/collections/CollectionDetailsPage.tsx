import { useParams, useNavigate } from "react-router"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useGetCollection, useCollections } from "./hooks/useCollections"
import { useRecipes } from "@/features/recipes/hooks/useRecipes"
import RecipeCard from "@/features/recipes/components/RecipeCard"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { useState } from "react"
import type { Collection } from "./validation/schema"

function AddRecipeDialog({ collectionId }: { collectionId: string }) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState("")
	const { recipes } = useRecipes()
	const { addRecipe } = useCollections()
	const filtered = recipes?.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())) ?? []

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button size="sm"><Plus className="size-4" />Add Recipe</Button>} />
			<DialogContent>
				<DialogHeader><DialogTitle>Add Recipe to Collection</DialogTitle></DialogHeader>
				<Input placeholder="Search recipes..." value={search} onChange={(e) => setSearch(e.target.value)} autoComplete="off" />
				<div className="mt-2 flex max-h-64 flex-col gap-2 overflow-y-auto">
					{filtered.map((recipe) => (
						<div key={recipe.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
							<span className="min-w-0 truncate">{recipe.name}</span>
							<Button size="sm" variant="outline" className="shrink-0" onClick={() => { addRecipe({ collection_id: collectionId, recipe_id: recipe.id }); setOpen(false) }}>
								Add
							</Button>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

function CollectionRecipeGrid({ data, onRemove }: { data: Collection; onRemove: (args: { collection_id: string; recipe_id: string }) => void }) {
	if (!data.collection_recipes?.length) {
		return <p className="text-muted-foreground">No recipes in this collection yet.</p>
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.collection_recipes.map((cr) =>
				cr.recipes && (
					<div key={cr.id} className="relative">
						<RecipeCard recipe={cr.recipes} showActions={false} />
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-2 right-2 size-7"
							onClick={() => onRemove({ collection_id: data.id, recipe_id: cr.recipe_id })}
						>
							<X className="size-3 text-destructive" />
						</Button>
					</div>
				),
			)}
		</div>
	)
}

function CollectionDetailSkeleton() {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
		</div>
	)
}

function CollectionDetailPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError, refetch } = useGetCollection(id ?? "")
	const { removeRecipe } = useCollections()

	return (
		<div className="pb-10">
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 flex items-center gap-2 border-b bg-background px-4 py-3">
				<Button variant="ghost" size="icon" onClick={() => navigate("/collections")} className="-ml-1 shrink-0">
					<ArrowLeft className="size-4" />
				</Button>
				{data && (
					<>
						<span className="min-w-0 flex-1 truncate font-semibold">{data.name}</span>
						<AddRecipeDialog collectionId={data.id} />
					</>
				)}
			</div>
			{isLoading ? <CollectionDetailSkeleton /> : isError ? (
				<div className="flex flex-col items-center gap-4">
					<p>Something went wrong</p>
					<Button onClick={() => refetch()}>Try again</Button>
				</div>
			) : !data ? null : (
				<>
					{data.description && <p className="mb-6 text-muted-foreground">{data.description}</p>}
					<CollectionRecipeGrid data={data} onRemove={removeRecipe} />
				</>
			)}
		</div>
	)
}

export default CollectionDetailPage
