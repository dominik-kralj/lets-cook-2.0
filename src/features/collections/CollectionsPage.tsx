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

function CollectionsPage() {
	const { collections, isLoading, isError, deleteCollection } =
		useCollections()

	if (isLoading)
		return (
			<div className="px-6">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-2xl font-bold">Collections</h1>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-3/4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-1/2" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		)

	if (isError) return <div className="px-6">Something went wrong</div>

	return (
		<div className="px-6">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Collections</h1>
				<CreateCollectionModal />
			</div>

			{!collections?.length ? (
				<p className="text-muted-foreground">
					No collections yet — create one to group your recipes.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{collections.map((collection) => (
						<Card key={collection.id}>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle className="hover:underline">
									<Link to={`/collections/${collection.id}`}>
										{collection.name}
									</Link>
								</CardTitle>

								<div className="flex gap-1">
									<EditCollectionModal
										collection={collection}
									/>

									<Button
										variant="ghost"
										size="icon"
										onClick={() =>
											deleteCollection(collection.id)
										}
									>
										<Trash2 className="size-4 text-destructive" />
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<CardDescription>
									{collection.description}
								</CardDescription>
								<p className="mt-2 text-xs text-muted-foreground">
									{collection.collection_recipes?.length ?? 0}{" "}
									recipes
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}

export default CollectionsPage
