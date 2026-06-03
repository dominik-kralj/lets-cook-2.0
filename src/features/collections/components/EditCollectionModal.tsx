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
import { createCollectionFormSchema, type Collection, type CreateCollectionForm } from "../validation/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/shared/components/ui/spinner"
import { useCollections } from "../hooks/useCollections"

function EditCollectionForm({ collection }: { collection: Collection }) {
	const { updateCollection, isUpdating } = useCollections()
	const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm<CreateCollectionForm>({
		resolver: zodResolver(createCollectionFormSchema),
		defaultValues: { name: collection.name, description: collection.description ?? "" },
	})

	const onSubmit = (data: CreateCollectionForm) => {
		updateCollection({ id: collection.id, data }, { onSuccess: () => reset(data) })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Field data-invalid={!!errors.name}>
				<FieldLabel htmlFor="col-name">Name</FieldLabel>
				<Input id="col-name" autoComplete="off" {...register("name")} placeholder="Name" />
				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</Field>
			<Field data-invalid={!!errors.description}>
				<FieldLabel htmlFor="col-desc">Description</FieldLabel>
				<Textarea id="col-desc" autoComplete="off" {...register("description")} placeholder="Description" />
				{errors.description && <FieldError>{errors.description.message}</FieldError>}
			</Field>
			<Button type="submit" disabled={!isValid || isUpdating || !isDirty} className="w-full">
				{isUpdating ? <Spinner className="size-4" /> : "Save changes"}
			</Button>
		</form>
	)
}

export function EditCollectionModal({ collection }: { collection: Collection }) {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="ghost" size="icon"><Pencil className="size-4" /></Button>} />
			<DialogContent>
				<DialogHeader><DialogTitle>Edit Collection</DialogTitle></DialogHeader>
				<EditCollectionForm collection={collection} />
			</DialogContent>
		</Dialog>
	)
}
