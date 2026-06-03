import { useRecipeForm } from "../context/RecipeFormContext"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { useRecipes } from "../hooks/useRecipes"
import type { Ingredient, Step } from "../validation/schema"
import { toast } from "sonner"
import { IngredientsSection } from "./IngredientsSection"
import { StepsSection } from "./StepsSection"

type Props = {
	recipeId: string
	ingredients: Ingredient[]
	steps: Step[]
	isDeletingIngredient: boolean
	isDeletingStep: boolean
	onDeleteIngredient: (id: string) => void
	onDeleteStep: (id: string) => void
}

export function RecipeFormContent({ recipeId, ingredients, steps, isDeletingIngredient, isDeletingStep, onDeleteIngredient, onDeleteStep }: Props) {
	const { ingredients: pending_ingredients, steps: pending_steps, removeIngredient, removeStep, reset } = useRecipeForm()
	const { addIngredients, isAddingIngredients, addSteps, isAddingSteps } = useRecipes()

	const hasChanges = pending_ingredients.length > 0 || pending_steps.length > 0
	const isSaving = isAddingIngredients || isAddingSteps

	const handleSave = () => {
		addIngredients({ recipeId, ingredients: pending_ingredients })
		addSteps({ recipeId, steps: pending_steps, currentStepsCount: steps.length })
		toast.success("Changes saved!")
		reset()
	}

	return (
		<>
			<div className="grid gap-6 md:grid-cols-2">
				<IngredientsSection
					recipeId={recipeId}
					ingredients={ingredients}
					pendingIngredients={pending_ingredients}
					isDeletingIngredient={isDeletingIngredient}
					onDeleteIngredient={onDeleteIngredient}
					onRemovePending={removeIngredient}
				/>
				<StepsSection
					recipeId={recipeId}
					steps={steps}
					pendingSteps={pending_steps}
					isDeletingStep={isDeletingStep}
					onDeleteStep={onDeleteStep}
					onRemovePending={removeStep}
				/>
			</div>
			<div className="mt-4">
				<Button className="w-full" disabled={!hasChanges || isSaving} onClick={handleSave}>
					{isSaving ? <Spinner className="size-4" /> : "Save Changes"}
				</Button>
			</div>
		</>
	)
}
