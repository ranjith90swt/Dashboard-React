import React, { useEffect, useMemo } from 'react';
import InputField from './InputField';
import '../css/CommonTable.css';
const CommonTable = ({
  columns = [],
  data = [],
  isLoading = false,
  sortConfig: controlledSortConfig,
  onSort,
  searchQuery = '',
  onSearchChange,
  pageSizeOptions = [5, 10, 25, 50, 100],
  placeholder = '',

  // Controlled pagination props
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,

  // Feature toggles
  enableSearch = true,
  enablePageSize = true,
  enablePagination = true,
  enableItemCount = true,
}) => {
  const [sortConfig, setSortConfig] = React.useState(controlledSortConfig || null);

  useEffect(() => {
    if (controlledSortConfig) {
      setSortConfig(controlledSortConfig);
    }
  }, [controlledSortConfig]);

  // Fallback values
  const safePageSize = pageSize ?? 10;
  const safeCurrentPage = currentPage ?? 1;

  const handleSort = (key) => {
    if (isLoading) return; // disable sort interaction while loading

    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    if (onSort) onSort(newSortConfig);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig || !sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / safePageSize) || 1;

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * safePageSize;
    return sortedData.slice(startIndex, startIndex + safePageSize);
  }, [sortedData, safeCurrentPage, safePageSize]);

  const getSortArrow = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const paginationButtons = useMemo(() => {
    return [...Array(totalPages)].map((_, i) => {
      const page = i + 1;
      return (
        <li
          key={page}
          className={`page-item ${page === safeCurrentPage ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      );
    });
  }, [totalPages, safeCurrentPage, onPageChange]);


  return (
    <>
      {(enableSearch || enablePageSize) && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          {enableSearch && (
            <InputField
              type="text"
              className="w-25"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          )}

          {enablePageSize && (
            <div className="d-flex align-items-center">
              <label className="me-2 mb-0">Rows per page:</label>
              <select
                className="form-select form-select-sm w-auto"
                value={safePageSize}
                onChange={(e) => {
                  onPageSizeChange(parseInt(e.target.value));
                  onPageChange(1); // reset to first page
                }}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() =>
                    col.sortable && !isLoading && handleSort(col.accessor)
                  }
                  style={{
                    cursor: col.sortable && !isLoading ? 'pointer' : 'not-allowed',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                  
                >
                  {col.header} {col.sortable && getSortArrow(col.accessor)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIdx) => (
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

        <div className="d-flex justify-content-between align-items-center mt-3">
          {enableItemCount && (
            
            <div className="small-text">
              Showing {(safePageSize * (safeCurrentPage - 1)) + 1} 
              <span> - </span>
              {Math.min(safePageSize * safeCurrentPage, sortedData.length)} of {sortedData.length} items
            </div>

          )}

          {enablePagination && totalPages > 1 && (
            <nav className="d-flex justify-content-end mt-3">
              <ul className="pagination mb-0">
                <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
                    disabled={safeCurrentPage === 1}
                  >
                    Prev
                  </button>
                </li>

                {paginationButtons}

                <li
                  className={`page-item ${
                    safeCurrentPage === totalPages ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      onPageChange(Math.min(totalPages, safeCurrentPage + 1))
                    }
                    disabled={safeCurrentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonTable;
