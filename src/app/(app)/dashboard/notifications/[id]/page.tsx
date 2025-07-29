"use client";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/appStore";
import React, { useEffect } from "react";
import Loader from "../../../../../components/dashboard/loader";
import Link from "next/link";
import { UserAvatar } from "../../../../../components/dashboard/user-avatar";

// Optionally, make a helper to render the related entity
function RelatedTo({ related }: { related?: any }) {
  if (!related || !related.relationTo || !related.value) return null;
  let link = "#";
  let text = related.relationTo;
  switch (related.relationTo) {
    case "projects":
      link = `/dashboard/projects/${typeof related.value === "object" ? related.value.id : related.value}`;
      text = typeof related.value === "object" ? related.value.title : "Project";
      break;
    case "tasks":
      link = `/dashboard/tasks/${typeof related.value === "object" ? related.value.id : related.value}`;
      text = typeof related.value === "object" ? related.value.title : "Task";
      break;
    // ...add more cases as needed
  }
  return (
    <div className="mt-3">
      <span className="font-medium">Related To: </span>
      <Link href={link} className="underline text-orange-600">
        {text}
      </Link>
    </div>
  );
}

export default function Page() {
  // Get id from URL
  const { id } = useParams();
  const notifications = useAppStore((s) => s.notifications);
  const loadNotifications = useAppStore((s) => s.loadNotifications);
  const loadingNotifications = useAppStore((s) => s.loadingNotifications);

  // Fetch notifications on mount (optionally optimize later)
  useEffect(() => {
    if (notifications.length === 0) {
      loadNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find the notification by id
  const notification = notifications.find((n) => n.id === id);

  if (loadingNotifications && !notification) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-2xl font-bold mb-4">Notification Not Found</h1>
        <p className="text-gray-600">The requested notification does not exist.</p>
      </div>
    );
  }

  const {
    title,
    content,
    statusRead,
    createdAt,
    updatedAt,
    recipients,
    readBy,
    relatedTo,
  } = notification; 

  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Main Column */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                Status:{" "}
                <span className={`capitalize ${statusRead === "unread" ? "text-orange-600" : "text-gray-600"}`}>
                  {statusRead ?? "unread"}
                </span>
              </span>
              <span>
                Created: {createdAt && new Date(createdAt).toLocaleString()}
              </span>
              <span>
                Updated: {updatedAt && new Date(updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="prose max-w-none text-gray-800 bg-gray-50 border p-4">
            <div dangerouslySetInnerHTML={{__html: content}}/>
          </div>
          {relatedTo && <RelatedTo related={relatedTo} />}
        </div>
        {/* Side Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <span className="font-medium">Recipients:</span>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {Array.isArray(recipients) && recipients.length > 0 ? (
                  recipients.map((user: any) => (
                    <UserAvatar key={typeof user === "string" ? user : user?.id} user={user} />
                  ))
                ) : (
                  <span className="text-gray-400 ml-2">None</span>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium">Read By:</span>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {Array.isArray(readBy) && readBy.length > 0 ? (
                  readBy.map((user: any) => (
                    <UserAvatar key={typeof user === "string" ? user : user?.id} user={user} />
                  ))
                ) : (
                  <span className="text-gray-400 ml-2">None</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
