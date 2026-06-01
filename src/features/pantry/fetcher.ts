import { supabase } from "@/services/supabase"
import z from "zod"
import {
	pantryItemSchema,
	type CreatePantryItemForm,
} from "./validation/schema"

export const getPantryItems = async () => {
	const { data, error } = await supabase.from("pantry_items").select()
	if (error) throw error
	return z.array(pantryItemSchema).parse(data)
}

export const createPantryItem = async (
	payload: CreatePantryItemForm,
	user_id: string,
) => {
	const { name, quantity, unit } = payload
	const { error } = await supabase
		.from("pantry_items")
		.insert({ name, quantity, unit, user_id })
	if (error) throw error
}

export const updatePantryItem = async (
	id: string,
	payload: CreatePantryItemForm,
) => {
	const { name, quantity, unit } = payload
	const { error } = await supabase
		.from("pantry_items")
		.update({ name, quantity, unit })
		.eq("id", id)
	if (error) throw error
}

export const deletePantryItem = async (id: string) => {
	const { error } = await supabase.from("pantry_items").delete().eq("id", id)
	if (error) throw error
}
