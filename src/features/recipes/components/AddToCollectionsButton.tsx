import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Button } from "@/shared/components/ui/button"
import { BookMarked } from "lucide-react"
import { useCollections } from "@/features/collections/hooks/useCollections"

type Props = {
	recipeId: string
}

export function AddToCollectionButton({ recipeId }: Props) {
	const { collections, addRecipe, isAddingRecipe } = useCollections()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" disabled={isAddingRecipe}>
					<BookMarked className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Add to collection</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{!collections?.length ? (
					<DropdownMenuItem disabled>
						No collections yet
					</DropdownMenuItem>
				) : (
					collections.map((collection) => (
						<DropdownMenuItem
							key={collection.id}
							onClick={() =>
								addRecipe({
									collection_id: collection.id,
									recipe_id: recipeId,
								})
							}
						>
							{collection.name}
						</DropdownMenuItem>
					))
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
