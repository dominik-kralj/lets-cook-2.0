import { useRecipes } from "../recipes/hooks/useRecipes"
import { useFavorites } from "../favorites/hooks/useFavorites"
import { useCollections } from "../collections/hooks/useCollections"
import { usePantry } from "../pantry/hooks/usePantry"
import { useAuth } from "../auth/hooks/useAuth"
import {
	UtensilsCrossed,
	Heart,
	BookMarked,
	ShoppingBasket,
	ChefHat,
} from "lucide-react"
import { Link } from "react-router"

function StatCard({
	icon: Icon,
	label,
	value,
	to,
}: {
	icon: React.ElementType
	label: string
	value: number | undefined
	to: string
}) {
	return (
		<Link to={to} className="group">
			<div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-sm">
				<div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary">
					<Icon className="size-5 text-primary transition-colors group-hover:text-primary-foreground" />
				</div>
				<p className="text-3xl font-bold text-foreground">
					{value ?? 0}
				</p>
				<p className="mt-1 text-sm text-muted-foreground">{label}</p>
			</div>
		</Link>
	)
}

export default function DashboardPage() {
	const { authUser } = useAuth()
	const { recipes } = useRecipes()
	const { favorites } = useFavorites()
	const { collections } = useCollections()
	const { items } = usePantry()

	return (
		<div className="px-6">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-foreground">
					Welcome back
					{authUser?.email ? `, ${authUser.email.split("@")[0]}` : ""}
					! 👋
				</h1>
				<p className="mt-1 text-muted-foreground">
					Here's what's going on in your kitchen.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				<StatCard
					icon={UtensilsCrossed}
					label="Recipes"
					value={recipes?.length}
					to="/recipes"
				/>
				<StatCard
					icon={Heart}
					label="Favorites"
					value={favorites?.length}
					to="/favorites"
				/>
				<StatCard
					icon={BookMarked}
					label="Collections"
					value={collections?.length}
					to="/collections"
				/>
				<StatCard
					icon={ShoppingBasket}
					label="Pantry Items"
					value={items?.length}
					to="/pantry"
				/>
			</div>

			<div className="mt-8 rounded-xl border border-border bg-card p-6">
				<div className="mb-4 flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-xl bg-muted">
						<ChefHat className="size-5 text-primary" />
					</div>
					<div>
						<h2 className="font-semibold text-foreground">
							AI Chef
						</h2>
						<p className="text-xs text-muted-foreground">
							Get recipe suggestions based on your pantry
						</p>
					</div>
				</div>
				<p className="mb-4 text-sm text-muted-foreground">
					You have{" "}
					<strong className="text-foreground">
						{items?.length ?? 0} ingredients
					</strong>{" "}
					in your pantry. Let AI suggest what you can cook tonight.
				</p>
				<Link
					to="/pantry-ai"
					className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				>
					<ChefHat className="size-4" />
					Ask AI Chef
				</Link>
			</div>
		</div>
	)
}
