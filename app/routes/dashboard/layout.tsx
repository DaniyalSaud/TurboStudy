import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Navigate, Outlet, redirect, useLoaderData } from "react-router";
import { authClient } from "@/lib/auth-client";
import type { Route } from "./+types";
import { authMiddleware } from "@/middleware/authMiddleware";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex-1 bg-neutral-50 dark:bg-neutral-950">
        <SidebarTrigger className="absolute p-5" size={"sm"} />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
