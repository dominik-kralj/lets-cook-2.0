import { z, string, uuid } from "zod"

export const recipeSchema = z.object({
	id: uuid(),
	name: string(),
	description: string().optional(),
	user_id: string(),
	created_at: string(),
	image_url: string().nullable().optional(),
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
