import { useNavigate } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { BookOpen, Heart, ShoppingBasket, ChefHat } from "lucide-react"

function HomePage() {
	const navigate = useNavigate()

	return (
		<div className="min-h-screen bg-background">
			<nav className="flex items-center justify-between px-8 py-6">
				<span className="text-xl font-bold tracking-tight text-foreground">
					Let's Cook
				</span>
				<div className="flex gap-3">
					<Button variant="ghost" onClick={() => navigate("/login")}>
						Login
					</Button>
					<Button onClick={() => navigate("/signup")}>
						Get Started
					</Button>
				</div>
			</nav>

			<section className="mx-auto max-w-5xl px-8 pt-20 pb-24">
				<div className="grid gap-16 md:grid-cols-2 md:items-center">
					<div>
						<p className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
							Your kitchen companion
						</p>
						<h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-foreground md:text-6xl">
							Cook with
							<br />
							intention.
						</h1>
						<p className="mb-8 text-lg leading-relaxed text-muted-foreground">
							Store your recipes, track your pantry, and let AI
							suggest what to cook with what you have.
						</p>
						<Button
							onClick={() => navigate("/signup")}
							className="px-6"
						>
							Start for free
						</Button>
					</div>

					<div className="hidden md:block">
						<div className="overflow-hidden rounded-2xl">
							<img
								src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
								srcSet="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80 400w, https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80 800w, https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80 1200w"
								sizes="(max-width: 768px) 0px, 50vw"
								alt="A beautiful spread of home cooked food"
								width={800}
								height={600}
								loading="eager"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
						<p className="mt-2 text-right text-xs text-muted-foreground">
							Photo by{" "}
							<a
								href="https://unsplash.com/@brookelark"
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								Brooke Lark
							</a>{" "}
							on Unsplash
						</p>
					</div>
				</div>
			</section>

			<section className="border-t border-border bg-card px-8 py-24">
				<div className="mx-auto max-w-5xl">
					<p className="mb-12 text-center text-sm font-medium tracking-widest text-muted-foreground uppercase">
						Everything you need
					</p>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: BookOpen,
								title: "Recipes",
								desc: "Create and organize all your recipes in one place",
							},
							{
								icon: Heart,
								title: "Favorites",
								desc: "Save the recipes you love and come back to them",
							},
							{
								icon: ShoppingBasket,
								title: "Pantry",
								desc: "Track what you have at home, reduce waste",
							},
							{
								icon: ChefHat,
								title: "AI Suggestions",
								desc: "Let AI suggest recipes based on your pantry",
							},
						].map(({ icon: Icon, title, desc }) => (
							<div key={title} className="group">
								<div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary">
									<Icon className="size-5 text-primary transition-colors group-hover:text-primary-foreground" />
								</div>
								<h3 className="mb-2 font-semibold text-foreground">
									{title}
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-8 py-24">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
						Ready to cook smarter?
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Join and start organizing your kitchen today.
					</p>
					<Button
						onClick={() => navigate("/signup")}
						className="px-8 py-6 text-base"
					>
						Create free account
					</Button>
				</div>
			</section>

			<footer className="border-t border-border px-8 py-6">
				<p className="text-center text-sm text-muted-foreground">
					© 2026 Let's Cook. Made with ♥
				</p>
			</footer>
		</div>
	)
}

export default HomePage
