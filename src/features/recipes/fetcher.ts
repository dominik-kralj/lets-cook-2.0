import { supabase } from "@/services/supabase"
import { recipeSchema, type CreateRecipeForm } from "./validation/schema"
import z from "zod"

export const getRecipes = async () => {
	const { data, error } = await supabase.from("recipes").select()
	if (error) throw error
	return z.array(recipeSchema).parse(data)
}

export const getRecipe = async (id: string) => {
	const { data, error } = await supabase
		.from("recipes")
		.select(`*, ingredients(*), steps(*)`)
		.eq("id", id)
		.single()
	if (error) throw error
	return recipeSchema.parse(data)
}

export const createRecipe = async (
	payload: CreateRecipeForm,
	user_id: string,
) => {
	const { name, description, image_url, image_path } = payload
	const { error } = await supabase.from("recipes").insert({
		name,
		description,
		image_url,
		user_id,
		image_path,
	})
	if (error) throw error
}

export const updateRecipe = async (
	id: string,
	payload: CreateRecipeForm,
	oldImagePath?: string | null,
) => {
	const { name, description, image_url, image_path } = payload

	if (oldImagePath && image_path && oldImagePath !== image_path) {
		await deleteImageFromStorage(oldImagePath)
	}

	const { error } = await supabase
		.from("recipes")
		.update({ name, description, image_url, image_path })
		.eq("id", id)
	if (error) throw error
}

export const deleteRecipe = async (recipe_id: string, image_path?: string) => {
	if (image_path) await deleteImageFromStorage(image_path)

	const { error } = await supabase
		.from("recipes")
		.delete()
		.eq("id", recipe_id)
	if (error) throw error
}

export const deleteImageFromStorage = async (image_path: string) => {
	const { error } = await supabase.storage
		.from("recipe-images")
		.remove([image_path])
	if (error) throw error
}

export const uploadRecipeImage = async (
	user_id: string,
	filename: string,
	file: File,
) => {
	const { error } = await supabase.storage
		.from("recipe-images")
		.upload(`${user_id}/${filename}`, file)
	if (error) throw error

	const { data } = supabase.storage
		.from("recipe-images")
		.getPublicUrl(`${user_id}/${filename}`)

	return {
		publicUrl: data.publicUrl,
		imagePath: `${user_id}/${filename}`,
	}
}
