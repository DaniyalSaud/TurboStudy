import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 bg-neutral-50 dark:bg-neutral-950">
        <SidebarTrigger className="absolute p-5" size={'sm'}  />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
