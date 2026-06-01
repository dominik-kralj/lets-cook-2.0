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
} from "@/shared/components/ui/sidebar"
import { Link, Outlet } from "react-router"
import { UtensilsCrossed, HeartIcon, Library, Package } from "lucide-react"
import { Spinner } from "@/shared/components/ui/spinner"
import { Suspense } from "react"

function DashboardLayout() {
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Menu</SidebarGroupLabel>

						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link to="/recipes">
											<UtensilsCrossed />
											<span>Recipes</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link to="/favorites">
											<HeartIcon />
											<span>Favorites</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link to="/collections">
											<Library />
											<span>Collections</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link to="/pantry">
											<Package />
											<span>Pantry</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
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
