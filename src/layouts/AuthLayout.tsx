import { Outlet, Link } from "react-router"

function AuthLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<nav className="px-8 py-6">
				<Link
					to="/"
					className="text-sm font-medium text-muted-foreground hover:text-foreground"
				>
					← Let's Cook
				</Link>
			</nav>
			<div className="flex flex-1 items-center justify-center px-4">
				<Outlet />
			</div>
		</div>
	)
}

export default AuthLayout
