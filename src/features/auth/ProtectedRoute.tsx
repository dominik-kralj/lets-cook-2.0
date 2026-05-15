import { Outlet, useNavigate } from "react-router"

import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"
import { Spinner } from "@/shared/components/ui/spinner"

function ProtectedRoute() {
	const navigate = useNavigate()

	const { authUser, loading } = useAuth()

	useEffect(() => {
		if (loading) return
		if (!authUser) navigate("/login")
	}, [authUser, loading, navigate])

	if (loading)
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner />
			</div>
		)

	return <Outlet />
}

export default ProtectedRoute
