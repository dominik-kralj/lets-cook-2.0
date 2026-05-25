import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteIngredient } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

export const useDeleteIngredient = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (ingredient_id: string | undefined) =>
			deleteIngredient(ingredient_id ?? ""),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? ""),
			})
			toast.success("Ingredient deleted!")
		},
		onError: () => toast.error("Failed to delete an ingredient"),
	})
}
