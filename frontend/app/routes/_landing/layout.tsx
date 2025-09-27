import Navbar from "@/components/landing/nav-bar";
import React from "react";
import { Outlet } from "react-router";
import type { Route } from "./+types";
import { authClient } from "@/lib/auth-client";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const session = await authClient.getSession();
  return session;
}

export default function LandingPageLayout() {
  
  return (
    <main className="transition-all min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </main>
  );
}
