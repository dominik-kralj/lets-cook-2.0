import { useQuery } from "@tanstack/react-query"
import { recipeKeys } from "../queryKeys"
import { getRecipe } from "../fetcher"
import type { Recipe } from "../validation/schema"

export const useGetRecipe = (id: string | undefined) => {
	return useQuery<Recipe>({
		queryKey: recipeKeys.detail(id ?? ""),
		queryFn: () => getRecipe(id!),
		enabled: !!id,
	})
}
