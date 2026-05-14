import { Button } from "@/shared/components/ui/button"
import { useAuth } from "../auth/hooks/useAuth"

export default function DashboardPage() {
	const { logout } = useAuth()
	return (
		<div>
			<Button onClick={() => logout()}>Logout</Button>
		</div>
	)
}
