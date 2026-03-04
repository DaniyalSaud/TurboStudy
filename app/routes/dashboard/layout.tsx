import { Outlet, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/layout";
import { auth } from "@/lib/auth.server";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if user is authenticated
  const data = await auth.api.getSession(request);
  if (!data || !data.user || !data.session) {
    throw redirect("/login");
  }

  return null;
}

export default function DashboardLayout() {
  useLoaderData<typeof loader>();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-neutral-50 dark:bg-neutral-950">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
