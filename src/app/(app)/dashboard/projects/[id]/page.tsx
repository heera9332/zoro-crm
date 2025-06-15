"use client";
import { useParams } from "next/navigation";
import { useAppStore } from "@/store/appStore";
import Image from "next/image";
import React, { useEffect } from "react";
import Content from "../../_components/contents";
import Loader from "../../_components/loader";
import Link from "next/link";
import { UserAvatar } from "../../_components/user-avatar";

export default function Page() {
  // Get id from URL
  const { id } = useParams();
  const projects = useAppStore((s) => s.projects);
  const loadProjects = useAppStore((s) => s.loadProjects);
  const loadingProjects = useAppStore((s) => s.loadingProjects);

  // Fetch all projects on mount (you can optimize later to fetch by id)
  useEffect(() => {
    if (projects.length === 0) {
      loadProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find the project by id
  const project = projects.find((p) => p.id === id);

  if (loadingProjects && !project) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-gray-600">The requested project does not exist.</p>
      </div>
    );
  }

  // Destructure with fallbacks
  const {
    title,
    description,
    featuredImage,
    dueDate,
    priority,
    status,
    notes,
    assignedTo,
    createdAt,
    updatedAt,
  } = project;
  console.log(description);
  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>
                Status: <span className="capitalize">{status}</span>
              </span>
              <span>
                Priority: <span className="capitalize">{priority}</span>
              </span>
              {dueDate && (
                <span>
                  Due: {new Date(dueDate).toLocaleDateString()}{" "}
                  {new Date(dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
          {/* Description using your Content renderer */}
          <div className="prose max-w-none text-gray-800 bg-gray-50 border p-4">
            {description && <Content content={description} />}
          </div>
          {/* Notes (if any) */}
          {notes && notes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Notes</h2>
              <div className="space-y-4">
                {notes.map((note) => {
                  return (
                    <div
                      // @ts-ignore
                      key={note?.id}
                      className="border-l-4 border-orange-300 pl-4 bg-orange-50/40 rounded-md py-2"
                    >
                      <Link
                        // @ts-ignore
                        href={`/dashboard/notes/${note?.id}`}
                        className="font-semibold"
                      >
                        {/* @ts-ignore */}
                        {note?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* Right Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          <div className="mb-6">
            <div className="rounded-xl overflow-hidden border border-gray-100 bg-orange-50 p-2">
              <Image
                // @ts-ignore
                src={featuredImage?.url || "/api/media/file/4.png"}
                // @ts-ignore
                width={featuredImage?.width || 360}
                // @ts-ignore
                height={featuredImage?.height || 180}
                // @ts-ignore
                alt={featuredImage?.alt || "project image"}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {createdAt && new Date(createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {updatedAt && new Date(updatedAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Assigned To:</span>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {Array.isArray(assignedTo) && assignedTo.length > 0 ? (
                  assignedTo.map((user: any) => (
                    <UserAvatar key={user.id} user={user} />
                  ))
                ) : (
                  <span className="text-gray-400 ml-2">No one assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
