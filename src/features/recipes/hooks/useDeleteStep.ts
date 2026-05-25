import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteStep } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

export const useDeleteStep = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (step_id: string | undefined) =>
			deleteStep(step_id ?? "undefined"),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? "undefined"),
			})
			toast.success("Step deleted!")
		},
		onError: () => toast.error("Failed to delete step"),
	})
}
