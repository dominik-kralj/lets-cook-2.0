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
	useSidebar,
} from "@/shared/components/ui/sidebar"
import { Link, Outlet } from "react-router"
import { UtensilsCrossed, HeartIcon, Library, Package } from "lucide-react"
import { Spinner } from "@/shared/components/ui/spinner"
import { Suspense } from "react"

const NAV_ITEMS = [
	{ to: "/recipes", icon: UtensilsCrossed, label: "Recipes" },
	{ to: "/favorites", icon: HeartIcon, label: "Favorites" },
	{ to: "/collections", icon: Library, label: "Collections" },
	{ to: "/pantry", icon: Package, label: "Pantry" },
]

function SidebarNav() {
	const { setOpenMobile, isMobile } = useSidebar()
	const closeMobileSidebar = () => { if (isMobile) setOpenMobile(false) }

	return (
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
	)
}

function DashboardLayout() {
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarContent>
					<SidebarNav />
				</SidebarContent>
			</Sidebar>

			<div className="flex flex-1 flex-col">
				<header className="sticky top-0 z-10 flex items-center border-b bg-background p-4">
					<SidebarTrigger />
					<Link to="/" className="font-bold">
						🍳 Let's Cook
					</Link>
				</header>

				<main className="flex-1 p-6">
					<Suspense fallback={<Spinner />}>
						<Outlet />
					</Suspense>
				</main>
			</div>
		</SidebarProvider>
	)
}

export default DashboardLayout
