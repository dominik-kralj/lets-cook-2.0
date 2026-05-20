import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "../features/home/HomePage"
import { Login } from "@/features/auth/Login"
import { Signup } from "@/features/auth/Signup"
import ProtectedRoute from "@/features/auth/ProtectedRoute"
import RecipesPage from "@/features/recipes/RecipesPage"
import AuthRoute from "@/features/auth/AuthRoute"
import RootLayout from "@/layouts/RootLayout"
import DashboardPage from "@/features/dashboard/DashboardPage"
import DashboardLayout from "@/layouts/DashboardLayout"

import RecipeDetailsPage from "@/features/recipes/RecipeDetailsPage"

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: "...error",
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				element: <AuthRoute />,
				children: [
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/signup",
						element: <Signup />,
					},
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
						],
					},
				],
			},
		],
	},
])

export default router
