"use client";
import React, { Suspense, useEffect } from "react";
import { useUsers } from "@/hooks/use-users";
import { useSearchParams } from "next/navigation";
import Loader from "../../../../components/dashboard/loader";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/payload-types";

function UserSearch({
  onSearch,
  loading,
  initialValue,
}: {
  onSearch: (q: string) => void;
  loading: boolean;
  initialValue?: string;
}) {
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
        placeholder="Search users…"
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

function UsersPage() {
  const { users, getUsers, loadingUsers, usersPagination } = useUsers();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  useEffect(() => {
    getUsers({ limit, page, q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("q", query);
    params.set("page", "1");
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(newPage));
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1 className="mb-4">Users</h1>
      <UserSearch
        onSearch={handleSearch}
        loading={loadingUsers}
        initialValue={q}
      />

      {loadingUsers && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}

      {!loadingUsers && (
        <div className="object-grid-list mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all delay-200">
          {users.map((user: User) => {
            const imgUrl =
              typeof user?.avatar === "object" && user?.avatar?.url
                ? user?.avatar?.url
                : "/api/media/file/4.png";
            const imgAlt =
              typeof user.avatar === "object" && user?.avatar?.alt
                ? user?.avatar.alt
                : user?.username || "user";
            return (
              <div
                key={user.id}
                className="bg-white rounded-md shadow-sm border border-gray-100 p-6 flex flex-col items-center transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
              >
                <div className="mb-3 w-20 h-20 rounded-full overflow-hidden border">
                  <Image
                    src={imgUrl}
                    width={80}
                    height={80}
                    alt={imgAlt}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center line-clamp-1">
                  <Link href={`/dashboard/users/${user.id}`}>
                    {user?.firstName || user.lastName
                      ? `${user?.firstName || ""} ${user.lastName || ""}`.trim()
                      : user.username}
                  </Link>
                </h3>
                <div className="text-xs text-gray-500 text-center mb-1 line-clamp-1">
                  {user.email}
                </div>
                <div className="flex gap-1 flex-wrap justify-center mb-1">
                  {user.roles?.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <span
                  className={
                    "mt-1 text-xs font-semibold " +
                    (user.isActive ? "text-green-700" : "text-red-500")
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!loadingUsers && usersPagination && usersPagination.totalPages > 1 && (
        <div className="mt-8 flex justify-start">
          <nav className="flex gap-2">
            {Array.from({ length: usersPagination.totalPages }).map(
              (_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    className={
                      "px-3 py-1 rounded " +
                      (usersPagination.page === pageNum
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700")
                    }
                    onClick={() => handlePageChange(pageNum)}
                    disabled={usersPagination.page === pageNum}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

export default function UsersPageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <UsersPage />
    </Suspense>
  );
}
