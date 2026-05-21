import { useParams, useNavigate } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useGetRecipe } from "./hooks/useRecipe"
import { Skeleton } from "@/shared/components/ui/skeleton"
import AddIngredientsForm from "./components/AddIngredientsForm"
import AddStepsForm from "./components/AddStepsForm"
import { RecipeFormProvider } from "./context/RecipeFormProvider"
import { useAddIngredients } from "./hooks/useAddIngredients"
import { useAddSteps } from "./hooks/useAddSteps"
import type { CreateIngredientForm, CreateStepForm } from "./validation/schema"

function RecipeDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isLoading, isError, refetch } = useGetRecipe(id)
	const { mutate: addIngredient } = useAddIngredients()
	const { mutate: addSteps } = useAddSteps()

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

	const handleSave = (
		ingredients: CreateIngredientForm[],
		steps: CreateStepForm[],
	) => {
		if (ingredients.length > 0) {
			addIngredient({ recipeId: data.id, ingredients })
		}
		if (steps.length > 0) {
			addSteps({
				recipeId: data.id,
				steps,
				currentStepsCount: data.steps?.length ?? 0,
			})
		}
	}

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

			<div className="mb-8">
				<h1 className="text-3xl font-bold">{data.name}</h1>
				{data.description && (
					<p className="mt-2 text-muted-foreground">
						{data.description}
					</p>
				)}
			</div>

			<RecipeFormProvider onSave={handleSave}>
				<div className="grid gap-6 md:grid-cols-2">
					<div className="flex flex-col gap-4 rounded-xl border p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">
								Ingredients
							</h2>
							<AddIngredientsForm />
						</div>
						{!data.ingredients?.length ? (
							<p className="text-sm text-muted-foreground">
								No ingredients yet
							</p>
						) : (
							<ul className="space-y-2">
								{data.ingredients.map((ingredient) => (
									<li
										key={ingredient.id}
										className="flex items-center gap-2 text-sm"
									>
										<span className="font-medium">
											{ingredient.quantity}{" "}
											{ingredient.unit}
										</span>
										<span>{ingredient.name}</span>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="flex flex-col gap-4 rounded-xl border p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Steps</h2>
							<AddStepsForm />
						</div>
						{!data.steps?.length ? (
							<p className="text-sm text-muted-foreground">
								No steps yet
							</p>
						) : (
							<ol className="space-y-3">
								{data.steps
									.sort((a, b) => a.order - b.order)
									.map((step) => (
										<li
											key={step.id}
											className="flex gap-3 text-sm"
										>
											<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
												{step.order}
											</span>
											<span className="pt-0.5">
												{step.description}
											</span>
										</li>
									))}
							</ol>
						)}
					</div>
				</div>
			</RecipeFormProvider>
		</div>
	)
}

export default RecipeDetailsPage
