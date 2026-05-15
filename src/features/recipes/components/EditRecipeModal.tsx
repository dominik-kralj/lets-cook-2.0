import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Pencil } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field"
import {
	createRecipeSchema,
	type CreateRecipe,
	type Recipe,
} from "../validation/schema"
import { useEditRecipe } from "../hooks/useEditRecipe"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/shared/components/ui/spinner"

type Props = {
	recipe: Recipe
}

export function EditRecipeModal({ recipe }: Props) {
	const { mutate, isPending } = useEditRecipe()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<CreateRecipe>({
		resolver: zodResolver(createRecipeSchema),
		defaultValues: {
			name: recipe.name,
			description: recipe.description ?? "",
			image_url: recipe.image_url ?? "",
		},
	})

	const onSubmit = (data: CreateRecipe) => {
		mutate({ id: recipe.id, data })
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="ghost" size="icon">
						<Pencil className="size-4" />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Recipe</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.name}>
						<FieldLabel>Name</FieldLabel>
						<Input {...register("name")} placeholder="Name" />
						{errors.name && (
							<FieldError>{errors.name.message}</FieldError>
						)}
					</Field>
					<Field data-invalid={!!errors.description}>
						<FieldLabel>Description</FieldLabel>
						<Textarea
							{...register("description")}
							placeholder="Description"
						/>
					</Field>
					<Field data-invalid={!!errors.image_url}>
						<FieldLabel>Image URL</FieldLabel>
						<Input
							{...register("image_url")}
							placeholder="Image URL"
						/>
					</Field>

					<Button
						type="submit"
						disabled={!isValid || isPending}
						className="w-full"
					>
						{isPending ? (
							<Spinner className="size-4" />
						) : (
							"Save changes"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
