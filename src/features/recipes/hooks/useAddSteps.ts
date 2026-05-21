import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateStepForm } from "../validation/schema"
import { addSteps } from "../fetcher"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"

type AddStepsPayload = {
	recipeId: string
	steps: CreateStepForm[]
	currentStepsCount: number
}

export const useAddSteps = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ recipeId, steps, currentStepsCount }: AddStepsPayload) =>
			addSteps(recipeId, steps, currentStepsCount),
		onSuccess: (_, { recipeId }) => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipeId),
			})
			toast.success("Steps saved!")
		},
		onError: () => toast.error("Failed to save steps"),
	})
}
