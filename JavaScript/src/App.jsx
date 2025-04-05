import { useState } from 'react'
import './App.css'
import CardDashboard from './components/CardDashboard'

const initialTodos = [
  {
    id: 1,
    title: 'Implement user authentication',
    priority: 'High',
    status: 'In Progress',
    assignee: 'John Doe'
  },
  {
    id: 2,
    title: 'Fix responsive design issues',
    priority: 'Medium',
    status: 'To Do',
    assignee: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Add unit tests',
    priority: 'Low',
    status: 'Completed',
    assignee: 'Mike Johnson'
  },
  {
    id: 4,
    title: 'Update documentation',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Sarah Wilson'
  },
  {
    id: 5,
    title: 'Optimize database queries',
    priority: 'High',
    status: 'To Do',
    assignee: 'Alex Brown'
  }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="app">
      <CardDashboard todos={todos} onTodosChange={setTodos} />
    </div>
  )
}

export default App
