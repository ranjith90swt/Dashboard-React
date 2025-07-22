import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';
import ViewModal from '../components/ViewModal';
import CommonModal from '../components/CommonModal';
import InputField from '../components/InputField';

const UserList = (
  {
    limit = null,
    showSearch = true,
    showPagination = true,
    showPageSize =true,
    title = 'User List',
    showItemCount = true,
    showPageTitle= true,
    showCardTitle= false, 
    showAddButton = true,
  }
) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false)
  

  useEffect(() => {
    setIsLoading(true);
    fetch('../data/user.json')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API error:', error);
        setIsLoading(false);
      });
  }, []);

  
  const filteredList = users.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const displayUserList = limit ? filteredList.slice(0, limit) : filteredList



  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Email', accessor: 'email', sortable: true },
    { header: 'Role', accessor: 'role', sortable:true },
    { header: 'Status', accessor: 'status', sortable:true, render: (row) => (
        <span
          className={`btn btn-sm ${
            row.status === 'active' ? 'btn-success' : 'btn-danger'
          }`}
          disabled
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )

      
    },
    {
      header:"Action",
      accessor:'action',
      render: (row) => (
        <button className='edit-icon'
         onClick={() =>{
          setSelectedUser(row);
          setShowViewModal(true);
         }}
        >
          <i class="bi bi-eye"></i>
        </button>
      )
    }
  ];

  const handleAddModal = () => {
    setShowAddModal(true);
  }

  const handleCloseModal = () => {
    setShowAddModal(false);
  }


  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
           {
              showPageTitle && (
                <h5 className='page-title'>{title}</h5>
              )
            }

            {
            showAddButton && (
              <button className='btn btn-primary mb-2' onClick={handleAddModal}>Add New </button>
            )
           }
        {/* <div className="col-lg-6">
            
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
           
        </div> */}
      </div>

     
      <Card 
      
        title={showCardTitle ? title : undefined}
      // title={title}
      
      
      >
        <CommonTable
          data={displayUserList}
          columns={columns}
          isLoading={isLoading}

          searchQuery={searchTerm}
          onSearchChange={val => setSearchTerm(val)}

          enableSearch={showSearch}       
          enablePagination={showPagination}  
          enablePageSize={showPageSize} 
          enableItemCount = {showItemCount}
          placeholder='Search by name..'
        />

        <ViewModal 
           isOpen={showViewModal}
           onClose={() => {setShowViewModal(false)}}
           title='User Details'
           data={selectedUser}
           exculudeFields={['password', 'created_at']}
          footerShow ={false}
        />

        <CommonModal 
          id='addUserModal'
          isOpen={showAddModal}
          onClose={handleCloseModal}
          title="Add New User"
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                
              >
                Save
              </button>
            </>
          }
        >


          <form>

            <InputField text='text' className='mb-3' placeholder='Enter user name'/>
            
            <InputField text='text' className='mb-3' placeholder='Enter email'/>

          </form>


        </CommonModal>
      </Card>
    </>
  );
};

export default UserList;
