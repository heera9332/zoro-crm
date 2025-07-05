"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import { useNotificationSocket } from "@/hooks/use-notification-socket";
import { DashboardBreadcrumb } from "./_components/breadcrumb";
import { Toaster } from "@/components/ui/sonner";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavActions } from "./_components/nav-actions";
import { NotificationsTray } from "./_components/notifications-tray";

export default function Page({ children }) {
  const { user } = useAuthStore();
  useNotificationSocket(user?.id);

  return (
    <html>
      <head></head>
      <body>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "320px",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex justify-between w-full">
                <DashboardBreadcrumb />
                <div className="flex justify-end gap-2">
                  <NotificationsTray />
                  <NavActions />
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 app-main">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
