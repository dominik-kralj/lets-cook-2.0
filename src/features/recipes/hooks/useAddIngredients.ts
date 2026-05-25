import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateIngredientForm } from "../validation/schema"
import { addIngredients } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

type AddIngredientsPayload = {
	recipeId: string
	ingredients: CreateIngredientForm[]
}

export const useAddIngredients = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ recipeId, ingredients }: AddIngredientsPayload) =>
			addIngredients(recipeId, ingredients),
		onSuccess: (_, { recipeId }) => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipeId),
			})
		},
		onError: () => toast.error("Failed to save ingredients"),
	})
}
