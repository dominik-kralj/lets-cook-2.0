import { useState, type ReactNode } from "react"
import { RecipeFormContext } from "./RecipeFormContext"
import type { CreateIngredientForm, CreateStepForm } from "../validation/schema"

type Props = {
	children: ReactNode
}

export function RecipeFormProvider({ children }: Props) {
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

	const reset = () => {
		setIngredients([])
		setSteps([])
	}

	return (
		<RecipeFormContext
			value={{
				ingredients,
				steps,
				addIngredient,
				addStep,
				removeIngredient,
				removeStep,
				reset,
			}}
		>
			{children}
		</RecipeFormContext>
	)
}
