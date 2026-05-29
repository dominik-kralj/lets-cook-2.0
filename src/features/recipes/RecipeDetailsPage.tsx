import { useParams, useNavigate } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useGetRecipe } from "./hooks/useRecipe"
import { Skeleton } from "@/shared/components/ui/skeleton"

import { RecipeFormProvider } from "./context/RecipeFormProvider"

import { useDeleteStep } from "./hooks/useDeleteStep"
import { useDeleteIngredient } from "./hooks/useDeleteIngredient"
import { RecipeFormContent } from "./components/RecipeFormContent"
import { AddToCollectionButton } from "./components/AddToCollectionsButton"
import { EditRecipeModal } from "./components/EditRecipeModal"

function RecipeDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isLoading, isError, refetch } = useGetRecipe(id)

	const { mutate: deleteIngredient, isPending: isDeletingIngredient } =
		useDeleteIngredient(id)
	const { mutate: deleteStep, isPending: isDeletingStep } = useDeleteStep(id)

	if (!data) return null

	if (isLoading)
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

	if (isError)
		return (
			<div className="flex flex-col items-center gap-4 p-6">
				<p>Something went wrong</p>
				<Button onClick={() => refetch()}>Try again</Button>
			</div>
		)

	return (
		<div className="h-100 flex-1 px-6 pb-10">
			<Button
				variant="ghost"
				onClick={() => navigate("/recipes")}
				className="mb-4 -ml-3"
			>
				<ArrowLeft className="size-4" />
				Back
			</Button>

			{data.image_url && (
				<img
					src={data.image_url}
					alt={data.name}
					className="mb-6 h-64 w-full rounded-xl object-cover"
				/>
			)}

			<div className="mb-8 flex items-start justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold">{data.name}</h1>
					{data.description && (
						<p className="mt-2 text-muted-foreground">
							{data.description}
						</p>
					)}
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
