import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import CommonTable from '../components/CommonTable';

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
  }
) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  

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
  
  const displayUserList = limit ? filteredList.slice(0, limit) : filteredList;


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
  ];

  return (
    <div>
      {
        showPageTitle && (
          <h5 className='page-title'>{title}</h5>
        )
      }
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
      </Card>
    </div>
  );
};

export default UserList;
