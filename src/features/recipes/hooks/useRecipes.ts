import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	addIngredients,
	addSteps,
	createRecipe,
	deleteIngredient,
	deleteRecipe,
	deleteStep,
	editIngredient,
	editRecipe,
	editStep,
	getRecipe,
	getRecipes,
} from "../fetcher"
import type {
	AddIngredientsPayload,
	AddStepsPayload,
	CreateRecipeForm,
	DeleteRecipePayload,
	EditIngredientPayload,
	EditRecipePayload,
	EditStepPayload,
	Recipe,
} from "../validation/schema"
import { recipeKeys } from "../queryKeys"
import { toast } from "sonner"
import { useAuth } from "@/features/auth/hooks/useAuth"

const useGetAllRecipes = () => {
	return useQuery<Recipe[]>({
		queryKey: recipeKeys.all,
		queryFn: getRecipes,
	})
}

export const useGetRecipe = (id: string | undefined) => {
	return useQuery<Recipe>({
		queryKey: recipeKeys.detail(id ?? ""),
		queryFn: () => getRecipe(id!),
		enabled: !!id,
	})
}

const useAddRecipe = () => {
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

const useEditRecipe = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data, oldImagePath }: EditRecipePayload) =>
			editRecipe(id, data, oldImagePath),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.all })
			toast.success("Recipe updated!")
		},
		onError: () => toast.error("Failed to update recipe"),
	})
}

const useDeleteRecipe = () => {
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

const useAddIngredients = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ recipeId, ingredients }: AddIngredientsPayload) =>
			addIngredients(recipeId, ingredients),
		onSuccess: (_, { recipeId }) => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.detail(recipeId) })
		},
		onError: () => toast.error("Failed to save ingredients"),
	})
}

const useEditIngredient = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: EditIngredientPayload) =>
			editIngredient(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? ""),
			})
			toast.success("Ingredient updated!")
		},
		onError: () => toast.error("Failed to update ingredient"),
	})
}

const useDeleteIngredient = (recipe_id: string | undefined) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (ingredient_id: string | undefined) =>
			deleteIngredient(ingredient_id ?? ""),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: recipeKeys.detail(recipe_id ?? ""),
			})
			toast.success("Ingredient deleted!")
		},
		onError: () => toast.error("Failed to delete an ingredient"),
	})
}

const useAddSteps = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ recipeId, steps, currentStepsCount }: AddStepsPayload) =>
			addSteps(recipeId, steps, currentStepsCount),
		onSuccess: (_, { recipeId }) => {
			queryClient.invalidateQueries({ queryKey: recipeKeys.detail(recipeId) })
		},
		onError: () => toast.error("Failed to save steps"),
	})
}

const useEditStep = (recipe_id: string | undefined) => {
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

const useDeleteStep = (recipe_id: string | undefined) => {
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

export const useRecipes = (recipeId?: string) => {
	const recipesQuery = useGetAllRecipes()

	const { mutate: addRecipe, isPending: isAdding } = useAddRecipe()
	const { mutate: editRecipe, isPending: isEditing } = useEditRecipe()
	const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe()

	const { mutate: addIngredients, isPending: isAddingIngredients } =
		useAddIngredients()
	const { mutate: editIngredient, isPending: isEditingIngredient } =
		useEditIngredient(recipeId)
	const { mutate: deleteIngredient, isPending: isDeletingIngredient } =
		useDeleteIngredient(recipeId)

	const { mutate: addSteps, isPending: isAddingSteps } = useAddSteps()
	const { mutate: editStep, isPending: isEditingStep } = useEditStep(recipeId)
	const { mutate: deleteStep, isPending: isDeletingStep } =
		useDeleteStep(recipeId)

	return {
		recipes: recipesQuery.data,
		isLoading: recipesQuery.isLoading,
		isError: recipesQuery.isError,
		addRecipe,
		editRecipe,
		deleteRecipe,
		addIngredients,
		editIngredient,
		deleteIngredient,
		addSteps,
		editStep,
		deleteStep,
		isAdding,
		isEditing,
		isDeleting,
		isAddingIngredients,
		isEditingIngredient,
		isDeletingIngredient,
		isAddingSteps,
		isEditingStep,
		isDeletingStep,
	}
}
