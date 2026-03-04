import Navbar from "@/components/landing/nav-bar";
import { Outlet } from "react-router";

export default function LandingPageLayout() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      <Outlet />
    </main>
  );
}
