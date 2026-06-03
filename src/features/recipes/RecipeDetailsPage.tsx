import { useParams, useNavigate } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useGetRecipe, useRecipes } from "./hooks/useRecipes"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { RecipeFormProvider } from "./context/RecipeFormProvider"
import { RecipeFormContent } from "./components/RecipeFormContent"
import { AddToCollectionButton } from "./components/AddToCollectionsButton"
import { EditRecipeModal } from "./components/EditRecipeModal"
import type { UseQueryResult } from "@tanstack/react-query"

function RecipeDetailsSkeleton() {
	return (
		<>
			<Skeleton className="mb-2 h-8 w-1/2" />
			<Skeleton className="mb-8 h-5 w-3/4" />
			<div className="grid gap-8 md:grid-cols-2">
				<Skeleton className="h-48 w-full" />
				<Skeleton className="h-48 w-full" />
			</div>
		</>
	)
}

function RecipeDetailsError({ refetch }: { refetch: UseQueryResult["refetch"] }) {
	return (
		<div className="flex flex-col items-center gap-4">
			<p>Something went wrong</p>
			<Button onClick={() => refetch()}>Try again</Button>
		</div>
	)
}

function RecipeDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError, refetch } = useGetRecipe(id)
	const { deleteIngredient, isDeletingIngredient, deleteStep, isDeletingStep } = useRecipes(id)

	return (
		<div className="pb-10">
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 flex items-center gap-2 border-b bg-background px-4 py-3">
				<Button variant="ghost" size="icon" onClick={() => navigate("/recipes")} className="-ml-1 shrink-0">
					<ArrowLeft className="size-4" />
				</Button>
				{data && (
					<>
						<span className="min-w-0 flex-1 truncate font-semibold">{data.name}</span>
						<div className="flex shrink-0 gap-2">
							<AddToCollectionButton recipeId={data.id} />
							<EditRecipeModal recipe={data} />
						</div>
					</>
				)}
			</div>
			{isLoading ? <RecipeDetailsSkeleton /> : isError ? <RecipeDetailsError refetch={refetch} /> : !data ? null : (
				<>
					{data.image_url && (
						<img src={data.image_url} alt={data.name} className="mb-6 h-48 w-full rounded-xl object-cover sm:h-64" />
					)}
					{data.description && <p className="mb-8 text-muted-foreground">{data.description}</p>}
					<RecipeFormProvider>
						<RecipeFormContent
							ingredients={data.ingredients ?? []}
							steps={data.steps ?? []}
							isDeletingIngredient={isDeletingIngredient}
							isDeletingStep={isDeletingStep}
							onDeleteIngredient={deleteIngredient}
							onDeleteStep={deleteStep}
							recipeId={data.id}
						/>
					</RecipeFormProvider>
				</>
			)}
		</div>
	)
}

export default RecipeDetailsPage
