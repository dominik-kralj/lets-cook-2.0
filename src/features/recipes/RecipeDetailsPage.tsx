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
		<div className="px-6">
			<Skeleton className="mb-4 h-9 w-20" />
			<Skeleton className="mb-2 h-10 w-1/2" />
			<Skeleton className="mb-8 h-5 w-3/4" />
			<div className="grid gap-8 md:grid-cols-2">
				<Skeleton className="h-48 w-full" />
				<Skeleton className="h-48 w-full" />
			</div>
		</div>
	)
}

function RecipeDetailsError({ refetch }: { refetch: UseQueryResult["refetch"] }) {
	return (
		<div className="flex flex-col items-center gap-4 p-6">
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

	if (!data) return null
	if (isLoading) return <RecipeDetailsSkeleton />
	if (isError) return <RecipeDetailsError refetch={refetch} />

	return (
		<div className="flex-1 px-6 pb-10">
			<Button variant="ghost" onClick={() => navigate("/recipes")} className="mb-4 -ml-3">
				<ArrowLeft className="size-4" />
				Back
			</Button>
			{data.image_url && (
				<img src={data.image_url} alt={data.name} className="mb-6 h-48 w-full rounded-xl object-cover sm:h-64" />
			)}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0">
					<h1 className="break-words text-2xl font-bold sm:text-3xl">{data.name}</h1>
					{data.description && <p className="mt-2 text-muted-foreground">{data.description}</p>}
				</div>
				<div className="flex shrink-0 gap-2">
					<AddToCollectionButton recipeId={data.id} />
					<EditRecipeModal recipe={data} />
				</div>
			</div>
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
		</div>
	)
}

export default RecipeDetailsPage
