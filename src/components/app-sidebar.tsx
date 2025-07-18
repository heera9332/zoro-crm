"use client";

import * as React from "react";
import {
  Command,
  File,
  LayoutDashboard,
  ListChecks,
  KanbanSquare,
  ListTodo,
  StickyNote,
  User,
  Group,
  MessageCircle,
  User2Icon,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: LayoutDashboard,
      isActive: true,
    },
  ],

  navSubMenu: [
    {
      subject: "Dashboard",
      link: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      subject: "Tasks",
      link: "/dashboard/tasks",
      icon: ListChecks,
    },
    {
      subject: "Projects",
      link: "/dashboard/projects",
      icon: KanbanSquare,
    },
    {
      subject: "Todos",
      link: "/dashboard/todos",
      icon: ListTodo,
    },
    {
      subject: "Notes",
      link: "/dashboard/notes",
      icon: StickyNote,
    },
    {
      subject: "Users",
      link: "/dashboard/users",
      icon: Group,
    },
    {
      subject: "Messaging",
      link: "/dashboard/messaging",
      icon: MessageCircle,
    },
  ],

  messagingSubMenu: [
    {
      subject: "Users",
      link: "/messaging",
      icon: User2Icon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useSidebar();
  const { user } = useAuthStore();

  // Determine which main nav item should be active based on current path
  const activeItem = React.useMemo(() => {
    if (pathname.startsWith('/messaging')) {
      return data.navMain.find(item => item.title === 'Messaging') || data.navMain[0];
    }
    return data.navMain.find(item => item.title === 'Dashboard') || data.navMain[0];
  }, [pathname]);

  // Get the appropriate submenu based on active item
  const currentSubmenu = React.useMemo(() => {
    if (activeItem?.title === 'Messaging') {
      return data.messagingSubMenu;
    }
    return data.navSubMenu;
  }, [activeItem]);

  // Determine active submenu item
  const activeMailSubject = React.useMemo(() => {
    const match = currentSubmenu.find((item) => item.link === pathname);
    return match ? match.subject : "";
  }, [pathname, currentSubmenu]);

  const handleMainNavClick = (item: typeof data.navMain[0]) => {
    setOpen(true);
    router.push(item.url);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => handleMainNavClick(item)}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>

      {/* Second sidebar: main menu content */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent className="space-y-2">
              {currentSubmenu.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  className={`mx-2 bg-white rounded-md shadow-sm border border-gray-100 flex items-start gap-2 border-b px-[16px] py-[12px] text-sm leading-tight whitespace-nowrap last:border-b-0
                  hover:shadow-md hover:border-orange-200 transition-all duration-200
                  ${
                    activeMailSubject === item.subject
                      ? "border-r-4 border-r-orange-200 font-medium bg-orange-50"
                      : ""
                  }
                `}
                >
                  <item.icon size={16} />
                  <span className="transition">{item.subject}</span>
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}