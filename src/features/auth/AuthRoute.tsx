import { Outlet, useNavigate } from "react-router"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

function AuthRoute() {
	const navigate = useNavigate()
	const { authUser, loading } = useAuth()

	useEffect(() => {
		if (loading) return

		if (authUser) {
			navigate("/dashboard")
		}
	}, [authUser, loading, navigate])

	return <Outlet />
}

export default AuthRoute
