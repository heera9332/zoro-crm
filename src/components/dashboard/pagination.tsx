'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  pagination: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  } | null;
  onPageChange: (newPage: number) => void;
}

export default function ObjectPagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  // handle `null` or single‑page cases
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const {
    totalPages,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = pagination;

  return (
    <div className="mt-8 flex justify-start">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => prevPage != null && onPageChange(prevPage)}
              aria-disabled={!hasPrevPage}
              tabIndex={hasPrevPage ? undefined : -1}
              className={!hasPrevPage ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={page === pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => nextPage != null && onPageChange(nextPage)}
              aria-disabled={!hasNextPage}
              tabIndex={hasNextPage ? undefined : -1}
              className={!hasNextPage ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
