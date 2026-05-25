import { useState } from "react"
import {
	createStepFormSchema,
	type CreateStepForm,
	type Step,
} from "../validation/schema"

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
import { useEditStep } from "../hooks/useEditStep"

function EditStepModal({ step, recipeId }: { step: Step; recipeId: string }) {
	const [open, setOpen] = useState(false)
	const { mutate, isPending } = useEditStep(recipeId)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm<CreateStepForm>({
		resolver: zodResolver(createStepFormSchema),
		defaultValues: { description: step.description ?? "" },
	})
	const onSubmit = (data: CreateStepForm) => {
		mutate({ id: step.id, data }, { onSuccess: () => setOpen(false) })
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
					<DialogTitle>Edit Step</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.description}>
						<FieldLabel htmlFor="edit-step-desc">
							Description
						</FieldLabel>
						<Input
							id="edit-step-desc"
							{...register("description")}
						/>
						{errors.description && (
							<FieldError>
								{errors.description.message}
							</FieldError>
						)}
					</Field>
					<Button
						type="submit"
						disabled={!isValid || !isDirty || isPending}
					>
						{isPending ? <Spinner className="size-4" /> : "Save"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditStepModal
