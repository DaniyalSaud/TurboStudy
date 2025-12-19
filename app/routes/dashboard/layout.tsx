import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { authMiddleware } from "@/middleware/authMiddleware";
import { authClient } from "@/lib/auth-client";
export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function DashboardLayout() {
  const {isPending} = authClient.useSession();

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
