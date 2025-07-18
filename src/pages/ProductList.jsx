import React, { useState, useEffect } from 'react';
import CommonTable from '../components/CommonTable';
import Card from '../components/Card';
import InputField from '../components/InputField';

const ProductList = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(12); // Default per-page count

  // const itemsPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsLoading(false);
      })
      
      .catch((error) => console.error('API fetch error:', error));
  }, []);

  // Search 
  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort 
  const sortedList = [...filteredList].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'string') {
      return sortConfig.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Pagination
  const totalPages = Math.ceil(sortedList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedList = sortedList.slice(startIndex, startIndex + pageSize);



  // Sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // const getSortArrow = (key) => {
  //   if (sortConfig.key !== key) return '';
  //   return sortConfig.direction === 'asc' ? '↑' : '↓';
  // };


  // // Page change
  // const goToPage = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

   

  return (
    <>
      <h5 className="page-title">Products</h5>

     

      <Card title='Products'>
        <CommonTable
          data={paginatedList}
          columns={[
            {
              header: 'Title',
              accessor: 'title',
              sortable: true,
              render: (row) => row.title.length > 30 ? row.title.slice(0, 30) + '...' : row.title
            },
            {
              header: 'Price',
              accessor: 'price',
              sortable: true,
              render: (row) => `$${row.price}`
            },
            {
              header: 'Category',
              accessor: 'category',
              sortable: true,
            },
            {
              header: 'Description',
              accessor: 'description',
              render: (row) => row.description.length > 30 ? row.description.slice(0, 30) + '...' : row.description
            }
          ]}
          isLoading={isLoading}
          sortConfig={sortConfig}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          searchQuery={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1); // Reset on search
          }}

          pageSize={pageSize}
          onPageSizeChange={(val) => {
            setPageSize(val);
            setCurrentPage(1);
          }}
        />

      </Card>
     
   



    </>
  );
};

export default ProductList;
