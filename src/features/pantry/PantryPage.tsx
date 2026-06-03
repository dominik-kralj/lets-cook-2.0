import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { usePantry } from "./hooks/usePantry"
import AddPantryItemModal from "./components/AddPantryItemModal"
import { Search, Trash2 } from "lucide-react"
import EditPantryItemModal from "./components/EditPantryItemModal"
import type { PantryItem } from "./validation/schema"

function PantryItemRow({ item, isDeleting, onDelete }: { item: PantryItem; isDeleting: boolean; onDelete: (id: string) => void }) {
	return (
		<div className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm">
			<span className="min-w-0 truncate font-medium">{item.name}</span>
			<div className="flex shrink-0 items-center gap-4">
				<span className="text-muted-foreground">{item.quantity} {item.unit}</span>
				<div className="flex gap-1">
					<EditPantryItemModal item={item} />
					<Button variant="ghost" size="icon" className="size-7" disabled={isDeleting} onClick={() => onDelete(item.id)}>
						<Trash2 className="size-3 text-destructive" />
					</Button>
				</div>
			</div>
		</div>
	)
}

function PantryLoadingSkeleton() {
	return (
		<div className="space-y-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="h-12 w-full animate-pulse rounded-lg bg-muted" />
			))}
		</div>
	)
}

function PantryPage() {
	const { items, isLoading, isError, deleteItem, isDeleting } = usePantry()
	const [search, setSearch] = useState("")
	const filtered = items?.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())) ?? []

	return (
		<div>
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 flex items-center justify-between border-b bg-background px-6 py-4">
				<h1 className="text-2xl font-bold">My Pantry</h1>
				<AddPantryItemModal />
			</div>
			{isLoading ? (
				<PantryLoadingSkeleton />
			) : isError ? (
				<p className="text-muted-foreground">Something went wrong loading pantry items.</p>
			) : (
				<>
					<div className="relative mb-4">
						<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input className="pl-9" placeholder="Search pantry..." value={search} onChange={(e) => setSearch(e.target.value)} />
					</div>
					{!filtered.length ? (
						<p className="text-muted-foreground">{search ? "No items match your search." : "Your pantry is empty — add some ingredients."}</p>
					) : (
						<div className="space-y-2">
							{filtered.map((item) => (
								<PantryItemRow key={item.id} item={item} isDeleting={isDeleting} onDelete={deleteItem} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default PantryPage
