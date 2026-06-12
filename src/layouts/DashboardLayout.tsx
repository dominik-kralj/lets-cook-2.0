import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	SidebarFooter,
	useSidebar,
} from "@/shared/components/ui/sidebar"
import { Link, Outlet } from "react-router"
import {
	UtensilsCrossed,
	HeartIcon,
	Library,
	Package,
	Sparkles,
	LayoutDashboard,
	LogOut,
	Sun,
	Moon,
} from "lucide-react"
import { Spinner } from "@/shared/components/ui/spinner"
import { Suspense } from "react"
import { TooltipProvider } from "@/shared/components/ui/tooltip"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Button } from "@/shared/components/ui/button"
import { useTheme } from "@/shared/components/theme-provider"

const NAV_ITEMS = [
	{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
	{ to: "/recipes", icon: UtensilsCrossed, label: "Recipes" },
	{ to: "/favorites", icon: HeartIcon, label: "Favorites" },
	{ to: "/collections", icon: Library, label: "Collections" },
	{ to: "/pantry", icon: Package, label: "Pantry" },
	{ to: "/pantry-ai", icon: Sparkles, label: "Pantry AI" },
]

function SidebarNav() {
	const { setOpenMobile, isMobile } = useSidebar()
	const { logout } = useAuth()

	const closeMobileSidebar = () => {
		if (isMobile) setOpenMobile(false)
	}

	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel>Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{NAV_ITEMS.map(({ to, icon: Icon, label }) => (
							<SidebarMenuItem key={to}>
								<SidebarMenuButton asChild>
									<Link to={to} onClick={closeMobileSidebar}>
										<Icon />
										<span>{label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={() => logout()}
							className="text-muted-foreground hover:text-destructive"
						>
							<LogOut />
							<span>Sign out</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</>
	)
}

function PageLoader() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
			<Spinner className="size-8" />
			<p className="text-sm">Loading…</p>
		</div>
	)
}

function DashboardLayout() {
	const { theme, setTheme } = useTheme()

	return (
		<TooltipProvider>
			<SidebarProvider>
				<Sidebar>
					<SidebarContent>
						<SidebarNav />
					</SidebarContent>
				</Sidebar>

				<div className="flex flex-1 flex-col">
					<header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-background px-4">
						<div className="flex items-center gap-2">
							<SidebarTrigger />
							<Link to="/" className="font-bold">
								🍳 Let's Cook
							</Link>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								setTheme(theme === "dark" ? "light" : "dark")
							}
						>
							{theme === "dark" ? (
								<Sun className="size-4" />
							) : (
								<Moon className="size-4" />
							)}
						</Button>
					</header>

					<main className="flex flex-1 flex-col p-6">
						<Suspense fallback={<PageLoader />}>
							<Outlet />
						</Suspense>
					</main>
				</div>
			</SidebarProvider>
		</TooltipProvider>
	)
}

export default DashboardLayout
