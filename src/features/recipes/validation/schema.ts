import { z, string, uuid, number } from "zod"

export const ingredientSchema = z.object({
	id: uuid(),
	recipe_id: uuid(),
	name: string(),
	quantity: number(),
	unit: string(),
})
export const createIngredientFormSchema = z.object({
	name: string().min(1, { message: "Name is required" }),
	quantity: number().min(0),
	unit: string().min(1, { message: "Unit is required" }),
})

export const stepSchema = z.object({
	id: uuid(),
	recipe_id: uuid(),
	order: number(),
	description: string().optional(),
})
export const createStepFormSchema = z.object({
	description: string().min(1, { message: "Description is required" }),
})

export const recipeSchema = z.object({
	id: uuid(),
	name: string(),
	description: string().optional(),
	user_id: string(),
	created_at: string(),
	image_url: string().nullable().optional(),
	ingredients: z.array(ingredientSchema).optional(),
	steps: z.array(stepSchema).optional(),
	image_path: string().nullable().optional(),
})

export const createRecipeFormSchema = z.object({
	name: string().min(1, { message: "Name is required" }),
	description: string().optional(),
	image_url: string().nullable().optional(),
	image_path: string().nullable().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type Ingredient = z.infer<typeof ingredientSchema>
export type Step = z.infer<typeof stepSchema>

export type CreateRecipeForm = z.infer<typeof createRecipeFormSchema>
export type CreateIngredientForm = z.infer<typeof createIngredientFormSchema>
export type CreateStepForm = z.infer<typeof createStepFormSchema>

export type editRecipePayload = {
	id: string
	data: CreateRecipeForm
	oldImagePath?: string | null
}
export type DeleteRecipePayload = {
	id: string
	image_path?: string
}
