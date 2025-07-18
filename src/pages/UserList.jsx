import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    fetch('https://fakestoreapi.com/users')
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

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = aVal?.toString().toLowerCase() || '';
    const bStr = bVal?.toString().toLowerCase() || '';

    if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className=''>
      <h5 className='mb-3'>User List</h5>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} >
              ID {getSortArrow('id')}
            </th>
            <th onClick={() => handleSort('username')}>
              Name {getSortArrow('username')}
            </th>
            <th onClick={() => handleSort('email')} >
              Email {getSortArrow('email')}
            </th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">Loading...</td>
            </tr>
          ) : sortedUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No data found.</td>
            </tr>
          ) : (
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
