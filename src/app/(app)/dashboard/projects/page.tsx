"use client";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import Loader from "../_components/loader";
import { ProjectSearch } from "../_components/project-search";
import { useSearchParams } from "next/navigation";
import { useProjects } from "@/hooks/use-projects";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Project } from "@/payload-types";

function Page() {
  const { projects, loadProjects, loadingProjects, projectsPagination } =
    useProjects();
  const searchParams = useSearchParams();

  // Get the current query and page from URL
  const q = searchParams.get("q") || "";
  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  // Always load projects when q or page changes!
  useEffect(() => {
    loadProjects({ limit, page, q });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page]); // <-- depends on URL params

  const handleSearch = (query: string) => {
    // The actual search param is already in the URL, so do nothing here.
    // The useEffect above will react to the URL param change.
  };

  const handlePageChange = (newPage: number) => {
    // update URL with page param, preserving q param
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(newPage));
    window.history.replaceState({}, "", `?${params.toString()}`);
    // Use useRouter() if you prefer (recommended in Next.js App Router)
    // router.replace(`?${params.toString()}`, { scroll: false });
    // No need to call loadProjects here, the effect will handle it
  };

  return (
    <div className="app-page px-2 pb-8">
      <h1 className="mb-4">Projects</h1>
      {/* Pass the query param as the initial value */}
      <ProjectSearch
        onSearch={handleSearch}
        loading={loadingProjects}
        initialValue={q}
      />
      {loadingProjects && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      )}
      {!loadingProjects && (
        <div className="object-grid-list mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all delay-200">
          {projects.map((project: Project, idx: number) => {
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
              <Link
                href={`/dashboard/projects/${project.id}`}
                key={project.id}
                className="bg-white rounded-md shadow-sm border border-gray-100 p-4 lg:p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:translate-y-[-4px]"
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2" title={project.title}>
                  {project.title.length > 10 ? project.title.slice(0, 18) + "..." : project.title}
                </h3>
                <div className="project-meta">
                  <p>
                    <strong>Statue: </strong>
                    {project?.status}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loadingProjects &&
        projectsPagination &&
        projectsPagination.totalPages > 1 && (
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

export default function PageMain() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
