import { supabase } from "@/services/supabase"
import { recipeSchema, type CreateRecipe } from "./validation/schema"
import z from "zod"

export const getRecipes = async () => {
	const { data, error } = await supabase.from("recipes").select()

	if (error) throw error

	const validatedData = z.array(recipeSchema).parse(data)

	return validatedData
}

export const createRecipe = async (data: CreateRecipe, user_id: string) => {
	const { name, description, image_url } = data

	const { error } = await supabase.from("recipes").insert({
		name,
		description,
		image_url,
		user_id,
	})

	if (error) throw error
}
