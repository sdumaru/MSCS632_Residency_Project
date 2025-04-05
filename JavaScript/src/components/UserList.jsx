import React, { useState } from 'react';
import './UserList.css';

const UserList = ({ users, onAddUser }) => {
  const [newUserName, setNewUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
    }
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter user name"
          className="user-input"
        />
        <button type="submit" className="add-user-button">Add User</button>
      </form>
      <ul className="users">
        {users.map((user) => (
          <li key={user} className="user-item">
            <span className="user-name">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList; 