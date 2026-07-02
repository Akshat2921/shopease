const Pagination = ({ page, pageSize, totalCount, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-gray-300 disabled:opacity-30 hover:bg-white/5"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
            p === page ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-white/5"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-gray-300 disabled:opacity-30 hover:bg-white/5"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
