import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	createIngredientFormSchema,
	type CreateIngredientForm,
} from "../validation/schema"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Plus } from "lucide-react"
import { useRecipeForm } from "../context/RecipeFormContext"
import { useState } from "react"

function AddIngredientsForm() {
	const { addIngredient } = useRecipeForm()
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<CreateIngredientForm>({
		resolver: zodResolver(createIngredientFormSchema),
	})

	const onSubmit = (data: CreateIngredientForm) => {
		addIngredient(data)
		reset()
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="outline" size="sm">
						<Plus className="size-3" />
						Add
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Ingredient</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.name}>
						<FieldLabel>Name</FieldLabel>
						<Input {...register("name")} placeholder="e.g. Flour" />
						{errors.name && (
							<FieldError>{errors.name.message}</FieldError>
						)}
					</Field>
					<div className="flex gap-2">
						<Field
							data-invalid={!!errors.quantity}
							className="flex-1"
						>
							<FieldLabel>Quantity</FieldLabel>
							<Input
								{...register("quantity", {
									valueAsNumber: true,
								})}
								type="number"
								placeholder="e.g. 200"
							/>
							{errors.quantity && (
								<FieldError>
									{errors.quantity.message}
								</FieldError>
							)}
						</Field>
						<Field data-invalid={!!errors.unit} className="flex-1">
							<FieldLabel>Unit</FieldLabel>
							<Input
								{...register("unit")}
								placeholder="e.g. grams"
							/>
							{errors.unit && (
								<FieldError>{errors.unit.message}</FieldError>
							)}
						</Field>
					</div>
					<Button type="submit" disabled={!isValid}>
						Add Ingredient
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default AddIngredientsForm
