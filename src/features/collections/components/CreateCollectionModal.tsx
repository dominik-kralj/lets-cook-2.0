import { useState } from "react"
import { useCollections } from "../hooks/useCollections"
import { useForm } from "react-hook-form"
import {
	createCollectionFormSchema,
	type CreateCollectionForm,
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
import { Plus } from "lucide-react"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"

function CreateCollectionForm({ onSuccess }: { onSuccess: () => void }) {
	const { createCollection } = useCollections()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<CreateCollectionForm>({
		resolver: zodResolver(createCollectionFormSchema),
	})

	const onSubmit = (data: CreateCollectionForm) => {
		createCollection(data, {
			onSuccess: () => { reset(); onSuccess() },
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Field data-invalid={!!errors.name}>
				<FieldLabel htmlFor="col-name">Name</FieldLabel>
				<Input
					id="col-name"
					autoComplete="off"
					{...register("name")}
					placeholder="e.g. Weekend Meals"
				/>
				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</Field>
			<Field data-invalid={!!errors.description}>
				<FieldLabel htmlFor="col-desc">Description</FieldLabel>
				<Textarea
					id="col-desc"
					autoComplete="off"
					{...register("description")}
					placeholder="Optional description"
				/>
			</Field>
			<Button type="submit" disabled={!isValid}>
				Create
			</Button>
		</form>
	)
}

function CreateCollectionModal() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button>
						<Plus className="size-4" />
						New Collection
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Collection</DialogTitle>
				</DialogHeader>
				<CreateCollectionForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

export default CreateCollectionModal
