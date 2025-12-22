import { Link, NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              TurboStudy
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </NavLink>
              <NavLink
                to="/pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </NavLink>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <ModeToggle />
            {!data?.session && (
              <>
                <Link to={"/login"}>
                  <Button
                    variant="ghost"
                    className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-600 dark:to-teal-600 hover:from-blue-700 hover:to-purple-700 dark:hover:from-emerald-700 dark:hover:to-teal-700 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {data?.session && (
              <Link to={"/dashboard"}>
                <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-600 dark:to-teal-600 hover:from-blue-700 hover:to-purple-700 dark:hover:from-emerald-700 dark:hover:to-teal-700 text-white border-0">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-emerald-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
