import { z, string, uuid } from "zod"

export const recipeSchema = z.object({
	id: uuid(),
	name: string(),
	description: string().optional(),
	user_id: string(),
	created_at: string(),
	image_url: string().nullable().optional(),
})

export type Recipe = z.infer<typeof recipeSchema>
