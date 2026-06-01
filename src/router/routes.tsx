import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import ProtectedRoute from "@/features/auth/ProtectedRoute"
import AuthRoute from "@/features/auth/AuthRoute"
import RootLayout from "@/layouts/RootLayout"
import DashboardLayout from "@/layouts/DashboardLayout"

const PantryPage = lazy(() => import("@/features/pantry/PantryPage"))
const CollectionPage = lazy(
	() => import("@/features/collections/CollectionsPage"),
)
const CollectionDetailsPage = lazy(
	() => import("@/features/collections/CollectionDetailsPage"),
)
const FavoritesPage = lazy(() => import("@/features/favorites/FavoritesPage"))
const RecipesPage = lazy(() => import("@/features/recipes/RecipesPage"))
const RecipeDetailsPage = lazy(
	() => import("@/features/recipes/RecipeDetailsPage"),
)
const Login = lazy(() => import("@/features/auth/Login"))
const Signup = lazy(() => import("@/features/auth/Signup"))
const HomePage = lazy(() => import("@/features/home/HomePage"))
const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"))

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: "...error",
		children: [
			{ path: "/", element: <HomePage /> },
			{
				element: <AuthRoute />,
				children: [
					{ path: "/login", element: <Login /> },
					{ path: "/signup", element: <Signup /> },
				],
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						element: <DashboardLayout />,
						children: [
							{ path: "/recipes", element: <RecipesPage /> },
							{
								path: "/recipes/:id",
								element: <RecipeDetailsPage />,
							},
							{ path: "/dashboard", element: <DashboardPage /> },
							{ path: "/favorites", element: <FavoritesPage /> },
							{
								path: "/collections",
								element: <CollectionPage />,
							},
							{
								path: "/collections/:id",
								element: <CollectionDetailsPage />,
							},
							{ path: "/pantry", element: <PantryPage /> },
						],
					},
				],
			},
		],
	},
])

export default router
