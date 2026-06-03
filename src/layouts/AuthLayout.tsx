import { Outlet, Link } from "react-router"

function AuthLayout() {
	return (
		<div className="flex min-h-dvh flex-col">
			<nav className="shrink-0 px-8 py-6">
				<Link
					to="/"
					className="text-sm font-medium text-muted-foreground hover:text-foreground"
				>
					← Let's Cook
				</Link>
			</nav>
			<div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
				<Outlet />
			</div>
		</div>
	)
}

export default AuthLayout
