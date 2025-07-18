"use client";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import Loader from "../_components/loader";
import { useSearchParams } from "next/navigation";
import { useTodos } from "@/hooks/use-todos"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Optional: You can create a TodoSearch component like TaskSearch/ProjectSearch for DRY code.
function TodoSearch({ onSearch, loading, initialValue }: { onSearch: (q: string) => void; loading: boolean; initialValue?: string }) {
  const [query, setQuery] = React.useState(initialValue || "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="mb-6 flex items-center gap-2"
    >
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:ring-orange-500 focus:border-orange-500"
        placeholder="Search todos…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}

function TodosPage() {
  const { todos, getTodos, loadingTodos, todosPagination } = useTodos();
  const searchParams = useSearchParams();

  // Get current query and page from URL
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  useEffect(() => {
    getTodos({ limit, page, q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]);

  // Update URL on search
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("q", query);
    params.set("page", "1");
    window.history.replaceState({}, '', `?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(newPage));
    window.history.replaceState({}, '', `?${params.toString()}`);
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1 className="mb-4">Todos</h1>
      <TodoSearch onSearch={handleSearch} loading={loadingTodos} initialValue={q} />

      {loadingTodos && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      {!loadingTodos && (
        <div className="object-grid-list mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all delay-200">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="bg-white rounded-md shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
              >
                <div className="flex justify-between mb-2">
                  <span
                    className={
                      "inline-block px-2 py-1 rounded-full text-xs font-semibold " +
                      (todo.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : todo.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800")
                    }
                  >
                    {todo.status?.replace("-", " ") ?? "To-do"}
                  </span>
                  {todo.dueDate && (
                    <span className="text-xs text-gray-500">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  <Link href={`/dashboard/todos/${todo.id}`}>
                    {todo.title}
                  </Link>
                </h3>
                <div className="text-xs text-gray-500 mb-1">
                  {todo.author && typeof todo.author === "object"
                    ? `By ${todo.author.firstName ?? ""} ${todo.author.lastName ?? ""}`.trim()
                    : null}
                </div>
                {todo.project && typeof todo.project === "object" && (
                  <Link
                    className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                    href={`/dashboard/projects/${todo.project.id}`}
                  >
                    Project: {todo.project.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loadingTodos && todosPagination && todosPagination.totalPages > 1 && (
        <div className="mt-8 flex justify-start">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    todosPagination.prevPage &&
                    handlePageChange(todosPagination.prevPage)
                  }
                  aria-disabled={!todosPagination.hasPrevPage}
                  tabIndex={!todosPagination.hasPrevPage ? -1 : undefined}
                  className={
                    !todosPagination.hasPrevPage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: todosPagination.totalPages }).map(
                (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={todosPagination.page === pageNum}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    todosPagination.nextPage &&
                    handlePageChange(todosPagination.nextPage)
                  }
                  aria-disabled={!todosPagination.hasNextPage}
                  tabIndex={!todosPagination.hasNextPage ? -1 : undefined}
                  className={
                    !todosPagination.hasNextPage
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

export default function TodosPageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <TodosPage />
    </Suspense>
  );
}
