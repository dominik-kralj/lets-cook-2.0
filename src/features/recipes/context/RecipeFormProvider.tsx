import { useState, type ReactNode } from "react"
import { RecipeFormContext } from "./RecipeFormContext"
import type { CreateIngredientForm, CreateStepForm } from "../validation/schema"
import { Button } from "@/shared/components/ui/button"

type Props = {
	children: ReactNode
	onSave: (
		ingredients: CreateIngredientForm[],
		steps: CreateStepForm[],
	) => void
}

export function RecipeFormProvider({ children, onSave }: Props) {
	const [ingredients, setIngredients] = useState<CreateIngredientForm[]>([])
	const [steps, setSteps] = useState<CreateStepForm[]>([])

	const addIngredient = (ingredient: CreateIngredientForm) =>
		setIngredients((prev) => [...prev, ingredient])

	const addStep = (step: CreateStepForm) =>
		setSteps((prev) => [...prev, step])

	const removeIngredient = (index: number) =>
		setIngredients((prev) => prev.filter((_, i) => i !== index))

	const removeStep = (index: number) =>
		setSteps((prev) => prev.filter((_, i) => i !== index))

	const hasChanges = ingredients.length > 0 || steps.length > 0

	return (
		<RecipeFormContext
			value={{
				ingredients,
				steps,
				addIngredient,
				addStep,
				removeIngredient,
				removeStep,
			}}
		>
			{children}
			{hasChanges && (
				<div className="mt-6 border-t pt-4">
					<Button
						className="w-full"
						onClick={() => onSave(ingredients, steps)}
					>
						Save Changes
					</Button>
				</div>
			)}
		</RecipeFormContext>
	)
}
