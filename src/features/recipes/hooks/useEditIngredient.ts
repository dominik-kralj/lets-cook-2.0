import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editIngredient } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"
import type { CreateIngredientForm } from "../validation/schema"

type EditIngredientPayload = {
	id: string
	data: CreateIngredientForm
}

export const useEditIngredient = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: EditIngredientPayload) =>
			editIngredient(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? ""),
			})
			toast.success("Ingredient updated!")
		},
		onError: () => toast.error("Failed to update ingredient"),
	})
}
