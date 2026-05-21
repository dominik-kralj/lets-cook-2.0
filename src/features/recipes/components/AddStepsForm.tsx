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
import { Plus, X } from "lucide-react"
import { useRecipeForm } from "../context/RecipeFormContext"
import { useState } from "react"

function AddStepsForm() {
	const { addStep, steps, removeStep } = useRecipeForm()
	const [open, setOpen] = useState(false)

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
		setOpen(false)
	}

	return (
		<div className="flex flex-col gap-2">
			{steps.length > 0 && (
				<ol className="space-y-1">
					{steps.map((step, index) => (
						<li
							key={index}
							className="flex items-center justify-between rounded-lg bg-muted px-3 py-1 text-sm"
						>
							<span>
								{index + 1}. {step.description}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="size-6"
								onClick={() => removeStep(index)}
							>
								<X className="size-3" />
							</Button>
						</li>
					))}
				</ol>
			)}
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
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<Field data-invalid={!!errors.description}>
							<FieldLabel>Description</FieldLabel>
							<Input
								{...register("description")}
								placeholder="e.g. Mix flour and eggs"
							/>
							{errors.description && (
								<FieldError>
									{errors.description.message}
								</FieldError>
							)}
						</Field>
						<Button type="submit" disabled={!isValid}>
							Add Step
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AddStepsForm
