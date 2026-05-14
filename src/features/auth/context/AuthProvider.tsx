import { useState, type ReactNode, useEffect } from "react"

import { AuthContext, type AuthContextType } from "./AuthContext"
import type { Login, Signup } from "../validation/schemas"
import type { AuthUser } from "../types/User"
import { supabase } from "@/services/supabase"

type Props = {
	children: ReactNode
}

export function AuthProvider({ children }: Props) {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null)
	const [loading, setLoading] = useState(true)

	console.log("provider")

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			setLoading(true)

			const user = session?.user

			if (!user) {
				setAuthUser(null)
				setLoading(false)
				return
			}

			setAuthUser({
				id: user.id,
				email: user.email!,
			})
			setLoading(false)
		})
		return () => data.subscription.unsubscribe()
	}, [])

	const login = async ({ email, password }: Login) => {
		try {
			const response = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			const user = response.data.user

			if (!user) return
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		try {
			const response = await supabase.auth.signOut()

			if (!response) return
		} catch (error) {
			console.error(error)
		}
	}

	const signup = async ({ email, password }: Signup) => {
		try {
			const response = await supabase.auth.signUp({
				email,
				password,
			})

			const user = response.data.user

			if (!user) return
		} catch (error) {
			console.error(error)
		}
	}

	const value: AuthContextType = {
		authUser,
		login,
		logout,
		signup,
		loading,
	}

	return <AuthContext value={value}>{children}</AuthContext>
}
