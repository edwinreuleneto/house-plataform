"use client";

// Dependencies
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const PaginationControls = ({ page, totalPages, onChange }: PaginationProps) => {
  const buildPages = (): (number | '…')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const items: (number | '…')[] = []
    items.push(1)
    if (page > 3) items.push('…')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let p = start; p <= end; p++) items.push(p)
    if (page < totalPages - 2) items.push('…')
    items.push(totalPages)
    return items
  }
  const pages = buildPages();
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <div className="pt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => !isFirst && onChange(page - 1)}
          disabled={isFirst}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => !isLast && onChange(page + 1)}
          disabled={isLast}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div />
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              onClick={() => !isFirst && onChange(page - 1)}
              disabled={isFirst}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            {pages.map((p, idx) => (
              p === '…' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-gray-300 ring-inset select-none"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onChange(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    p === page ? "z-10 bg-slate-800 text-white" : "text-gray-900"
                  }`}
                >
                  {p}
                </button>
              )
            ))}
            <button
              onClick={() => !isLast && onChange(page + 1)}
              disabled={isLast}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
