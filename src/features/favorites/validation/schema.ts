import { recipeSchema } from "@/features/recipes/validation/schema"
import z, { string, uuid } from "zod"

export const favoriteSchema = z.object({
	id: uuid(),
	user_id: uuid(),
	recipe_id: uuid(),
	created_at: string(),
	recipes: recipeSchema.optional(),
})

export type Favorite = z.infer<typeof favoriteSchema>
