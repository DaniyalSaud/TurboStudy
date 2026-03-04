import {
  Home,
  MessageSquare,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Loader2,
  BookOpen,
  Sparkles,
  Lightbulb,
  FileText,
} from "lucide-react";
import { useState, useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { SideBarUserSkeleton } from "../skeletons/side-bar-user-skeleton";

const quickActions = [
  {
    title: "Browse Notes",
    description: "View and manage your study notes",
    icon: BookOpen,
    to: "/dashboard/notes",
  },
  {
    title: "Generate with AI",
    description: "Upload & generate study material",
    icon: Sparkles,
    to: "/dashboard",
  },
];

const studyTips = [
  {
    tip: "Break study sessions into 25-minute focused blocks with 5-minute breaks (Pomodoro Technique).",
    category: "Focus",
  },
  {
    tip: "Teach what you learn to someone else — it's one of the most effective ways to retain information.",
    category: "Retention",
  },
  {
    tip: "Review your notes within 24 hours of taking them to boost long-term memory by up to 60%.",
    category: "Memory",
  },
  {
    tip: "Use active recall: close your notes and try to write down everything you remember.",
    category: "Practice",
  },
  {
    tip: "Connect new concepts to things you already know — building mental bridges strengthens understanding.",
    category: "Learning",
  },
  {
    tip: "Stay hydrated and take short walks between study sessions to keep your mind sharp.",
    category: "Wellness",
  },
  {
    tip: "Start with the hardest topic when your energy is highest, then move to easier material.",
    category: "Strategy",
  },
];

export function AppSidebar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      await navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const { data, isPending } = authClient.useSession();

  // Pick two random tips to show per render
  const displayedTips = useMemo(() => {
    const shuffled = [...studyTips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="py-4">
        <Link
          to={"/dashboard"}
          className="flex items-center gap-3 px-2 py-1 rounded-lg transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            TurboStudy
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col pt-4 overflow-hidden">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              <SidebarMenuItem>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-accent-foreground/60 font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground",
                    )
                  }
                  end
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink
                  to={"/dashboard/notes"}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-accent-foreground/60 font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground",
                    )
                  }
                  end
                >
                  <FileText className="h-4 w-4" />
                  <span>Notes</span>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <NavLink
                    to={action.to}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn(
                        "flex items-start gap-3 w-full px-3 py-2.5 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground group",
                        isActive &&
                        "bg-accent text-accent-foreground",
                      )
                    }
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0 group-hover:bg-primary/15 transition-colors">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm truncate">
                        {action.title}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {action.description}
                      </span>
                    </div>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Study Tips */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Lightbulb className="h-3 w-3" />
            Study Tips
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2 px-2">
              {displayedTips.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                >
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary/70 mb-1">
                    {item.category}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      {!isPending && data?.user && (
        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={data!.user.image || ""}
                        alt={data!.user.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {data.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem className="transition-all">
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="transition-all">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-400 font-medium hover:bg-red-950/50 hover:text-red-300 focus:bg-red-950/50 focus:text-red-300 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300 transition-all duration-200 ease-in-out cursor-pointer"
                  >
                    {!isLoggingOut && (
                      <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300 dark:text-red-400 dark:group-hover:text-red-300 transition-colors duration-200" />
                    )}
                    {isLoggingOut && (
                      <Loader2 className="h-4 w-4 mr-2 text-red-400 animate-spin" />
                    )}
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
      {isPending && <SideBarUserSkeleton />}
    </Sidebar>
  );
}
