import { z, string, uuid, number } from "zod"

export const ingredientSchema = z.object({
	id: uuid(),
	recipe_id: uuid(),
	name: string(),
	quantity: number(),
	unit: string(),
})

export const stepSchema = z.object({
	id: uuid(),
	recipe_id: uuid(),
	order: number(),
	description: string().optional(),
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
})

export const createRecipeSchema = z.object({
	name: string().min(1, { message: "Name is required" }),
	description: string().optional(),
	image_url: string().nullable().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type CreateRecipe = z.infer<typeof createRecipeSchema>
export type UpdateRecipePayload = {
	id: string
	data: CreateRecipe
}
export type Ingredient = z.infer<typeof ingredientSchema>
export type Step = z.infer<typeof stepSchema>
