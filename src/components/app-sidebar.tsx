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
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);

  const [mails, setMails] = React.useState(data.navSubMenu);
  const { setOpen } = useSidebar();
  const { user } = useAuthStore();

  // Instead of useState for activeMailSubject, derive it:
  const activeMailSubject = React.useMemo(() => {
    const match = data.navSubMenu.find((mail) => mail.link === pathname);
    return match ? match.subject : "";
  }, [pathname]);

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
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
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
              {mails.map((mail) => (
                <Link
                  href={mail.link}
                  key={mail.link}
                  className={`mx-2 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0
                  hover:shadow-md hover:border-orange-200
                  ${
                    activeMailSubject === mail.subject
                      ? "border-r-4 border-r-orange-200 font-medium"
                      : ""
                  }
                `}
                   
                >
                  <mail.icon size={16} />
                  <span className="transition">{mail.subject}</span>
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
