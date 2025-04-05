import React, { useState, useEffect } from 'react'
import './App.css'
import CardDashboard from './components/CardDashboard'
import UserList from './components/UserList'
import { subscribeToTodos, subscribeToUsers, addUser } from './firebase/services'

const priorities = ['High', 'Medium', 'Low'];

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribeTodos = subscribeToTodos((firestoreTodos) => {
      // Sort todos by priority within each status
      const sortedTodos = firestoreTodos.sort((a, b) => {
        // First sort by status to maintain column order
        const statusOrder = ['To Do', 'In Progress', 'Completed'];
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        
        if (statusA !== statusB) {
          return statusA - statusB;
        }
        
        // Then sort by priority within each status
        const priorityA = priorities.indexOf(a.priority);
        const priorityB = priorities.indexOf(b.priority);
        return priorityA - priorityB;
      });
      
      setTodos(sortedTodos);
    });
    
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
