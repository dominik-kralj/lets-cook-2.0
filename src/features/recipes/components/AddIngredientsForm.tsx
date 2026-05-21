import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	createIngredientFormSchema,
	type CreateIngredientForm,
} from "../validation/schema"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { useRecipeForm } from "../context/RecipeFormContext"
import { X } from "lucide-react"

function AddIngredientForm() {
	const { addIngredient, ingredients, removeIngredient } = useRecipeForm()

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
	}

	return (
		<div className="flex flex-col gap-3">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-3"
			>
				<Field data-invalid={!!errors.name}>
					<FieldLabel>Name</FieldLabel>
					<Input {...register("name")} placeholder="e.g. Flour" />
					{errors.name && (
						<FieldError>{errors.name.message}</FieldError>
					)}
				</Field>

				<div className="flex gap-2">
					<Field data-invalid={!!errors.quantity} className="flex-1">
						<FieldLabel>Quantity</FieldLabel>
						<Input
							{...register("quantity", { valueAsNumber: true })}
							type="number"
							placeholder="e.g. 200"
						/>
						{errors.quantity && (
							<FieldError>{errors.quantity.message}</FieldError>
						)}
					</Field>

					<Field data-invalid={!!errors.unit} className="flex-1">
						<FieldLabel>Unit</FieldLabel>
						<Input {...register("unit")} placeholder="e.g. grams" />
						{errors.unit && (
							<FieldError>{errors.unit.message}</FieldError>
						)}
					</Field>
				</div>

				<Button
					type="submit"
					disabled={!isValid}
					size="sm"
					className="w-full"
				>
					Add Ingredient
				</Button>
			</form>

			{ingredients.length > 0 && (
				<div className="mt-3">
					<p className="mb-2 text-xs text-muted-foreground">
						Pending:
					</p>
					<ul className="space-y-1">
						{ingredients.map((ing, index) => (
							<li
								key={index}
								className="flex items-center justify-between text-sm"
							>
								<span>
									{ing.quantity} {ing.unit} {ing.name}
								</span>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeIngredient(index)}
								>
									<X className="size-3" />
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default AddIngredientForm
