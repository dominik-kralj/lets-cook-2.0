import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { createRecipeSchema, type CreateRecipe } from "../validation/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { useCreateRecipe } from "../hooks/useCreateRecipe"
import { Spinner } from "@/shared/components/ui/spinner"

export function AddRecipeModal() {
	const { mutate, isPending } = useCreateRecipe()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		resolver: zodResolver(createRecipeSchema),
	})

	const onSubmit = async (data: CreateRecipe) => {
		mutate(data, {
			onSuccess: () => reset(),
		})
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button>
					<Plus />
					Add Recipe
				</Button>
			</DialogTrigger>
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

					<Field data-invalid={!!errors.image_url}>
						<FieldLabel>Image</FieldLabel>
						<Input {...register("image_url")} placeholder="Image" />
						{errors.image_url && (
							<FieldError>{errors.image_url.message}</FieldError>
						)}
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
