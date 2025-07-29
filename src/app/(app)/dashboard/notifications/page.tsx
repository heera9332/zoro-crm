"use client";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "../../../../components/dashboard/loader";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationSearch } from "@/components/notification-search";
import ObjectPagination from "@/components/dashboard/pagination";
import { getSocket } from "@/lib/socket";

function Page() {
  const {
    notifications,
    loadNotifications,
    loadingNotifications,
    notificationsPagination,
  } = useNotifications();

  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12; 

  useEffect(() => {
    loadNotifications({ limit, page, q });
  }, [q, page]);

  const handleSearch = (query: string) => {
    // no-op; URL change triggers useEffect
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(newPage));
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1 className="mb-4 text-2xl font-semibold">Notifications</h1>

      <NotificationSearch
        onSearch={handleSearch}
        loading={loadingNotifications}
        initialValue={q}
      />

      {loadingNotifications && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      {!loadingNotifications && (
        <div className="flex flex-col gap-4">
          {notifications.map((notif) => (
            <Link href={`/dashboard/notifications/${notif.id}`} key={notif.id}>
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-2">{notif.title}</h3>
                <p className="text-sm text-gray-700 mb-1">{notif.content}</p>
                <span
                  className={`text-xs font-medium ${
                    notif.statusRead === "unread"
                      ? "text-orange-600"
                      : "text-gray-500"
                  }`}
                >
                  {notif.statusRead ?? "unread"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <ObjectPagination
        onPageChange={handlePageChange}
        pagination={notificationsPagination}
      />
    </div>
  );
}

export default function PageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
