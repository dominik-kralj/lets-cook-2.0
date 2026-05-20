import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRecipe } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"
import type { DeleteRecipePayload } from "../validation/schema"

export const useDeleteRecipe = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, image_path }: DeleteRecipePayload) =>
			deleteRecipe(id, image_path),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.all })
			toast.success("Recipe deleted!")
		},
		onError: () => toast.error("Failed to delete recipe"),
	})
}
