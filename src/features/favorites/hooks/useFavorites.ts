import { useAuth } from "@/features/auth/hooks/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addFavorite, deleteFavorite, getFavorites } from "../fetcher"
import { favoriteKeys } from "../queryKeys"
import { toast } from "sonner"
import { useState } from "react"
import type { Favorite } from "../validation/schema"

const useGetAllFavorites = () => {
	return useQuery<Favorite[]>({
		queryKey: favoriteKeys.all,
		queryFn: getFavorites,
	})
}

const useAddFavorite = () => {
	const queryClient = useQueryClient()
	const { authUser } = useAuth()

	return useMutation({
		mutationFn: (recipe_id: string) => {
			if (!authUser?.id) throw new Error("Not authenticated")
			return addFavorite(recipe_id, authUser.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: favoriteKeys.all })
			toast.success("Recipe added to favorites!")
		},
		onError: () => toast.error("Failed to add recipe to favorites"),
	})
}

const useRemoveFavorite = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (recipe_id: string) => deleteFavorite(recipe_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: favoriteKeys.all })
			toast.success("Removed from favorites!")
		},
		onError: () => toast.error("Failed to remove from favorites"),
	})
}

export const useFavorites = () => {
	const [pendingId, setPendingId] = useState<string | null>(null)
	const favoritesQuery = useGetAllFavorites()
	const { mutate: addFav } = useAddFavorite()
	const { mutate: removeFav } = useRemoveFavorite()

	const isFavorited = (recipe_id: string) =>
		favoritesQuery.data?.some((f) => f.recipe_id === recipe_id) ?? false

	const toggleFavorite = (recipe_id: string) => {
		setPendingId(recipe_id)
		if (isFavorited(recipe_id)) {
			removeFav(recipe_id, { onSettled: () => setPendingId(null) })
		} else {
			addFav(recipe_id, { onSettled: () => setPendingId(null) })
		}
	}

	return {
		favorites: favoritesQuery.data,
		isLoading: favoritesQuery.isLoading,
		isFavorited,
		toggleFavorite,
		pendingId,
	}
}
