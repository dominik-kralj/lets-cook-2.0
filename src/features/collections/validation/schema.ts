import { recipeSchema } from "@/features/recipes/validation/schema"
import { z, string, uuid } from "zod"

export const collectionSchema = z.object({
	id: uuid(),
	user_id: uuid(),
	name: string(),
	description: string().nullish(),
	created_at: string(),
	collection_recipes: z
		.array(
			z.object({
				id: uuid(),
				collection_id: uuid(),
				recipe_id: uuid(),
				created_at: string(),
				recipes: recipeSchema.optional(),
			}),
		)
		.optional(),
})

export const collectionRecipes = z.object({
	id: uuid(),
	collection_id: uuid(),
	recipe_id: uuid(),
	created_at: string(),
})

export const createCollectionFormSchema = z.object({
	name: string(),
	description: string().optional(),
})

export type Collection = z.infer<typeof collectionSchema>
export type CollectionRecipe = z.infer<typeof collectionRecipes>
export type CreateCollectionForm = z.infer<typeof createCollectionFormSchema>
