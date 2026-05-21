import { useAuth } from "@/features/auth/hooks/useAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateRecipeForm } from "../validation/schema"
import { createRecipe } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

export const useAddRecipe = () => {
	const queryClient = useQueryClient()
	const { authUser } = useAuth()

	return useMutation({
		mutationFn: (data: CreateRecipeForm) => {
			if (!authUser?.id) throw new Error("Not authenticated")
			return createRecipe(data, authUser.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.all })
			toast.success("Recipe created!")
		},
		onError: (error: { code: string }) => {
			if (error.code === "23505") {
				toast.error("A recipe with that name already exists")
			} else {
				toast.error("Failed to create recipe")
			}
		},
	})
}
