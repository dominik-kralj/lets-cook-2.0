import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import AddIngredientsForm from "./AddIngredientsForm"
import type { Ingredient, CreateIngredientForm } from "../validation/schema"
import EditIngredientModal from "./EditIngredientModal"

type PendingIngredient = CreateIngredientForm

type IngredientsSectionProps = {
	recipeId: string
	ingredients: Ingredient[]
	pendingIngredients: PendingIngredient[]
	isDeletingIngredient: boolean
	onDeleteIngredient: (id: string) => void
	onRemovePending: (index: number) => void
}

function PendingIngredientsList({ items, onRemove }: { items: PendingIngredient[]; onRemove: (i: number) => void }) {
	if (!items.length) return null

	return (
		<div className="border-t pt-2">
			<p className="mb-1 text-xs text-muted-foreground">Pending:</p>
			<div className="flex flex-wrap gap-1">
				{items.map((ing, index) => (
					<span key={index} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
						{ing.quantity} {ing.unit} {ing.name}
						<button onClick={() => onRemove(index)} className="hover:text-destructive">×</button>
						{index < items.length - 1 && <span>,</span>}
					</span>
				))}
			</div>
		</div>
	)
}

export function IngredientsSection({ recipeId, ingredients, pendingIngredients, isDeletingIngredient, onDeleteIngredient, onRemovePending }: IngredientsSectionProps) {
	return (
		<div className="flex flex-col gap-4 rounded-xl border p-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Ingredients</h2>
				<AddIngredientsForm />
			</div>
			{!ingredients.length ? (
				<p className="text-sm text-muted-foreground">No ingredients yet</p>
			) : (
				<ul className="space-y-2">
					{ingredients.map((ingredient) => (
						<li key={ingredient.id} className="flex items-center justify-between text-sm">
							<span>
								<span className="font-medium">{ingredient.quantity} {ingredient.unit}</span>{" "}
								{ingredient.name}
							</span>
							<div className="flex gap-1">
								<EditIngredientModal ingredient={ingredient} recipeId={recipeId} />
								<Button
									variant="ghost"
									size="icon"
									className="size-7"
									disabled={isDeletingIngredient}
									onClick={() => onDeleteIngredient(ingredient.id)}
								>
									<Trash2 className="size-3 text-destructive" />
								</Button>
							</div>
						</li>
					))}
				</ul>
			)}
			<PendingIngredientsList items={pendingIngredients} onRemove={onRemovePending} />
		</div>
	)
}
