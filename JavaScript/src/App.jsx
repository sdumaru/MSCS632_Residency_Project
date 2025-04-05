import React, { useState, useEffect } from 'react'
import './App.css'
import CardDashboard from './components/CardDashboard'
import UserList from './components/UserList'
import { subscribeToTodos, subscribeToUsers, addUser } from './firebase/services'

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribeTodos = subscribeToTodos(setTodos);
    const unsubscribeUsers = subscribeToUsers(setUsers);

    return () => {
      unsubscribeTodos();
      unsubscribeUsers();
    };
  }, []);

  const handleAddUser = async (userName) => {
    if (!users.includes(userName)) {
      await addUser(userName);
    }
  };

  return (
    <div className="app">
      <h1>Todo Dashboard</h1>
      <div className="dashboard-container">
        <CardDashboard 
          todos={todos} 
          onTodosChange={setTodos}
          assigneeOptions={users}
        />
        <UserList 
          users={users}
          onAddUser={handleAddUser}
        />
      </div>
    </div>
  )
}

export default App
