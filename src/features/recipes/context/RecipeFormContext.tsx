import { createContext, useContext } from "react"
import type { CreateIngredientForm, CreateStepForm } from "../validation/schema"

export type RecipeFormContext = {
	ingredients: CreateIngredientForm[]
	steps: CreateStepForm[]
	addIngredient: (ingredient: CreateIngredientForm) => void
	addStep: (step: CreateStepForm) => void
	removeIngredient: (index: number) => void
	removeStep: (index: number) => void
}

export const RecipeFormContext = createContext<RecipeFormContext | null>(null)

export function useRecipeForm() {
	const ctx = useContext(RecipeFormContext)
	if (!ctx)
		throw new Error("useRecipeForm must be used within RecipeFormProvider")
	return ctx
}
