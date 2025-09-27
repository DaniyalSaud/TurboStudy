import {
  Home,
  MessageSquare,
  Clock,
  Settings,
  LogOut,
  User,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

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
import { Link, NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock chat history data (replace with actual data from your backend)
const chatHistory = [
  {
    id: "1",
    title: "React Components Best Practices",
    date: "Today",
    time: "2:30 PM",
  },
  {
    id: "2",
    title: "TypeScript Advanced Types",
    date: "Today",
    time: "1:15 PM",
  },
  {
    id: "3",
    title: "Database Design Principles",
    date: "Yesterday",
    time: "4:20 PM",
  },
  {
    id: "4",
    title: "API Authentication Methods",
    date: "Yesterday",
    time: "11:30 AM",
  },
  {
    id: "5",
    title: "JavaScript Performance Optimization",
    date: "Monday",
    time: "3:45 PM",
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox",
    date: "Monday",
    time: "10:20 AM",
  },
  {
    id: "7",
    title: "Node.js Security Best Practices",
    date: "Last Friday",
    time: "5:10 PM",
  },
];

// Mock user data (replace with actual user data)
const user = {
  name: "Danny Smith",
  email: "danny@example.com",
  avatar: "", // Add avatar URL when available
};

export function AppSidebar() {
  const truncateTitle = (title: string, maxLength: number = 25) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

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
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            TurboStudy
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between pt-4 overflow-hidden">
        {/* Home Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              <SidebarMenuItem>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-accent-foreground/60 font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
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
                      isActive && "bg-accent text-accent-foreground"
                    )
                  }
                  end
                >
                  <Home className="h-4 w-4" />
                  <span>Notes</span>
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Chat History */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Clock className="h-3 w-3" />
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[350px] pr-2">
              <SidebarMenu className="gap-1">
                {chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <NavLink
                      to={`/dashboard/chat/${chat.id}`}
                      className={({ isActive }: { isActive: boolean }) =>
                        cn(
                          "flex flex-col items-start gap-1 w-full p-2 text-accent-foreground/60 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground group",
                          isActive &&
                            "bg-accent text-accent-foreground font-medium"
                        )
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium truncate flex-1">
                          {truncateTitle(chat.title)}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.preventDefault()}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {chat.date} • {chat.time}
                      </span>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
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
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
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
                <DropdownMenuItem className="text-red-400 font-medium hover:bg-red-950/50 hover:text-red-300 focus:bg-red-950/50 focus:text-red-300 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300 transition-all duration-200 ease-in-out cursor-pointer">
                  <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300 dark:text-red-400 dark:group-hover:text-red-300 transition-colors duration-200" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
