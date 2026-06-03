import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createStepFormSchema, type CreateStepForm } from "../validation/schema"
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

function StepForm({ onSuccess }: { onSuccess: () => void }) {
	const { addStep } = useRecipeForm()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<CreateStepForm>({
		resolver: zodResolver(createStepFormSchema),
	})

	const onSubmit = (data: CreateStepForm) => {
		addStep(data)
		reset()
		onSuccess()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Field data-invalid={!!errors.description}>
				<FieldLabel>Description</FieldLabel>
				<Input
					{...register("description")}
					placeholder="e.g. Mix flour and eggs"
				/>
				{errors.description && (
					<FieldError>{errors.description.message}</FieldError>
				)}
			</Field>
			<Button type="submit" disabled={!isValid}>
				Add Step
			</Button>
		</form>
	)
}

function AddStepsForm() {
	const [open, setOpen] = useState(false)

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
					<DialogTitle>Add Step</DialogTitle>
				</DialogHeader>
				<StepForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

export default AddStepsForm
