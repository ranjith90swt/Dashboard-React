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
const [confirmDelete, setConfirmDelete] = useState(false);
const [selectedRows, setSelectedRows] = useState([]);
const selectAllRef = useRef(null);
const handleRowSelect = (id, checked) => {
  setSelectedRows(prev =>
    checked ? [...prev, id] : prev.filter(rowId => rowId !== id)
  );
};

const handleSelectAll = (checked) => {
  const allIds = displayUserList.map(row => row.id);
  setSelectedRows(checked ? allIds : []);
};

const fetchTransactions = async (retryCount = 0)=>{
  try{
    setIsLoading(true)
    const res = await fetch('http://localhost:3001/transactions');
    // if(!res.ok) throw new Error('Error to fetch data');
    if (!res.ok) {
    toast.error(`HTTP error! status: ${res.status} No data found`);
  }
    const data = await res.json();
    // if(res.status ===200){
    //   toast.success('data fetched successfully')
    // }
    setIsLoading(false)
    setCarts(data);

  }
   catch (error){
    if(error.status === 404){
      toast.error('No data found');
      return;
    }
  }
// // if (res.status === 404) {
//   console.log('This will execute only when status is 404');

//   if (retryCount < 3) {
//     toast.error(`Retrying... Attempt ${retryCount + 1}`);
//     setTimeout(() => {
//       fetchTransactions(retryCount + 1);
//     }, 500); 
//   } else {
//     setIsLoading(false); // stop loader after 3 attempts
//     toast.error('Failed after 3 retries');
//   }

//   return; 
// // }

    
};

useEffect(()=>{
// setIsLoading(true)
//   fetch('http://localhost:3001/transactions')
//   .then (res=>res.json())
//   .then(data =>{
//     setCarts(data);
//     setIsLoading(false)
//   })
// .catch(err=>console.err('API fetch error',err));
fetchTransactions();

},[])


  // const filteredList = carts.filter(item =>
  //   item.userId.toString().includes(searchTerm.toLowerCase())
  // );
  const filteredList = carts
  .filter(item => item.status !== 'DELETED') // <--- Exclude deleted
  .filter(item => item.userId.toString().includes(searchTerm.toLowerCase()));


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
 {
  header: (
    <input
      type="checkbox"
      ref={selectAllRef}
      onChange={(e) => handleSelectAll(e.target.checked)}
    />
  ),
  accessor: 'select',
  render: (row) => (
    <input
      type="checkbox"
      checked={selectedRows.includes(row.id)}
      onChange={(e) => handleRowSelect(row.id, e.target.checked)}
    />
  )
},
  { header: 'ID', accessor: 'id', sortable: true },
  {
header:'Name',accessor:'name'
  },
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
  {
    header:'Status',
    accessor: 'status',
    sortable :'true'
  },
  {
    header:'Action',
    accessor:'action',
      render: (row) => (<>

        <button className='action-icon me-2'
         onClick={() =>{
          setSelectedUser(row);
          setShowViewModal(true);
         }}
        >
         <i className="bi bi-pencil-square"></i>
        </button>
        
        <button className='action-icon delete-icon ' onClick={() => {
        setSelectedUser(row);
        setConfirmDelete(true)
        }}>
        <i className="bi bi-trash"></i>
        </button>
        </>
      )
  },
{
  header: 'Delete',
  accessor: 'delete',
  render: (row, index) => {
    if (selectedRows.length > 1 && index === 0) {
      return (
        <button className='btn btn-danger' onClick={handleBulkDelete}>
          Delete Selected ({selectedRows.length})
        </button>
      );
    }
    return null;
  }
}
];


// funuction for bulk delete
const handleBulkDelete = async () => {
  console.log('Selected IDs to delete:', selectedRows);

  try {
    await Promise.all(
      selectedRows.map(id =>
        fetch(`http://localhost:3001/transactions/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'DELETED' }),
        })
      )
    );

      setCarts(prev => prev.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  } catch (error) {
  }
};


{selectedRows.length > 1 && (
  <>
      {console.log('Rendering Delete Button')}

  <div className="text-end mb-2">
    <button className="btn btn-danger" onClick={handleBulkDelete}>
      Delete Selected ({selectedRows.length})
    </button>
  </div>
  </>
)}



const handleDeleteUser = async () => {
  if (!selectedUser) return;

  try {
    const response = await fetch(`http://localhost:3001/transactions/${selectedUser.id}`, {
      method: 'PATCH', // <- Use PATCH to update only part of the resource
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'DELETED' }),
    });
    if(response.status ===200){
      toast.success(`User: ${selectedUser.name} deleted successfully.`)
    }

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    // Update local state (carts) to reflect change
    setCarts(prev => prev.filter(user => user.id !== selectedUser.id));
    setConfirmDelete(false);
    setSelectedUser(null);
  } catch (error) {
    console.log(`Delete Error: ${error}`);
  }
};




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
                     <CommonModal
          id='confirmDeleteModal'
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
           title='Delete User'

           footer={
              <>
                <Button 
                  onClick={() => setConfirmDelete(false)}

                  variant='secondary'
                  size='md'
                  label='Cancel'
                />
                <Button 
                  onClick={handleDeleteUser}
                  variant='danger'
                  size='md'
                  label='Delete'
                >

                </Button>
              </>
           }
         >    
            <p>Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</p>

        </CommonModal>
     
    </div>
  );
};

export default Transactions;
