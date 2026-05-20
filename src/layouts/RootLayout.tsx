import { Spinner } from "@/shared/components/ui/spinner"
import { Suspense } from "react"
import { Outlet } from "react-router"

function RootLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex flex-1 items-center justify-center px-4">
				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}

export default RootLayout
