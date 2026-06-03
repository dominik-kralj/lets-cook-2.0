import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import CreateCollectionModal from "./components/CreateCollectionModal"
import { useCollections } from "./hooks/useCollections"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Link } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"
import { EditCollectionModal } from "./components/EditCollectionModal"
import type { Collection } from "./validation/schema"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"

function CollectionsLoadingSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 4 }).map((_, i) => (
				<Card key={i}>
					<CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
					<CardContent><Skeleton className="h-4 w-1/2" /></CardContent>
				</Card>
			))}
		</div>
	)
}

function CollectionCard({ collection, onDelete }: { collection: Collection; onDelete: (id: string) => void }) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between gap-2">
				<CardTitle className="min-w-0">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link to={`/collections/${collection.id}`} className="block truncate hover:underline">
								{collection.name}
							</Link>
						</TooltipTrigger>
						<TooltipContent>{collection.name}</TooltipContent>
					</Tooltip>
				</CardTitle>
				<div className="flex shrink-0 gap-1">
					<EditCollectionModal collection={collection} />
					<Button variant="ghost" size="icon" onClick={() => onDelete(collection.id)}>
						<Trash2 className="size-4 text-destructive" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription className="line-clamp-2">{collection.description}</CardDescription>
				<p className="mt-2 text-xs text-muted-foreground">
					{collection.collection_recipes?.length ?? 0} recipes
				</p>
			</CardContent>
		</Card>
	)
}

function CollectionsPage() {
	const { collections, isLoading, isError, deleteCollection } = useCollections()

	return (
		<div>
			<div className="sticky top-14 z-[5] -mx-6 -mt-6 mb-6 flex items-center justify-between border-b bg-background px-6 py-4">
				<h1 className="text-2xl font-bold">Collections</h1>
				<CreateCollectionModal />
			</div>
			{isLoading ? (
				<CollectionsLoadingSkeleton />
			) : isError ? (
				<p className="text-muted-foreground">Something went wrong loading collections.</p>
			) : !collections?.length ? (
				<p className="text-muted-foreground">No collections yet — create one to group your recipes.</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{collections.map((collection) => (
						<CollectionCard key={collection.id} collection={collection} onDelete={deleteCollection} />
					))}
				</div>
			)}
		</div>
	)
}

export default CollectionsPage
