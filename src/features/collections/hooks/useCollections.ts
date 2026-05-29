import { useAuth } from "@/features/auth/hooks/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createCollection,
	deleteCollection,
	getCollections,
	updateCollection,
	addRecipeToCollection,
	deleteRecipeFromCollection,
	getCollection,
} from "../fetcher"
import { collectionKeys } from "../queryKeys"
import { toast } from "sonner"
import type { Collection, CreateCollectionForm } from "../validation/schema"

const useGetAllCollections = () => {
	return useQuery<Collection[]>({
		queryKey: collectionKeys.all,
		queryFn: getCollections,
	})
}

export const useGetCollection = (id: string) => {
	return useQuery<Collection>({
		queryKey: collectionKeys.detail(id),
		queryFn: () => getCollection(id),
		enabled: !!id,
	})
}

const useCreateCollection = () => {
	const queryClient = useQueryClient()
	const { authUser } = useAuth()

	return useMutation({
		mutationFn: (payload: CreateCollectionForm) => {
			if (!authUser?.id) throw new Error("Not authenticated")
			return createCollection(payload, authUser.id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all })
			toast.success("Collection created!")
		},
		onError: () => toast.error("Failed to create collection"),
	})
}

const useUpdateCollection = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string
			data: CreateCollectionForm
		}) => updateCollection(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all })
			toast.success("Collection updated!")
		},
		onError: () => toast.error("Failed to update collection"),
	})
}

const useDeleteCollection = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (collection_id: string) => deleteCollection(collection_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all })
			toast.success("Collection deleted!")
		},
		onError: () => toast.error("Failed to delete collection"),
	})
}

const useAddRecipeToCollection = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			collection_id,
			recipe_id,
		}: {
			collection_id: string
			recipe_id: string
		}) => addRecipeToCollection(collection_id, recipe_id),
		onSuccess: (_, { collection_id }) => {
			queryClient.invalidateQueries({
				queryKey: collectionKeys.detail(collection_id),
			})
			toast.success("Recipe added to collection!")
		},
		onError: () => toast.error("Failed to add recipe to collection"),
	})
}

const useRemoveRecipeFromCollection = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			collection_id,
			recipe_id,
		}: {
			collection_id: string
			recipe_id: string
		}) => deleteRecipeFromCollection(collection_id, recipe_id),
		onSuccess: (_, { collection_id }) => {
			queryClient.invalidateQueries({
				queryKey: collectionKeys.detail(collection_id),
			})
			toast.success("Recipe removed from collection!")
		},
		onError: () => toast.error("Failed to remove recipe from collection"),
	})
}

export const useCollections = () => {
	const collectionsQuery = useGetAllCollections()

	const { mutate: createCollection, isPending: isCreating } =
		useCreateCollection()
	const { mutate: updateCollection, isPending: isUpdating } =
		useUpdateCollection()
	const { mutate: deleteCollection, isPending: isDeleting } =
		useDeleteCollection()
	const { mutate: addRecipe, isPending: isAddingRecipe } =
		useAddRecipeToCollection()
	const { mutate: removeRecipe, isPending: isRemovingRecipe } =
		useRemoveRecipeFromCollection()

	return {
		collections: collectionsQuery.data,
		isLoading: collectionsQuery.isLoading,
		isError: collectionsQuery.isError,
		createCollection,
		updateCollection,
		deleteCollection,
		addRecipe,
		removeRecipe,
		isCreating,
		isUpdating,
		isDeleting,
		isAddingRecipe,
		isRemovingRecipe,
	}
}
