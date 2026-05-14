import { useQuery } from "@tanstack/react-query"
import { recipeKeys } from "../queryKeys"
import { getRecipes } from "../fetcher"
import type { Recipe } from "../validation/schema"

export const useGetAllRecipes = () => {
	return useQuery<Recipe[]>({
		queryKey: recipeKeys.all,
		queryFn: getRecipes,
	})
}
