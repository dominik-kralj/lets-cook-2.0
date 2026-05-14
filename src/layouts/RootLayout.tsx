import { Outlet } from "react-router"

function RootLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex flex-1 items-center justify-center">
				<Outlet />
			</main>
		</div>
	)
}

export default RootLayout
