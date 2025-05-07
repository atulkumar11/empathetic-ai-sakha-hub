
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Flame,
  Home,
  Layout,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Newspaper,
  PieChart,
  Settings,
  Smile,
  UserRound,
  Users,
  Clock,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserProfileType } from '@/types/user';

interface StudentSidebarProps {
  userProfile: UserProfileType;
  collapsed: boolean;
  onLogout: () => void;
  onToggle: () => void;
}

export function StudentSidebar({
  userProfile,
  collapsed,
  onLogout,
  onToggle,
}: StudentSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Overview",
      icon: Home,
      path: "/dashboard/student",
    },
    {
      name: "Today's Plan",
      icon: Layout,
      path: "/dashboard/student/today",
    },
    {
      name: "AI Tutor",
      icon: MessageSquare,
      path: "/dashboard/student/tutor",
    },
    {
      name: "Concepts",
      icon: BookOpen,
      path: "/dashboard/student/concepts/landing",
    },
    {
      name: "Flashcards",
      icon: FileText,
      path: "/dashboard/student/flashcards/landing",
    },
    {
      name: "Practice Tests",
      icon: FileText,
      path: "/dashboard/student/practice-exam",
    },
    {
      name: "Study Groups",
      icon: Users,
      path: "/dashboard/student/study-groups",
    },
    {
      name: "Feel Good Corner",
      icon: Smile,
      path: "/dashboard/student/feel-good-corner",
    },
    {
      name: "Academic Advisor",
      icon: LifeBuoy,
      path: "/dashboard/student/academic",
    },
  ];

  const secondaryNavItems = [
    {
      name: "Profile",
      icon: UserRound,
      path: "/dashboard/student/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/student/settings",
    },
  ];

  const isActive = (path: string) => {
    // Exact match for dashboard overview
    if (path === '/dashboard/student' && currentPath === '/dashboard/student') {
      return true;
    }
    
    // For other paths, check if current path starts with the nav path
    // This handles nested routes like /dashboard/student/concepts/123
    return path !== '/dashboard/student' && currentPath.startsWith(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center h-[60px] px-4 border-b">
        {!collapsed && (
          <span className="text-lg font-semibold">PREPZR</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={onToggle}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed ? "" : "rotate-180"
            )}
          />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-2">
        <div className={cn("flex flex-col gap-1 px-2", collapsed ? "items-center" : "")}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: active }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "flex-col py-3 px-0 text-[10px]"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
        
        <div className={cn("mt-4 px-4", collapsed && "px-0")}>
          {!collapsed && <div className="mb-2 px-2 text-xs font-medium">Settings</div>}
          <div className={cn("flex flex-col gap-1", collapsed ? "items-center px-0" : "px-2")}>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    collapsed && "flex-col py-3 px-0 text-[10px]"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
            
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn(
                "justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "flex-col py-3 h-auto"
              )}
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Logout</span>}
              {collapsed && <span className="mt-1 text-[10px]">Logout</span>}
            </Button>
          </div>
        </div>
      </ScrollArea>

      {!collapsed && userProfile.subscription?.type === "premium" && (
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">Premium Plan</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Valid until {new Date(userProfile.subscription?.expiryDate || Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}
