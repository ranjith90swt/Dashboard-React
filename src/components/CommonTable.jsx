import React from 'react'

const CommonTable = ({
    columns = [],
    data = [],
    isLoading = false,
    sortConfig,
    onSort,
    currentPage,
    totalPages,
    onPageChange,
    searchQuery = '',
    onSearchChange,
    pageSize = 10,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 25, 50]
    }) => {

    const getSortArrow = (key) => {
        if (!sortConfig || sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

  return (
       
    <> 
    {/* Search Input */}
    <div className="mb-3 d-flex justify-content-between">

        <div className="d-flex align-items-center">
            <label className="me-2 mb-0">Rows per page:</label>
            <select
                className="form-select form-select-sm w-auto"
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
            >
                {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>

        <input
            type="text"
            className="form-control w-25"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
        />


    </div>

    <div className="table-responsive">
        <table className="table">
            <thead className="table-dark">
                <tr>
                    {columns.map((col, idx) => (
                    <th
                        key={idx}
                        onClick={() => col.sortable && onSort?.(col.accessor)}
                        style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                    >
                        {col.header} {col.sortable && getSortArrow(col.accessor)}
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                    <td colSpan={columns.length} className="text-center">Loading...</td>
                    </tr>
                ) : data.length === 0 ? (
                    <tr>
                    <td colSpan={columns.length} className="text-center">No data found.</td>
                    </tr>
                ) : (
                    data.map((item, rowIdx) => (
                    <tr key={rowIdx}>
                        {columns.map((col, colIdx) => (
                        <td key={colIdx}>
                            {col.render ? col.render(item) : item[col.accessor]}
                        </td>
                        ))}
                    </tr>
                    ))
                )}
            </tbody>
        </table>
        {/* Pagination */}
        {totalPages > 1 && (
            <div className="d-flex justify-content-end align-items-center mt-3">
                <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                    <button
                        key={page}
                        className={`btn btn-sm me-1 ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                    );
                })}

                <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        )}
    </div>
    </>
  )
}

export default CommonTable