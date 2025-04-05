import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableCard } from './SortableCard';
import NewTodoInput from './NewTodoInput';
import './CardDashboard.css';

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

const CardDashboard = () => {
  const [todos, setTodos] = useState(initialTodos);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const todosByStatus = todos.reduce((acc, todo) => {
    if (!acc[todo.status]) {
      acc[todo.status] = [];
    }
    acc[todo.status].push(todo);
    return acc;
  }, {});

  const statusColumns = [
    { title: 'To Do', status: 'To Do' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Completed', status: 'Completed' }
  ];

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusColumns.findIndex(col => col.status === currentStatus);
    return statusColumns[currentIndex + 1]?.status || currentStatus;
  };

  const getPrevStatus = (currentStatus) => {
    const currentIndex = statusColumns.findIndex(col => col.status === currentStatus);
    return statusColumns[currentIndex - 1]?.status || currentStatus;
  };

  const handleMoveLeft = (todo) => {
    const prevStatus = getPrevStatus(todo.status);
    const updatedTodos = todos.filter(t => t.id !== todo.id);
    setTodos([{ ...todo, status: prevStatus }, ...updatedTodos]);
  };

  const handleMoveRight = (todo) => {
    const nextStatus = getNextStatus(todo.status);
    const updatedTodos = todos.filter(t => t.id !== todo.id);
    setTodos([{ ...todo, status: nextStatus }, ...updatedTodos]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTodo = todos.find(todo => todo.id === active.id);
    const overTodo = todos.find(todo => todo.id === over.id);

    if (!activeTodo || !overTodo || activeTodo.status !== overTodo.status) return;

    // Get all todos in the same column
    const columnTodos = todos.filter(todo => todo.status === activeTodo.status);
    
    // Find the old and new indices
    const oldIndex = columnTodos.findIndex(todo => todo.id === active.id);
    const newIndex = columnTodos.findIndex(todo => todo.id === over.id);

    if (oldIndex === newIndex) return;

    // Create a new array with the moved item
    const newColumnTodos = arrayMove(columnTodos, oldIndex, newIndex);
    
    // Create a new todos array with the updated column
    const newTodos = todos.filter(todo => todo.status !== activeTodo.status);
    setTodos([...newTodos, ...newColumnTodos]);
  };

  const handleAddTodo = (newTodo) => {
    // Get all todos except the ones in To Do
    const otherTodos = todos.filter(todo => todo.status !== 'To Do');
    // Get all To Do todos
    const todoTodos = todos.filter(todo => todo.status === 'To Do');
    // Add the new todo to the end of To Do todos
    setTodos([...otherTodos, ...todoTodos, newTodo]);
  };

  const handlePriorityChange = (todo, newPriority) => {
    setTodos(todos.map(t => 
      t.id === todo.id ? { ...t, priority: newPriority } : t
    ));
  };

  return (
    <div className="dashboard">
      <h2>Todo Dashboard</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="columns-container">
          {statusColumns.map((column) => (
            <div key={column.status} className="status-column">
              <h3 className="column-title">{column.title}</h3>
              <SortableContext
                items={(todosByStatus[column.status] || []).map(todo => todo.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="cards-container">
                  {(todosByStatus[column.status] || []).map((todo) => (
                    <SortableCard 
                      key={todo.id} 
                      todo={todo} 
                      onMoveLeft={handleMoveLeft}
                      onMoveRight={handleMoveRight}
                      onPriorityChange={handlePriorityChange}
                    />
                  ))}
                </div>
              </SortableContext>
              {column.status === 'To Do' && (
                <NewTodoInput onAddTodo={handleAddTodo} />
              )}
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default CardDashboard; 