"use client";
import { useParams } from "next/navigation";
import { useTodos } from "@/hooks/use-todos";
import { useEffect } from "react";
import Content from "../../../../../components/dashboard/contents";
import Loader from "../../../../../components/dashboard/loader";
import Link from "next/link";
import { UserAvatar } from "../../../../../components/dashboard/user-avatar";

export default function TodoDetailPage() {
  // Get id from URL
  const { id } = useParams();
  const { todos, getTodos, loadingTodos } = useTodos();

  // Fetch all todos on mount (for now, optimize later for getTodo)
  useEffect(() => {
    if (todos.length === 0) getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find the todo by id
  const todo = todos.find((t) => t.id === id);

  if (loadingTodos && !todo) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-2xl font-bold mb-4">Todo Not Found</h1>
        <p className="text-gray-600">The requested todo does not exist.</p>
      </div>
    );
  }

  // Destructure with fallbacks
  const {
    title,
    content,
    status,
    dueDate,
    author,
    project,
    createdAt,
    updatedAt,
  } = todo;

  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-500 flex-wrap">
              <span>
                Status: <span className="capitalize">{status || "to-do"}</span>
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
              {project && typeof project === "object" && (
                <span>
                  Project:{" "}
                  <Link
                    className="text-orange-500 underline"
                    href={`/dashboard/projects/${project.id}`}
                  >
                    {project.title}
                  </Link>
                </span>
              )}
            </div>
          </div>
          {/* Content using your Content renderer */}
          <div className="prose max-w-none text-gray-800 bg-gray-50 border p-4">
            {content && <Content content={content} />}
          </div>
        </div>
        {/* Right Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          <div className="mb-6">
            <div className="rounded-md overflow-hidden border border-gray-100 bg-orange-50 p-2 flex items-center justify-center min-h-[120px]">
              {/* You can add an icon or illustration here if desired */}
              <span className="text-orange-400 text-4xl">📝</span>
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
              <span className="font-medium">Author:</span>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {author && typeof author === "object" ? (
                  <UserAvatar user={author} />
                ) : (
                  <span className="text-gray-400 ml-2">Unknown</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
