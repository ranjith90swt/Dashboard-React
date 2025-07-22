import React, { useState, useEffect, useMemo } from 'react';
import InputField from './InputField';

const CommonTable = ({
  columns = [],
  data = [],
  isLoading = false,
  sortConfig: controlledSortConfig, // Optional controlled sortConfig from parent
  onSort, // Optional callback when sort changes
  searchQuery = '',
  onSearchChange,
  pageSizeOptions = [5, 10, 25, 50, 100],
  placeholder = '',
  // Feature toggles
  enableSearch = true,
  enablePageSize = true,
  enablePagination = true,
  enableItemCount = true,
}) => {
  // Internal state for sorting (if not controlled by parent)
  const [sortConfig, setSortConfig] = useState(controlledSortConfig || null);

  // Internal states for pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync with controlled sortConfig (if provided)
  useEffect(() => {
    if (controlledSortConfig) {
      setSortConfig(controlledSortConfig);
    }
  }, [controlledSortConfig]);

  // Handle sorting when header clicked
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    if (onSort) onSort(newSortConfig);
  };

  // Sort the data internally based on sortConfig
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
      // Fallback to string comparison
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortConfig]);

  // Calculate pagination on sorted data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Reset to first page if data, pageSize or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, pageSize, sortConfig]);

  const getSortArrow = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <>
      {/* Search & Page Size Controls */}
      {(enableSearch || enablePageSize) && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          {enableSearch && (
            <InputField 
              type='text' 
              className='w-25'  
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
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
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

      {/* Table */}
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && handleSort(col.accessor)}
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
            {
              enableItemCount && (
                <div className="small-text">
                  Showing {paginatedData.length} of {sortedData.length} items
                </div>
              )
            }
            

            {/* Pagination */}
            {enablePagination && totalPages > 1 && (
            <div className="d-flex justify-content-end align-items-center mt-3">
                <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                >
                Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                    <button
                    key={page}
                    className={`btn btn-sm me-1 ${
                        page === currentPage ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => setCurrentPage(page)}
                    >
                    {page}
                    </button>
                );
                })}

                <button
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                >
                Next
                </button>
            </div>
            )}
        </div>

      </div>
    </>
  );
};

export default CommonTable;
