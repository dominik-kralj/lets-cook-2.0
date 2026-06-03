import { supabase } from "@/services/supabase"
import {
	recipeSchema,
	type CreateIngredientForm,
	type CreateRecipeForm,
	type CreateStepForm,
} from "./validation/schema"
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

export const editRecipe = async ({
	id,
	payload,
	oldImagePath,
}: {
	id: string
	payload: CreateRecipeForm
	oldImagePath?: string | null
}) => {
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

export const uploadRecipeImage = async ({
	userId,
	filename,
	file,
}: {
	userId: string
	filename: string
	file: File
}) => {
	const { error } = await supabase.storage
		.from("recipe-images")
		.upload(`${userId}/${filename}`, file)
	if (error) throw error

	const { data } = supabase.storage
		.from("recipe-images")
		.getPublicUrl(`${userId}/${filename}`)

	return {
		publicUrl: data.publicUrl,
		imagePath: `${userId}/${filename}`,
	}
}

export const addIngredients = async (
	recipe_id: string,
	ingredients: CreateIngredientForm[],
) => {
	const { error } = await supabase.from("ingredients").insert(
		ingredients.map(({ name, quantity, unit }) => ({
			name,
			quantity,
			unit,
			recipe_id,
		})),
	)
	if (error) throw error
}

export const editIngredient = async (
	id: string,
	payload: CreateIngredientForm,
) => {
	const { name, quantity, unit } = payload
	const { error } = await supabase
		.from("ingredients")
		.update({ name, quantity, unit })
		.eq("id", id)
	if (error) throw error
}

export const deleteIngredient = async (ingredient_id: string) => {
	const { error } = await supabase
		.from("ingredients")
		.delete()
		.eq("id", ingredient_id)
	if (error) throw error
}

export const addSteps = async ({
	recipeId,
	steps,
	currentStepsCount,
}: {
	recipeId: string
	steps: CreateStepForm[]
	currentStepsCount: number
}) => {
	const { error } = await supabase.from("steps").insert(
		steps.map(({ description }, index) => ({
			description,
			order: currentStepsCount + index + 1,
			recipe_id: recipeId,
		})),
	)
	if (error) throw error
}

export const deleteStep = async (step_id: string) => {
	const { error } = await supabase.from("steps").delete().eq("id", step_id)
	if (error) throw error
}

export const editStep = async (id: string, payload: CreateStepForm) => {
	const { description } = payload
	const { error } = await supabase
		.from("steps")
		.update({ description })
		.eq("id", id)
	if (error) throw error
}
