
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalResults, 
  itemsPerPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const windowSize = 1;
    
    // Logic to determine if we allow jumping to the very last page
    // We enable it only if the user is within 10 pages of the end to prevent massive API offsets
    const isNearEnd = (totalPages - currentPage) <= 10;
    
    // First Page
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
          currentPage === 1 
            ? 'bg-navy text-white border-navy' 
            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
        }`}
      >
        1
      </button>
    );

    if (currentPage > windowSize + 2) {
      pages.push(<span key="start-dots" className="px-2 text-slate-400">...</span>);
    }

    for (let i = Math.max(2, currentPage - windowSize); i <= Math.min(totalPages - 1, currentPage + windowSize); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
            currentPage === i 
              ? 'bg-navy text-white border-navy' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - windowSize - 1) {
      pages.push(<span key="end-dots" className="px-2 text-slate-400">...</span>);
    }

    if (totalPages > 1) {
      // Last Page Button - Conditionally Enabled
      pages.push(
        <button
          key={totalPages}
          onClick={() => isNearEnd && onPageChange(totalPages)}
          disabled={!isNearEnd}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
            currentPage === totalPages 
              ? 'bg-navy text-white border-navy' 
              : !isNearEnd 
                ? 'border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title={isNearEnd ? `Go to last page (${totalPages})` : "Navigate closer to the end to enable"}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center pt-8">
      <nav className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </div>
  );
};
