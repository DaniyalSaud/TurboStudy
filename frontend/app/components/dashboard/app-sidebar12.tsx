"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronUp,
  Dumbbell,
  Home,
  User2,
  CreditCard,
  Zap,
  UtensilsCrossedIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { SelectUser } from "@/db/schema/users";
const sidebarItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Workout",
    href: "/dashboard/workout",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    href: "/dashboard/nutritions",
    icon: UtensilsCrossedIcon,
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: Zap,
  },
];

export function AppSidebar({user}: {user: Promise<SelectUser>}) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const {name} = use(user);

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            JumpFlow
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative h-8 md:h-10 transition-all duration-200 hover:bg-accent/70",
                        isActive &&
                          "bg-primary/8 text-primary hover:bg-primary/11 border-primary"
                      )}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-3"
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span
                          className={cn(
                            "font-medium transition-colors ",
                            isActive
                              ? "text-primary font-semibold"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="border-t border-border/40">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="font-medium hover:bg-accent/70 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                      <User2 className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{name}</span>
                    <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="end"
                  className="w-[--radix-popper-anchor-width] duration-200 transition-all"
                >
                  <DropdownMenuItem className="duration-200 transition-all hover:bg-accent cursor-pointer">
                    <User2 className="h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="duration-200 transition-all hover:bg-accent cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await signOut();
                    }}
                    className="focus:bg-red-50 hover:bg-red-50 duration-200 transition-all cursor-pointer"
                  >
                    <LogOutIcon className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
