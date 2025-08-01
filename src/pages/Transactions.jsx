import React, { useEffect, useState, useRef } from 'react';
import '../css/Transactions.css';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';
import EditModal from '../components/EditModal';
import ViewModal from '../components/ViewModal';
import { use } from 'react';
import CommonModal from '../components/CommonModal';
import Button from '../components/Button';
import { toast } from 'react-toastify';

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
  useEffect(() => {
  const allSelected = selectedRows.length === displayUserList.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  if (selectAllRef.current) {
    selectAllRef.current.checked = allSelected;
    selectAllRef.current.indeterminate = someSelected;
  }
}, [selectedRows, displayUserList.length]);

 const columns = [
  { header: 'ID', accessor: 'id', sortable: true },
  { header: 'User ID', accessor: 'userId', sortable: true },
  { header: 'Total', accessor: 'total', sortable: true, },
  { header: 'Discounted Total', accessor: 'discountedTotal', sortable: true },
  {
    header: 'No. of Products',
    accessor: 'totalProducts',
    sortable: true,
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
    sortable: true,
    render: (row) => {
      return (
        <span
          style={{
            color: row.totalQuantity % 2 === 0 ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {row.totalQuantity}
        </span>
      );
    }
  },
  // {
  //   header:'Quantity',
  //   accessor:'quantity',
  //   sortable:'true'
  // },
  {
    header:'Action',
    accessor:'action',
      render: (row) => (
        <button className='edit-icon'
         onClick={() =>{
          setSelectedUser(row);
          setShowViewModal(true);
         }}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      )
  },
  
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
           onClose={() => {setShowViewModal(false)}}
           title='Transaction Details'
           data={selectedUser}
          //  exculudeFields={['', 'created_at']}
          footerShow ={true}
        />
     
    </div>
  );
};

export default Transactions;
