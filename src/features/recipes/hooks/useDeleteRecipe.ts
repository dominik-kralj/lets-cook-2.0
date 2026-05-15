import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRecipe } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

export const useDeleteRecipe = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deleteRecipe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.all })
			toast.success("Recipe deleted!")
		},
		onError: () => toast.error("Failed to delete recipe"),
	})
}
