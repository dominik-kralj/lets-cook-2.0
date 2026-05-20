import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateRecipePayload } from "../validation/schema"
import { updateRecipe } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

export const useEditRecipe = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data, oldImagePath }: UpdateRecipePayload) =>
			updateRecipe(id, data, oldImagePath),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.all })
			toast.success("Recipe updated!")
		},
		onError: () => toast.error("Failed to update recipe"),
	})
}
