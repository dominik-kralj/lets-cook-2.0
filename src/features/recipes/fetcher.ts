import { supabase } from "@/services/supabase"
import { recipeSchema } from "./validation/schema"
import z from "zod"

export const getRecipes = async () => {
	const { data, error } = await supabase.from("recipes").select()

	if (error) throw error

	const validatedData = z.array(recipeSchema).parse(data)

	return validatedData
}
