import Navbar from "@/components/landing/nav-bar";
import { Outlet } from "react-router";


export default function LandingPageLayout() {
  
  return (
    <main className="transition-all min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </main>
  );
}
