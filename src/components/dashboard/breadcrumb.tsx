
"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  tasks: "Tasks",
  notes: "Notes",
  // add more static label overrides here
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  // Split path into segments and filter out empty ones
  const segments = pathname.split("/").filter(Boolean);

  // For root (/dashboard), show only Dashboard
  if (segments.length <= 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{LABELS["dashboard"] || "Dashboard"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Build breadcrumb chain
  let href = "";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((seg, idx) => {
          href += `/${seg}`;
          const isLast = idx === segments.length - 1;
          const label =
            LABELS[seg] ||
            // If it's an id, show as "#id"
            (/^[0-9a-f]{24}$/i.test(seg) ? `#${seg.slice(0, 6)}…` : seg.charAt(0).toUpperCase() + seg.slice(1));

          return (
            <span key={href} className="flex items-center">
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
