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
import { Field, FieldLabel } from "@/shared/components/ui/field"
import {
	createRecipeFormSchema,
	type CreateRecipeForm,
	type Recipe,
} from "../validation/schema"
import { useEditRecipe } from "../hooks/useEditRecipe"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/shared/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"
import { uploadRecipeImage } from "../fetcher"
import { useAuth } from "@/features/auth/hooks/useAuth"

type Props = {
	recipe: Recipe
}

export function EditRecipeModal({ recipe }: Props) {
	const { authUser } = useAuth()
	const { mutate, isPending } = useEditRecipe()

	const [file, setFile] = useState<File | null>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<CreateRecipeForm>({
		resolver: zodResolver(createRecipeFormSchema),
		defaultValues: {
			name: recipe.name,
			description: recipe.description ?? "",
			image_url: recipe.image_url ?? "",
		},
	})

	const isFormDirty = isDirty || file !== null

	const onSubmit = async (data: CreateRecipeForm) => {
		let image_url: string | null = recipe.image_url ?? null
		let image_path: string | null = recipe.image_path ?? null

		if (file) {
			const maxSize = 5 * 1024 * 1024
			if (file.size > maxSize) {
				toast.error("Image must be under 5MB")
				return
			}

			const result = await uploadRecipeImage(
				authUser!.id,
				file.name,
				file,
			)
			image_url = result.publicUrl
			image_path = result.imagePath
		}

		mutate(
			{
				id: recipe.id,
				data: { ...data, image_url, image_path },
				oldImagePath: recipe.image_path,
			},
			{ onSuccess: () => reset() },
		)
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
						<FieldLabel htmlFor="recipe-name">Name</FieldLabel>
						<Input
							id="recipe-name"
							autoComplete="off"
							{...register("name")}
							placeholder="Name"
						/>
					</Field>

					<Field data-invalid={!!errors.description}>
						<FieldLabel htmlFor="recipe-description">
							Description
						</FieldLabel>
						<Textarea
							id="recipe-description"
							autoComplete="off"
							{...register("description")}
							placeholder="Description"
						/>
					</Field>

					<Field>
						<FieldLabel htmlFor="recipe-image">Image</FieldLabel>
						<Input
							id="recipe-image"
							type="file"
							accept="image/jpeg,image/png,image/webp"
							onChange={(e) =>
								setFile(e.target.files?.[0] ?? null)
							}
						/>
					</Field>

					{recipe.image_url && !file && (
						<img
							src={recipe.image_url}
							alt={recipe.name}
							className="h-32 w-full rounded-lg object-cover"
						/>
					)}

					<Button
						type="submit"
						disabled={!isValid || isPending || !isFormDirty}
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
