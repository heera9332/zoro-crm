"use client";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import Loader from "../_components/loader";
import { useSearchParams } from "next/navigation";
import { useTasks } from "@/hooks/use-tasks";
import { TaskSearch } from "../_components/task-search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function TasksPage() {
  const { tasks, loadTasks, loadingTasks, tasksPagination } = useTasks();
  const searchParams = useSearchParams();

  // Get the current query and page from URL
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  // Load tasks when q or page changes
  useEffect(() => {
    loadTasks({ limit, page, q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]);

  const handleSearch = (_query: string) => {
    // Search param is already in the URL (handled by TaskSearch)
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(newPage));
    window.history.replaceState({}, '', `?${params.toString()}`);
    // Optionally use useRouter().replace for scroll control
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1 className="mb-4">Tasks</h1>
      <TaskSearch onSearch={handleSearch} loading={loadingTasks} initialValue={q} />

      {loadingTasks && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      {!loadingTasks && (
        <div className="object-grid-list mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all delay-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-md shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
            >
              <div className="mb-4 flex justify-between items-start gap-2">
                <span
                  className={
                    "inline-block px-2 py-1 rounded-full text-xs font-semibold " +
                    (task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {task.status?.replace("-", " ") ?? "To-do"}
                </span>
                {task.priority && (
                  <span
                    className={
                      "inline-block px-2 py-1 rounded-full text-xs font-semibold " +
                      (task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700")
                    }
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/dashboard/tasks/${task.id}`}>
                  {task.title}
                </Link>
              </h3>
              {task.dueDate && (
                <div className="text-xs text-gray-500 mb-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              {task.timeTaken && (
                <div className="text-xs text-gray-500">
                  Time Taken: {task.timeTaken}h
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loadingTasks && tasksPagination && tasksPagination.totalPages > 1 && (
        <div className="mt-8 flex justify-start">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    tasksPagination.prevPage &&
                    handlePageChange(tasksPagination.prevPage)
                  }
                  aria-disabled={!tasksPagination.hasPrevPage}
                  tabIndex={!tasksPagination.hasPrevPage ? -1 : undefined}
                  className={
                    !tasksPagination.hasPrevPage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: tasksPagination.totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={tasksPagination.page === pageNum}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    tasksPagination.nextPage &&
                    handlePageChange(tasksPagination.nextPage)
                  }
                  aria-disabled={!tasksPagination.hasNextPage}
                  tabIndex={!tasksPagination.hasNextPage ? -1 : undefined}
                  className={
                    !tasksPagination.hasNextPage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default function TasksPageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <TasksPage />
    </Suspense>
  );
}
