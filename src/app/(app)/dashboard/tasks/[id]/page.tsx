"use client";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/use-tasks";
import { useEffect } from "react";
import Content from "../../_components/contents";
import Loader from "../../_components/loader";
import Link from "next/link";
import { UserAvatar } from "../../_components/user-avatar";

export default function Page() {
  // Get id from URL
  const { id } = useParams();
  const { tasks, loadTasks, loadingTasks } = useTasks();

  // Fetch all tasks on mount (can optimize for single fetch by id if needed)
  useEffect(() => {
    if (tasks.length === 0) loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find the task by id
  const task = tasks.find((t) => t.id === id);

  if (loadingTasks && !task) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-2xl font-bold mb-4">Task Not Found</h1>
        <p className="text-gray-600">The requested task does not exist.</p>
      </div>
    );
  }

  // Destructure with fallbacks
  const {
    title,
    content,
    comments,
    status,
    priority,
    assignedTo,
    dueDate,
    timeTaken,
    estimatedTime,
    createdAt,
    updatedAt,
    project,
  } = task;

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
              <span>
                Priority:{" "}
                <span className="capitalize">{priority || "low"}</span>
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
              {estimatedTime && (
                <span>
                  Estimated: <span className="">{estimatedTime}h</span>
                </span>
              )}
              {timeTaken && (
                <span>
                  Time Taken: <span className="">{timeTaken}h</span>
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
          {/* Comments (if any) */}
          {comments && Array.isArray(comments) && comments.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              <div className="space-y-4">
                {comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="border-l-4 border-orange-300 pl-4 bg-orange-50/40 rounded-md py-2"
                  >
                    <div className="font-semibold">{comment.title}</div>
                    <div className="text-sm text-gray-600">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Right Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          <div className="mb-6">
            <div className="rounded-md overflow-hidden border border-gray-100 bg-orange-50 p-2 flex items-center justify-center min-h-[120px]">
              <span className="text-orange-400 text-6xl">
                <svg width={44} height={44} fill="none" viewBox="0 0 24 24">
                  <path
                    d="M16 17v1a3 3 0 1 1-6 0v-1m-3 0a3 3 0 1 1-6 0v-1a9 9 0 1 1 18 0v1a3 3 0 1 1-6 0v-1"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  />
                </svg>
              </span>
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
