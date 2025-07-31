import React, { useEffect, useState } from 'react';
import '../css/Transactions.css';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';
import EditModal from '../components/EditModal';
import ViewModal from '../components/ViewModal';

const Transactions = ({
  limit = null,
  showSearch = true,
  showPagination = true,
  showPageSize = true,
  title = 'Transactions',
  showItemCount = true,
  showPageTitle = true,
  showCardTitle = false,
}) => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedCarts = sessionStorage.getItem('cartsData');

    if (savedCarts) {
      setCarts(JSON.parse(savedCarts));
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/carts')
          .then((res) => res.json())
          .then((data) => {
            setCarts(data.carts);
            sessionStorage.setItem('cartsData', JSON.stringify(data.carts));
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('API error:', error);
            setIsLoading(false);
          });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const filteredList = carts.filter(item =>
    item.userId.toString().includes(searchTerm.toLowerCase())
  );

  const displayUserList = limit ? filteredList.slice(0, 10) : filteredList;

  const columns = [
    { header: 'ID', accessor: 'id', sortable: !isLoading },
    { header: 'User ID', accessor: 'userId', sortable: !isLoading },
    { header: 'Total', accessor: 'total', sortable: !isLoading },
    { header: 'Discounted Total', accessor: 'discountedTotal', sortable: !isLoading },
    {
      header: 'No. of Products',
      accessor: 'totalProducts',
      sortable: !isLoading,
      render: (row) => (
        <span
          style={{
            color: row.totalProducts % 2 === 0 ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {row.totalProducts}
        </span>
      ),
    },
    {
      header: 'Total Quantity',
      accessor: 'quantity',
      sortable: !isLoading,
      render: (row) => (
        <span
          style={{
            color: row.totalQuantity % 2 === 0 ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {row.totalQuantity}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (row) => (
        <button
          className='action-icon edit-icon'
          onClick={() => {
            setSelectedUser(row);
            setShowViewModal(true);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      )
    }
  ];

  return (
    <div>
      {showPageTitle && (
        <h5 className='page-title'>{title}</h5>
      )}

      <Card title={showCardTitle ? title : undefined}>
        <CommonTable
          data={displayUserList}
          columns={columns}
          isLoading={isLoading}
          searchQuery={searchTerm}
          onSearchChange={val => setSearchTerm(val)}
          enableSearch={showSearch}
          enablePagination={showPagination}
          enablePageSize={showPageSize}
          enableItemCount={showItemCount}
          placeholder='Search by User ID...'

          currentPage={currentPage || 1}
          onPageChange={setCurrentPage}
          pageSize={pageSize || 10}
          onPageSizeChange={setPageSize}
        />
      </Card>

      <EditModal
        isOpen={showViewModal}
        onClose={() => { setShowViewModal(false) }}
        title='Transaction Details'
        data={selectedUser}
        footerShow={true}
      />
    </div>
  );
};

export default Transactions;
