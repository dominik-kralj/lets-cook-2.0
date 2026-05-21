import { useForm } from "react-hook-form"
import { createStepFormSchema, type CreateStepForm } from "../validation/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { useRecipeForm } from "../context/RecipeFormContext"
import { X } from "lucide-react"

function AddStepsForm() {
	const { addStep, steps, removeStep } = useRecipeForm()

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
	}

	return (
		<div className="flex flex-col gap-3">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-3"
			>
				<Field data-invalid={!!errors.description}>
					<FieldLabel>Name</FieldLabel>
					<Input
						{...register("description")}
						placeholder="e.g. Flour"
					/>
					{errors.description && (
						<FieldError>{errors.description.message}</FieldError>
					)}
				</Field>

				<Button
					type="submit"
					disabled={!isValid}
					size="sm"
					className="w-full"
				>
					Add Step
				</Button>
			</form>

			{steps.length > 0 && (
				<div className="mt-3">
					<p className="mb-2 text-xs text-muted-foreground">
						Pending:
					</p>
					<ol className="space-y-1">
						{steps.map((step, index) => (
							<li
								key={index}
								className="flex items-center justify-between text-sm"
							>
								<span>
									{index + 1}. {step.description}
								</span>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeStep(index)}
								>
									<X className="size-3" />
								</Button>
							</li>
						))}
					</ol>
				</div>
			)}
		</div>
	)
}

export default AddStepsForm
