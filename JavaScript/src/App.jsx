import React, { useState } from 'react'
import './App.css'
import CardDashboard from './components/CardDashboard'
import UserList from './components/UserList'

const initialUsers = ['John Doe', 'Jane Smith', 'Bob Johnson']

const initialTodos = [
  {
    id: 1,
    title: 'Complete project documentation',
    priority: 'High',
    status: 'To Do',
    assignee: 'John Doe'
  },
  {
    id: 2,
    title: 'Review pull requests',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Update dependencies',
    priority: 'Low',
    status: 'Completed',
    assignee: 'Bob Johnson'
  },
  {
    id: 4,
    title: 'Fix UI bugs',
    priority: 'High',
    status: 'To Do',
    assignee: 'John Doe'
  },
  {
    id: 5,
    title: 'Write unit tests',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Jane Smith'
  }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (userName) => {
    if (!users.includes(userName)) {
      setUsers([...users, userName]);
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
