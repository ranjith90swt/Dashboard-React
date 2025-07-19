import React, { useState, useEffect } from 'react';
import CommonTable from '../components/CommonTable';
import Card from '../components/Card';

const ProductList = (
  {
    limit = null,
  showSearch = true,
  showPagination = true,
  showPageSize = true,
    title = 'Product List',
    showItemCount = true,
    showPageTitle= true,
    showCardTitle= false, 
  }
) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setList(data);
        setIsLoading(false);
      })
      .catch(error => console.error('API fetch error:', error));
  }, []);

  // Filter & Sort data (pass full sorted & filtered data to CommonTable)
  const filteredList = list.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedList = limit ? filteredList.slice(0, limit) : filteredList;

  

  return (
    <>
      {
        showPageTitle && (
          <h5 className='page-title'>{title}</h5>
        )
      }
      <Card title={showCardTitle ? title : undefined}>
        <CommonTable
          data={limitedList} // full filtered + sorted data here
          columns={[
            {
              header: 'Title',
              accessor: 'title',
              sortable: true,
              render: row => (row.title.length > 30 ? row.title.slice(0, 30) + '...' : row.title),
            },
            {
              header: 'Price',
              accessor: 'price',
              sortable: true,
              render: row => `$${row.price}`,
            },
            {
              header: 'Category',
              accessor: 'category',
              sortable: true,
            },
            {
              header: 'Description',
              accessor: 'description',
              render: row =>
                row.description.length > 30 ? row.description.slice(0, 30) + '...' : row.description,
            },
          ]}
          isLoading={isLoading}
          searchQuery={searchTerm}
          onSearchChange={val => setSearchTerm(val)}
          enableSearch={showSearch}
          enablePageSize={showPagination}
          enablePagination={showPageSize}
          enableItemCount = {showItemCount}

          placeholder="Search by title.."
        />
      </Card>
    </>
  );
};

export default ProductList;
