import { supabase } from "@/services/supabase"
import z from "zod"
import {
	collectionSchema,
	type CreateCollectionForm,
} from "./validation/schema"

export const getCollections = async () => {
	const { data, error } = await supabase
		.from("collections")
		.select(`*, collection_recipes(*)`)
	if (error) throw error
	return z.array(collectionSchema).parse(data)
}

export const getCollection = async (id: string) => {
	const { data, error } = await supabase
		.from("collections")
		.select(
			`
            *,
            collection_recipes(
                *,
                recipes(*)
            )
        `,
		)
		.eq("id", id)
		.single()
	if (error) throw error
	return collectionSchema.parse(data)
}

export const createCollection = async (
	payload: CreateCollectionForm,
	user_id: string,
) => {
	const { name, description } = payload
	const { error } = await supabase.from("collections").insert({
		name,
		description,

		user_id,
	})
	if (error) throw error
}

export const updateCollection = async (
	id: string,
	payload: CreateCollectionForm,
) => {
	const { name, description } = payload

	const { error } = await supabase
		.from("collections")
		.update({ name, description })
		.eq("id", id)
	if (error) throw error
}

export const deleteCollection = async (collection_id: string) => {
	const { error } = await supabase
		.from("collections")
		.delete()
		.eq("id", collection_id)
	if (error) throw error
}

export const addRecipeToCollection = async (
	collection_id: string,
	recipe_id: string,
) => {
	const { error } = await supabase.from("collection_recipes").insert({
		collection_id,
		recipe_id,
	})

	if (error) throw error
}

export const deleteRecipeFromCollection = async (
	collection_id: string,
	recipe_id: string,
) => {
	const { error } = await supabase
		.from("collection_recipes")
		.delete()
		.eq("collection_id", collection_id)
		.eq("recipe_id", recipe_id)
	if (error) throw error
}
