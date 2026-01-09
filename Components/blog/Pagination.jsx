  "use client";

  import React from "react";

  export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex gap-2 justify-center mt-6">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-white border border-border"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
