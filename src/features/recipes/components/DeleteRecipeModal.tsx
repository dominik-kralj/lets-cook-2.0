import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import { useDeleteRecipe } from "../hooks/useDeleteRecipe"
import { Spinner } from "@/shared/components/ui/spinner"

type Props = {
	id: string
	name: string
	imagePath?: string | null | undefined
}

export function DeleteRecipeModal({ id, name, imagePath }: Props) {
	const { mutate, isPending } = useDeleteRecipe()

	const handleDeleteRecipe = (id: string, image_path?: string) =>
		mutate({ id, image_path })

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="ghost" size="icon">
						<Trash2 className="size-4 text-destructive" />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete {name}?</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-muted-foreground">
					This action cannot be undone.
				</p>
				<DialogFooter>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() =>
							handleDeleteRecipe(id, imagePath ?? undefined)
						}
					>
						{isPending ? <Spinner className="size-4" /> : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
