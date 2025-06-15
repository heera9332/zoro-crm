"use client";
import Link from "next/link";
import { useAppStore } from "@/store/appStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../_components/loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProjectSearch } from "../_components/project-search";

function Page() {
  const projects = useAppStore((s) => s.projects);
  const loadProjects = useAppStore((s) => s.loadProjects);
  const loadingProjects = useAppStore((s) => s.loadingProjects);
  const projectsPagination = useAppStore((s) => s.projectsPagination);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch projects on mount and when page/search changes
  useEffect(() => {
    loadProjects({ limit, page, q: search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearch = (query: string) => {
    setPage(1);      // reset to first page on new search
    setSearch(query);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1>Projects</h1>

      {/* Search box */}
      <ProjectSearch onSearch={handleSearch} loading={loadingProjects} initialValue={search} />

      {loadingProjects && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}
      {!loadingProjects && (
        <div className="tasks mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all delay-200">
          {projects.map((project) => {
            const imgUrl =
              typeof project.featuredImage === "object" &&
              project.featuredImage?.url
                ? project.featuredImage.url
                : "/api/media/file/4.png";
            const imgAlt =
              typeof project.featuredImage === "object" &&
              project.featuredImage?.alt
                ? project.featuredImage.alt
                : "project";

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
              >
                <div className="bg-orange-50 flex items-center justify-center mb-4 overflow-hidden">
                  <Image
                    src={imgUrl}
                    width={500}
                    height={500}
                    alt={imgAlt}
                    className="object-cover aspect-4/3"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/dashboard/projects/${project.id}`}>
                    {project.title}
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loadingProjects && projectsPagination && projectsPagination.totalPages > 1 && (
        <div className="mt-8 flex justify-start">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    projectsPagination.prevPage &&
                    handlePageChange(projectsPagination.prevPage)
                  }
                  aria-disabled={!projectsPagination.hasPrevPage}
                  tabIndex={!projectsPagination.hasPrevPage ? -1 : undefined}
                  className={
                    !projectsPagination.hasPrevPage
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: projectsPagination.totalPages }).map(
                (_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={projectsPagination.page === pageNum}
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
                    projectsPagination.nextPage &&
                    handlePageChange(projectsPagination.nextPage)
                  }
                  aria-disabled={!projectsPagination.hasNextPage}
                  tabIndex={!projectsPagination.hasNextPage ? -1 : undefined}
                  className={
                    !projectsPagination.hasNextPage
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

export default Page;
