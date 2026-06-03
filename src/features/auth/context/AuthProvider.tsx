import { useState, type ReactNode, useEffect } from "react"

import { AuthContext, type AuthContextType } from "./AuthContext"
import type { Login, Signup } from "../validation/schemas"
import type { AuthUser } from "../types/User"
import { supabase } from "@/services/supabase"

type Props = {
	children: ReactNode
}

function useSessionSync(setAuthUser: (user: AuthUser | null) => void) {
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setAuthUser(
				session?.user ? { id: session.user.id, email: session.user.email! } : null,
			)
		})

		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			setAuthUser(
				session?.user ? { id: session.user.id, email: session.user.email! } : null,
			)
		})

		return () => data.subscription.unsubscribe()
	}, [setAuthUser])
}

export function AuthProvider({ children }: Props) {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		supabase.auth.getSession().then(() => setLoading(false))
	}, [])

	useSessionSync(setAuthUser)

	const login = async ({ email, password }: Login) => {
		try {
			await supabase.auth.signInWithPassword({ email, password })
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		try {
			await supabase.auth.signOut()
		} catch (error) {
			console.error(error)
		}
	}

	const signup = async ({ email, password }: Signup) => {
		try {
			await supabase.auth.signUp({ email, password })
		} catch (error) {
			console.error(error)
		}
	}

	const value: AuthContextType = { authUser, login, logout, signup, loading }

	return <AuthContext value={value}>{children}</AuthContext>
}
