import React from 'react';
import { useGetUsersQuery } from '../api/apiSlice';

const UserList = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  return (
    <div>
      <h2>User List (RTK Query)</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading users.</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
