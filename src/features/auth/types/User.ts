export type User = {
	id: string
	email: string
	username?: string
	nickname?: string
	avatarUrl?: string
}

export type AuthUser = User | null
