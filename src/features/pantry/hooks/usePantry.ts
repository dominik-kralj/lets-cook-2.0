import { useAuth } from "@/features/auth/hooks/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createPantryItem,
	deletePantryItem,
	getPantryItems,
	updatePantryItem,
} from "../fetcher"
import { pantryKeys } from "../queryKeys"
import { toast } from "sonner"
import type { CreatePantryItemForm, PantryItem } from "../validation/schema"

const useGetPantryItems = () => {
	return useQuery<PantryItem[]>({
		queryKey: pantryKeys.all,
		queryFn: getPantryItems,
	})
}

const useCreatePantryItem = () => {
	const queryClient = useQueryClient()
	const { authUser } = useAuth()

	return useMutation({
		mutationFn: (payload: CreatePantryItemForm) => {
			if (!authUser?.id) throw new Error("Not authenticated")
			return createPantryItem(payload, authUser.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pantryKeys.all })
			toast.success("Item added to pantry!")
		},
		onError: () => toast.error("Failed to add item"),
	})
}

const useUpdatePantryItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string
			data: CreatePantryItemForm
		}) => updatePantryItem(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pantryKeys.all })
			toast.success("Item updated!")
		},
		onError: () => toast.error("Failed to update item"),
	})
}

const useDeletePantryItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => deletePantryItem(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pantryKeys.all })
			toast.success("Item removed!")
		},
		onError: () => toast.error("Failed to remove item"),
	})
}

export const usePantry = () => {
	const pantryQuery = useGetPantryItems()
	const { mutate: createItem, isPending: isCreating } = useCreatePantryItem()
	const { mutate: updateItem, isPending: isUpdating } = useUpdatePantryItem()
	const { mutate: deleteItem, isPending: isDeleting } = useDeletePantryItem()

	return {
		items: pantryQuery.data,
		isLoading: pantryQuery.isLoading,
		isError: pantryQuery.isError,
		createItem,
		updateItem,
		deleteItem,
		isCreating,
		isUpdating,
		isDeleting,
	}
}
