import { z, string, uuid, number } from "zod"

export const pantryItemSchema = z.object({
	id: uuid(),
	user_id: uuid(),
	name: string(),
	quantity: number(),
	unit: string(),
	created_at: string(),
})

export const createPantryItemFormSchema = z.object({
	name: string().min(1, { message: "Name is required" }),
	quantity: number().min(0),
	unit: string().min(1, { message: "Unit is required" }),
})

export type PantryItem = z.infer<typeof pantryItemSchema>
export type CreatePantryItemForm = z.infer<typeof createPantryItemFormSchema>
