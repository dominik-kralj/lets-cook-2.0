import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"

import { ThemeProvider } from "@/shared/components/theme-provider.tsx"
import { RouterProvider } from "react-router"
import router from "./router/routes"
import { AuthProvider } from "./features/auth/context/AuthProvider"
import { Toaster } from "./shared/components/ui/sonner"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<Toaster position="top-right" />
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>,
)
