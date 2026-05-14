import { Outlet, useNavigate } from "react-router"

import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

function ProtectedRoute() {
	const navigate = useNavigate()

	const { authUser, loading } = useAuth()

	useEffect(() => {
		if (loading) return

		if (!authUser) {
			navigate("/login")
		}
	}, [authUser, loading, navigate])

	return <Outlet />
}

export default ProtectedRoute
