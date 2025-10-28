import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SideBarUserSkeleton() {
  return (
    <SidebarFooter className="p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            {/* Avatar skeleton */}
            <Skeleton className="h-8 w-8 rounded-full" />
            
            {/* User info skeleton */}
            <div className="grid flex-1 gap-1.5 text-left">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            
            {/* Chevron skeleton */}
            <Skeleton className="ml-auto h-4 w-4 rounded" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
