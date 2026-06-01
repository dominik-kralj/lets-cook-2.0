import { useState } from "react"
import { usePantry } from "../hooks/usePantry"
import { useForm } from "react-hook-form"
import {
	createPantryItemFormSchema,
	type CreatePantryItemForm,
	type PantryItem,
} from "../validation/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Spinner } from "@/shared/components/ui/spinner"
import { Pencil } from "lucide-react"

function EditPantryItemModal({ item }: { item: PantryItem }) {
	const [open, setOpen] = useState(false)
	const { updateItem, isUpdating } = usePantry()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm<CreatePantryItemForm>({
		resolver: zodResolver(createPantryItemFormSchema),
		defaultValues: {
			name: item.name,
			quantity: item.quantity,
			unit: item.unit,
		},
	})

	const onSubmit = (data: CreatePantryItemForm) => {
		updateItem(
			{ id: item.id, data },
			{
				onSuccess: () => {
					reset(data)
					setOpen(false)
				},
			},
		)
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
					<DialogTitle>Edit Item</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.name}>
						<FieldLabel htmlFor="edit-pantry-name">Name</FieldLabel>
						<Input
							id="edit-pantry-name"
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
							<FieldLabel htmlFor="edit-pantry-qty">
								Quantity
							</FieldLabel>
							<Input
								id="edit-pantry-qty"
								type="number"
								autoComplete="off"
								{...register("quantity", {
									valueAsNumber: true,
								})}
							/>
						</Field>
						<Field data-invalid={!!errors.unit} className="flex-1">
							<FieldLabel htmlFor="edit-pantry-unit">
								Unit
							</FieldLabel>
							<Input
								id="edit-pantry-unit"
								autoComplete="off"
								{...register("unit")}
							/>
						</Field>
					</div>
					<Button
						type="submit"
						disabled={!isValid || isUpdating || !isDirty}
					>
						{isUpdating ? <Spinner className="size-4" /> : "Save"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditPantryItemModal
