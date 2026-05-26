import { supabase } from "@/services/supabase"
import z from "zod"
import { favoriteSchema } from "./validation/schema"

export const getFavorites = async () => {
	const { data, error } = await supabase
		.from("favorites")
		.select(`*, recipes(*)`)
	if (error) throw error
	return z.array(favoriteSchema).parse(data)
}

export const addFavorite = async (recipe_id: string, user_id: string) => {
	const { error } = await supabase
		.from("favorites")
		.insert({ recipe_id, user_id })
	if (error) throw error
}

export const deleteFavorite = async (recipe_id: string) => {
	const { error } = await supabase
		.from("favorites")
		.delete()
		.eq("recipe_id", recipe_id)
	if (error) throw error
}
