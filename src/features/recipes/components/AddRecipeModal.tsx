import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import {
	createRecipeFormSchema,
	type CreateRecipeForm,
} from "../validation/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { useAddRecipe } from "../hooks/useAddRecipe"
import { Spinner } from "@/shared/components/ui/spinner"
import { useState } from "react"
import { uploadRecipeImage } from "../fetcher"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { toast } from "sonner"

export function AddRecipeModal() {
	const { authUser } = useAuth()
	const { mutate, isPending } = useAddRecipe()

	const [file, setFile] = useState<File | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		resolver: zodResolver(createRecipeFormSchema),
	})

	const onSubmit = async (data: CreateRecipeForm) => {
		let image_url: string | null = null
		let image_path: string | null = null

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

		mutate({ ...data, image_url, image_path }, { onSuccess: () => reset() })
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button>
						<Plus />
						Add Recipe
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Recipe</DialogTitle>
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
						<FieldLabel>Recipe description</FieldLabel>
						<Textarea
							{...register("description")}
							placeholder="Description"
						/>
						{errors.name && (
							<FieldError>
								{errors.description?.message}
							</FieldError>
						)}
					</Field>

					<Field>
						<FieldLabel>Image</FieldLabel>
						<Input
							type="file"
							accept="image/jpeg,image/png,image/webp"
							onChange={(e) =>
								setFile(e.target.files?.[0] ?? null)
							}
						/>
					</Field>

					<Button type="submit" disabled={!isValid || isPending}>
						{isPending ? (
							<Spinner className="size-4" />
						) : (
							"Add recipe"
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
