import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import AddStepsForm from "./AddStepsForm"
import type { Step, CreateStepForm } from "../validation/schema"
import EditStepModal from "./EditStepModal"

type PendingStep = CreateStepForm

type StepsSectionProps = {
	recipeId: string
	steps: Step[]
	pendingSteps: PendingStep[]
	isDeletingStep: boolean
	onDeleteStep: (id: string) => void
	onRemovePending: (index: number) => void
}

function PendingStepsList({ items, onRemove }: { items: PendingStep[]; onRemove: (i: number) => void }) {
	if (!items.length) return null

	return (
		<div className="border-t pt-2">
			<p className="mb-1 text-xs text-muted-foreground">Pending:</p>
			<div className="flex flex-wrap gap-1">
				{items.map((step, index) => (
					<span key={index} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
						{index + 1}. {step.description}
						<button onClick={() => onRemove(index)} className="hover:text-destructive">×</button>
						{index < items.length - 1 && <span>,</span>}
					</span>
				))}
			</div>
		</div>
	)
}

export function StepsSection({ recipeId, steps, pendingSteps, isDeletingStep, onDeleteStep, onRemovePending }: StepsSectionProps) {
	return (
		<div className="flex flex-col gap-4 rounded-xl border p-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Steps</h2>
				<AddStepsForm />
			</div>
			{!steps.length ? (
				<p className="text-sm text-muted-foreground">No steps yet</p>
			) : (
				<ol className="space-y-3">
					{steps.sort((a, b) => a.order - b.order).map((step, index) => (
						<li key={step.id} className="flex items-center gap-3 text-sm">
							<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
								{index + 1}
							</span>
							<span className="flex-1">{step.description}</span>
							<div className="flex gap-1">
								<EditStepModal step={step} recipeId={recipeId} />
								<Button
									variant="ghost"
									size="icon"
									className="size-7"
									disabled={isDeletingStep}
									onClick={() => onDeleteStep(step.id)}
								>
									<Trash2 className="size-3 text-destructive" />
								</Button>
							</div>
						</li>
					))}
				</ol>
			)}
			<PendingStepsList items={pendingSteps} onRemove={onRemovePending} />
		</div>
	)
}
