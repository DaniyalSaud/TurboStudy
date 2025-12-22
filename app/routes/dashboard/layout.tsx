import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/layout";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if user is authenticated
  const data = await auth.api.getSession();
  if (!data || !data.user || !data.session) {
    throw redirect("/login");
  }
  return null;
}

export default function DashboardLayout() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 bg-neutral-50 dark:bg-neutral-950">
        <SidebarTrigger className="w-4 h-4 absolute" size={"icon"} />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
