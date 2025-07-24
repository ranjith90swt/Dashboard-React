import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';
import ViewModal from '../components/ViewModal';
import CommonModal from '../components/CommonModal';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email:'',
    role:''
  })

  const [showErrMsg, setShowErrMsg] = useState('');
  

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/users')
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
          <i className="bi bi-eye"></i>
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


  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewUser((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleAddUser = async (e) => {
  e.preventDefault();

  if (!newUser.name || !newUser.email || !newUser.role) {
    setShowErrMsg('All fields are Required');
    return;
  } else {
    setShowErrMsg('');
  }

  const userToAdd = {
    ...newUser,
    status: 'active',
  };

  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToAdd),
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    const savedUser = await response.json();

    // Update local users state with the new user from server (including id)
    setUsers(prevUsers => [...prevUsers, savedUser]);

    // Reset form and close modal
    setNewUser({ name: '', email: '', role: '' });
    setShowAddModal(false);
  } catch (error) {
    setShowErrMsg('Error adding user: ' + error.message);
  }
};

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

        <CommonModal 
          id='viewUserModal'
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="User Details"
          footer={null}
        >
          {selectedUser ? (
            Object.entries(selectedUser)
              .filter(([key]) => !['password', 'created_at'].includes(key)) // excluding fields
              .map(([key, value]) => (
                <div key={key} className="mb-2 d-flex justify-content-between py-1">
                  <strong className="text-capitalize w-25">{key}:</strong>
                  <div className="w-75">{String(value)}</div>
                </div>
              ))
          ) : (
            <p>No data</p>
          )}
        </CommonModal>


        <CommonModal 
          id='addUserModal'
          isOpen={showAddModal}
          onClose={handleCloseModal}
          title="Add New User"
          footer={
            <>
            
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddUser}
              >
                Save
              </button>
            </>
          }
        >


         <form>
            <InputField
              name="name"
              type="text"
              className="mb-3"
              placeholder="Enter user name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          
            
            <InputField
              name="email"
              type="text"
              className="mb-3"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleInputChange}
            />

            <SelectField
              name="role"
              // label="User Role"
              value={newUser.role}
              placeholder='Select an role'
              onChange={handleInputChange}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'User', label: 'User' },
                { value: 'Analyst', label: 'Analyst' },
                { value: 'Business', label: 'Business' }

              ]}
            />


            <p>
              {
                showErrMsg && (
                  <div className="text-danger mt-3">
                    {showErrMsg}
                  </div>
                )
              }
            </p>
          </form>



        </CommonModal>


      </Card>
    </>
  );
};

export default UserList;
