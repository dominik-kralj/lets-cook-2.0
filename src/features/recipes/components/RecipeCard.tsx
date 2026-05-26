import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Heart } from "lucide-react"
import { Link } from "react-router"
import { EditRecipeModal } from "./EditRecipeModal"
import { DeleteRecipeModal } from "./DeleteRecipeModal"
import { useFavorites } from "@/features/favorites/hooks/useFavorites"
import type { Recipe } from "../validation/schema"

type Props = {
	recipe: Recipe
	showActions?: boolean
}

function RecipeCard({ recipe, showActions = true }: Props) {
	const { isFavorited, toggleFavorite, pendingId } = useFavorites()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="hover:underline">
					<Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
				</CardTitle>
				<div className="flex gap-1">
					<Button
						variant="ghost"
						size="icon"
						disabled={pendingId === recipe.id}
						onClick={() => toggleFavorite(recipe.id)}
					>
						<Heart
							className={`size-4 ${isFavorited(recipe.id) ? "fill-red-500 text-red-500" : ""}`}
						/>
					</Button>
					{showActions && (
						<>
							<EditRecipeModal recipe={recipe} />
							<DeleteRecipeModal
								id={recipe.id}
								name={recipe.name}
								imagePath={recipe?.image_path}
							/>
						</>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription>{recipe.description}</CardDescription>
			</CardContent>
		</Card>
	)
}

export default RecipeCard
