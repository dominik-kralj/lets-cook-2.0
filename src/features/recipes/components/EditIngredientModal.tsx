import { useState } from "react"
import {
	createIngredientFormSchema,
	type CreateIngredientForm,
	type Ingredient,
} from "../validation/schema"
import { useRecipes } from "../hooks/useRecipes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Pencil } from "lucide-react"
import { Spinner } from "@/shared/components/ui/spinner"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"

type Props = {
	ingredient: Ingredient
	recipeId: string
}

function EditIngredientModal({ ingredient, recipeId }: Props) {
	const [open, setOpen] = useState(false)
	const { editIngredient, isEditingIngredient } = useRecipes(recipeId)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<CreateIngredientForm>({
		resolver: zodResolver(createIngredientFormSchema),
		defaultValues: {
			name: ingredient.name,
			quantity: ingredient.quantity,
			unit: ingredient.unit,
		},
	})
	const onSubmit = (data: CreateIngredientForm) => {
		editIngredient({ id: ingredient.id, data }, { onSuccess: () => setOpen(false) })
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="ghost" size="icon" className="size-7">
						<Pencil className="size-3" />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Ingredient</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.name}>
						<FieldLabel htmlFor="edit-ing-name">Name</FieldLabel>
						<Input
							id="edit-ing-name"
							autoComplete="off"
							{...register("name")}
						/>
						{errors.name && (
							<FieldError>{errors.name.message}</FieldError>
						)}
					</Field>
					<div className="flex gap-2">
						<Field
							data-invalid={!!errors.quantity}
							className="flex-1"
						>
							<FieldLabel htmlFor="edit-ing-qty">
								Quantity
							</FieldLabel>
							<Input
								id="edit-ing-qty"
								type="number"
								autoComplete="off"
								{...register("quantity", {
									valueAsNumber: true,
								})}
							/>
						</Field>
						<Field data-invalid={!!errors.unit} className="flex-1">
							<FieldLabel htmlFor="edit-ing-unit">
								Unit
							</FieldLabel>
							<Input
								id="edit-ing-unit"
								autoComplete="off"
								{...register("unit")}
							/>
						</Field>
					</div>
					<Button
						type="submit"
						disabled={!isValid || !isDirty || isEditingIngredient}
					>
						{isEditingIngredient ? <Spinner className="size-4" /> : "Save"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditIngredientModal
