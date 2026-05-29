export const collectionKeys = {
	all: ["collections"] as const,
	detail: (id: string) => ["collections", id] as const,
}
