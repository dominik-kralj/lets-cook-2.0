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
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { createRecipeFormSchema, type CreateRecipeForm, type Recipe } from "../validation/schema"
import { useRecipes } from "../hooks/useRecipes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/shared/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"
import { uploadRecipeImage } from "../fetcher"
import { useAuth } from "@/features/auth/hooks/useAuth"

const MAX_IMAGE_BYTES = 5_242_880

async function resolveImage({ authUser, file, recipe }: { authUser: { id: string } | null; file: File | null; recipe: Recipe }) {
	if (!file) return { image_url: recipe.image_url ?? null, image_path: recipe.image_path ?? null }
	if (file.size > MAX_IMAGE_BYTES) { toast.error("Image must be under 5MB"); return null }
	const result = await uploadRecipeImage({ userId: authUser!.id, filename: file.name, file })
	return { image_url: result.publicUrl, image_path: result.imagePath }
}

function EditRecipeForm({ recipe }: { recipe: Recipe }) {
	const { authUser } = useAuth()
	const { editRecipe, isEditing } = useRecipes()
	const [file, setFile] = useState<File | null>(null)
	const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<CreateRecipeForm>({
		resolver: zodResolver(createRecipeFormSchema),
		defaultValues: { name: recipe.name, description: recipe.description ?? "", image_url: recipe.image_url ?? "" },
	})

	const onSubmit = async (data: CreateRecipeForm) => {
		const images = await resolveImage({ authUser, file, recipe })
		if (!images) return
		editRecipe(
			{ id: recipe.id, data: { ...data, ...images }, oldImagePath: recipe.image_path },
			{ onSuccess: () => reset() },
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Field data-invalid={!!errors.name}>
				<FieldLabel htmlFor="recipe-name">Name</FieldLabel>
				<Input id="recipe-name" autoComplete="off" {...register("name")} placeholder="Name" />
				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</Field>
			<Field data-invalid={!!errors.description}>
				<FieldLabel htmlFor="recipe-description">Description</FieldLabel>
				<Textarea id="recipe-description" autoComplete="off" {...register("description")} placeholder="Description" />
				{errors.description && <FieldError>{errors.description.message}</FieldError>}
			</Field>
			<Field>
				<FieldLabel htmlFor="recipe-image">Image</FieldLabel>
				<Input id="recipe-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
			</Field>
			{recipe.image_url && !file && (
				<img src={recipe.image_url} alt={recipe.name} className="h-32 w-full rounded-lg object-cover" />
			)}
			<Button type="submit" disabled={!isValid || isEditing || (!isDirty && !file)} className="w-full">
				{isEditing ? <Spinner className="size-4" /> : "Save changes"}
			</Button>
		</form>
	)
}

export function EditRecipeModal({ recipe }: { recipe: Recipe }) {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="ghost" size="icon"><Pencil className="size-4" /></Button>} />
			<DialogContent>
				<DialogHeader><DialogTitle>Edit Recipe</DialogTitle></DialogHeader>
				<EditRecipeForm recipe={recipe} />
			</DialogContent>
		</Dialog>
	)
}
