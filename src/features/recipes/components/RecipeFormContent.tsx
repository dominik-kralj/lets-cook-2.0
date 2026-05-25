import { useRecipeForm } from "../context/RecipeFormContext"
import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import { Spinner } from "@/shared/components/ui/spinner"
import AddIngredientsForm from "./AddIngredientsForm"
import AddStepsForm from "./AddStepsForm"
import { useAddIngredients } from "../hooks/useAddIngredients"
import { useAddSteps } from "../hooks/useAddSteps"
import type { Ingredient, Step } from "../validation/schema"
import EditIngredientModal from "./EditIngredientModal"
import EditStepModal from "./EditStepModal"

type Props = {
	recipeId: string
	ingredients: Ingredient[]
	steps: Step[]
	isDeletingIngredient: boolean
	isDeletingStep: boolean
	onDeleteIngredient: (id: string) => void
	onDeleteStep: (id: string) => void
}

export function RecipeFormContent({
	recipeId,
	ingredients,
	steps,
	isDeletingIngredient,
	isDeletingStep,
	onDeleteIngredient,
	onDeleteStep,
}: Props) {
	const {
		ingredients: pending_ingredients,
		steps: pending_steps,
		removeIngredient,
		removeStep,
		reset,
	} = useRecipeForm()
	const { mutate: addIngredients, isPending: isSavingIngredients } =
		useAddIngredients()
	const { mutate: addSteps, isPending: isSavingSteps } = useAddSteps()

	const hasChanges =
		pending_ingredients.length > 0 || pending_steps.length > 0
	const isSaving = isSavingIngredients || isSavingSteps

	const handleSave = () => {
		addIngredients({ recipeId, ingredients: pending_ingredients })
		addSteps({
			recipeId,
			steps: pending_steps,
			currentStepsCount: steps.length,
		})
		reset()
	}

	return (
		<>
			<div className="grid gap-6 md:grid-cols-2">
				<div className="flex flex-col gap-4 rounded-xl border p-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">Ingredients</h2>
						<AddIngredientsForm />
					</div>
					{!ingredients.length ? (
						<p className="text-sm text-muted-foreground">
							No ingredients yet
						</p>
					) : (
						<ul className="space-y-2">
							{ingredients.map((ingredient) => (
								<li
									key={ingredient.id}
									className="flex items-center justify-between text-sm"
								>
									<span>
										<span className="font-medium">
											{ingredient.quantity}{" "}
											{ingredient.unit}
										</span>{" "}
										{ingredient.name}
									</span>
									<div className="flex gap-1">
										<EditIngredientModal
											ingredient={ingredient}
											recipeId={recipeId}
										/>
										<Button
											variant="ghost"
											size="icon"
											className="size-7"
											disabled={isDeletingIngredient}
											onClick={() =>
												onDeleteIngredient(
													ingredient.id,
												)
											}
										>
											<Trash2 className="size-3 text-destructive" />
										</Button>
									</div>
								</li>
							))}
						</ul>
					)}
					{pending_ingredients.length > 0 && (
						<div className="border-t pt-2">
							<p className="mb-1 text-xs text-muted-foreground">
								Pending:
							</p>
							<div className="flex flex-wrap gap-1">
								{pending_ingredients.map((ing, index) => (
									<span
										key={index}
										className="inline-flex items-center gap-1 text-xs text-muted-foreground"
									>
										{ing.quantity} {ing.unit} {ing.name}
										<button
											onClick={() =>
												removeIngredient(index)
											}
											className="hover:text-destructive"
										>
											×
										</button>
										{index <
											pending_ingredients.length - 1 && (
											<span>,</span>
										)}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-col gap-4 rounded-xl border p-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">Steps</h2>
						<AddStepsForm />
					</div>
					{!steps.length ? (
						<p className="text-sm text-muted-foreground">
							No steps yet
						</p>
					) : (
						<ol className="space-y-3">
							{steps
								.sort((a, b) => a.order - b.order)
								.map((step, index) => (
									<li
										key={step.id}
										className="flex items-center gap-3 text-sm"
									>
										<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
											{index + 1}
										</span>
										<span className="flex-1">
											{step.description}
										</span>
										<div className="flex gap-1">
											<EditStepModal
												step={step}
												recipeId={recipeId}
											/>
											<Button
												variant="ghost"
												size="icon"
												className="size-7"
												disabled={isDeletingStep}
												onClick={() =>
													onDeleteStep(step.id)
												}
											>
												<Trash2 className="size-3 text-destructive" />
											</Button>
										</div>
									</li>
								))}
						</ol>
					)}
					{pending_steps.length > 0 && (
						<div className="border-t pt-2">
							<p className="mb-1 text-xs text-muted-foreground">
								Pending:
							</p>
							<div className="flex flex-wrap gap-1">
								{pending_steps.map((step, index) => (
									<span
										key={index}
										className="inline-flex items-center gap-1 text-xs text-muted-foreground"
									>
										{index + 1}. {step.description}
										<button
											onClick={() => removeStep(index)}
											className="hover:text-destructive"
										>
											×
										</button>
										{index < pending_steps.length - 1 && (
											<span>,</span>
										)}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="mt-4">
				<Button
					className="w-full"
					disabled={!hasChanges || isSaving}
					onClick={handleSave}
				>
					{isSaving ? <Spinner className="size-4" /> : "Save Changes"}
				</Button>
			</div>
		</>
	)
}
