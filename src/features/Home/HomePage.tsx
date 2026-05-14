import { useNavigate } from "react-router"
import { Button } from "@/shared/components/ui/button"

export function HomePage() {
	const navigate = useNavigate()
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">Let's Cook 🍳</h1>
			<p className="text-muted-foreground">
				Your personal recipe manager
			</p>
			<div className="flex gap-2">
				<Button onClick={() => navigate("/login")}>Login</Button>
				<Button variant="outline" onClick={() => navigate("/signup")}>
					Sign Up
				</Button>
			</div>
		</div>
	)
}
