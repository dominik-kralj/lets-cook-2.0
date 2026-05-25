// useEditStep.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editStep } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"
import type { CreateStepForm } from "../validation/schema"

type EditStepPayload = {
	id: string
	data: CreateStepForm
}

export const useEditStep = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: EditStepPayload) => editStep(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? ""),
			})
			toast.success("Step updated!")
		},
		onError: () => toast.error("Failed to update step"),
	})
}
