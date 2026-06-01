import { Spinner } from "@/shared/components/ui/spinner"
import { Suspense } from "react"
import { Outlet } from "react-router"

function RootLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1 px-4">
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}

export default RootLayout
