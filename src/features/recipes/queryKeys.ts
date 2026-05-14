export const recipeKeys = {
	all: ["recipes"] as const,
	detail: (id: string) => ["recipes", id] as const,
}
