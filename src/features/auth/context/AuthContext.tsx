import { createContext } from "react"
import type { AuthUser } from "../types/User"
import type { Login, Signup } from "../validation/schemas"

export type AuthContextType = {
	authUser: AuthUser | null
	login: (login: Login) => void
	logout: () => void
	signup: (signup: Signup) => void
	loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)
