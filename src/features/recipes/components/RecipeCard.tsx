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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"

type Props = {
	recipe: Recipe
	showActions?: boolean
}

function RecipeCard({ recipe, showActions = true }: Props) {
	const { isFavorited, toggleFavorite, pendingId } = useFavorites()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between gap-2">
				<CardTitle className="min-w-0">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={`/recipes/${recipe.id}`} className="block truncate hover:underline">
								{recipe.name}
							</Link>
						</TooltipTrigger>
						<TooltipContent>{recipe.name}</TooltipContent>
					</Tooltip>
				</CardTitle>
				<div className="flex shrink-0 gap-1">
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
				<CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
			</CardContent>
		</Card>
	)
}

export default RecipeCard
