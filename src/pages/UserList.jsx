import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';
import ViewModal from '../components/ViewModal';
import CommonModal from '../components/CommonModal';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);

  

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
          className={`btn-sm ${
            row.status === 'active' ? 'btn-active' : 'btn-inactive'
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
        <>
        <button className='action-icon edit-icon me-2'
         onClick={() =>{
          setSelectedUser(row);
          setShowViewModal(true);
         }}
        >
          <i className="bi bi-eye"></i>
        </button>

        <button className='action-icon edit-icon me-2' onClick={() => {
        setSelectedUser(row);
        setEditModal(true);           
        setNewUser({                  
          name: row.name,
          email: row.email,
          role: row.role,
        });
        setShowAddModal(true);
      }}>
        <i className="bi bi-pencil-square"></i>
      </button>

        <button className='action-icon delete-icon ' onClick={() => {
        setSelectedUser(row);
        setConfirmDelete(true) // show confirmation modal
        }}>
        <i className="bi bi-trash"></i>
        </button>
      </>
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

// save & update user 

const handleSaveUser = async (e) => {
  e.preventDefault();

  if (!newUser.name || !newUser.email || !newUser.role) {
    setShowErrMsg('All fields are Required');
    return;
  } else {
    setShowErrMsg('');
  }

  if(editModal){
    // EDIT user
    try {
      const response = await fetch(`http://localhost:3001/users/${selectedUser.id}`, {
        method: 'PUT', // or PATCH depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedUser, ...newUser }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      setUsers(prevUsers =>
        prevUsers.map(user => user.id === selectedUser.id ? updatedUser : user)
      );

      setShowAddModal(false);
      setNewUser({ name: '', email: '', role: '' });
      setSelectedUser(null);
      setEditModal(false);
    } catch (error) {
      setShowErrMsg('Error updating user: ' + error.message);
    }
  }

  else{

    //add user 
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


  }

 // delete user

  const handleDeleteUser = async()=>{

    if(!selectedUser) return;

    try {

      const response = await fetch(`http://localhost:3001/users/${selectedUser.id}`, {
        method: 'DELETE',
      });

      if(!response.ok){
        throw new Error('Failed to delete user');
      }

      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      setConfirmDelete(false);
      setSelectedUser(null);
      
    } catch (error) {
        console.log(`Delete Error ${error}`)
    }

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
          // onClose={handleCloseModal}
          onClose={() => {
            setShowAddModal(false);
            setEditModal(false);       
            setSelectedUser(null);
            setNewUser({ name: '', email: '', role: '' });
          }}
          title={editModal ? "Edit User" : "Add User"}
          footer={
            <>

              <Button
                onClick={handleCloseModal}
                label='Cancel'
                variant='secondary'
                size='md'
              >

              </Button>

              <Button onClick={handleSaveUser}
                type='button'
                variant='primary'
                size='md'
                label={editModal ? "Update" : "Save"}


              />
             
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
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'analyst', label: 'Analyst' },
                { value: 'business', label: 'Business' }

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

        {/* delete user */}
        
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

      </Card>
    </>
  );
};

export default UserList;
