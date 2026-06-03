import { useState } from "react"
import { usePantry } from "../hooks/usePantry"
import { useForm } from "react-hook-form"
import { createPantryItemFormSchema, type CreatePantryItemForm } from "../validation/schema"
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

function AddPantryItemForm({ onSuccess }: { onSuccess: () => void }) {
	const { createItem, isCreating } = usePantry()
	const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<CreatePantryItemForm>({
		resolver: zodResolver(createPantryItemFormSchema),
	})

	const onSubmit = (data: CreatePantryItemForm) => {
		createItem(data, { onSuccess: () => { reset(); onSuccess() } })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Field data-invalid={!!errors.name}>
				<FieldLabel htmlFor="pantry-name">Name</FieldLabel>
				<Input id="pantry-name" autoComplete="off" {...register("name")} placeholder="e.g. Flour" />
				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</Field>
			<div className="flex gap-2">
				<Field data-invalid={!!errors.quantity} className="flex-1">
					<FieldLabel htmlFor="pantry-qty">Quantity</FieldLabel>
					<Input id="pantry-qty" type="number" autoComplete="off" {...register("quantity", { valueAsNumber: true })} placeholder="e.g. 500" />
					{errors.quantity && <FieldError>{errors.quantity.message}</FieldError>}
				</Field>
				<Field data-invalid={!!errors.unit} className="flex-1">
					<FieldLabel htmlFor="pantry-unit">Unit</FieldLabel>
					<Input id="pantry-unit" autoComplete="off" {...register("unit")} placeholder="e.g. grams" />
					{errors.unit && <FieldError>{errors.unit.message}</FieldError>}
				</Field>
			</div>
			<Button type="submit" disabled={!isValid || isCreating}>
				{isCreating ? <Spinner className="size-4" /> : "Add Item"}
			</Button>
		</form>
	)
}

function AddPantryItemModal() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button>Add Item</Button>} />
			<DialogContent>
				<DialogHeader><DialogTitle>Add Pantry Item</DialogTitle></DialogHeader>
				<AddPantryItemForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

export default AddPantryItemModal
