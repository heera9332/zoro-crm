"use client";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import Loader from "../_components/loader";
import { useSearchParams } from "next/navigation";
import { useNotes } from "@/hooks/use-notes";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Optional: Create a NoteSearch component similar to ProjectSearch for DRY code.
function NoteSearch({ onSearch, loading, initialValue }: { onSearch: (q: string) => void; loading: boolean; initialValue?: string }) {
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
        placeholder="Search notes…"
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

function NotesPage() {
  const { notes, getNotes, loadingNotes, notesPagination } = useNotes();
  const searchParams = useSearchParams();

  // Get the current query and page from URL
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  // Load notes on search/page change
  useEffect(() => {
    getNotes({ limit, page, q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]);

  // Update URL when searching (same as project/tasks)
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
      <h1 className="mb-4">Notes</h1>
      <NoteSearch onSearch={handleSearch} loading={loadingNotes} initialValue={q} />

      {loadingNotes && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      {!loadingNotes && (
        <div className="notes mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all delay-200">
          {notes.map((note) => {
            // Handle featured image (optional chaining in case data is string/null)
            const imgUrl =
              typeof note.featuredImage === "object" && note.featuredImage?.url
                ? note.featuredImage.url
                : "/api/media/file/4.png";
            const imgAlt =
              typeof note.featuredImage === "object" && note.featuredImage?.alt
                ? note.featuredImage.alt
                : "note";
            return (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
              >
                <div className="bg-orange-50 flex items-center justify-center mb-4 overflow-hidden">
                  <Image
                    src={imgUrl}
                    width={400}
                    height={300}
                    alt={imgAlt}
                    className="object-cover aspect-4/3"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  <Link href={`/dashboard/notes/${note.id}`}>
                    {note.title}
                  </Link>
                </h3>
                <div className="text-xs text-gray-500 mb-2">
                  {note.author && typeof note.author === "object"
                    ? `By ${note.author.firstName ?? ""} ${note.author.lastName ?? ""}`.trim()
                    : null}
                  {note.createdAt && (
                    <span>
                      {" "}
                      &middot; {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {note.Tag && typeof note.Tag === "object" && (
                  <span className="inline-block px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium">
                    {note.Tag.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loadingNotes && notesPagination && notesPagination.totalPages > 1 && (
        <div className="mt-8 flex justify-start">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    notesPagination.prevPage &&
                    handlePageChange(notesPagination.prevPage)
                  }
                  aria-disabled={!notesPagination.hasPrevPage}
                  tabIndex={!notesPagination.hasPrevPage ? -1 : undefined}
                  className={
                    !notesPagination.hasPrevPage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: notesPagination.totalPages }).map(
                (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={notesPagination.page === pageNum}
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
                    notesPagination.nextPage &&
                    handlePageChange(notesPagination.nextPage)
                  }
                  aria-disabled={!notesPagination.hasNextPage}
                  tabIndex={!notesPagination.hasNextPage ? -1 : undefined}
                  className={
                    !notesPagination.hasNextPage
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

export default function NotesPageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <NotesPage />
    </Suspense>
  );
}
