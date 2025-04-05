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
import { SortableCard } from './SortableCard';
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
    useSensor(PointerSensor),
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTodo = todos.find(todo => todo.id === active.id);
    const overTodo = todos.find(todo => todo.id === over.id);

    if (!activeTodo || !overTodo) return;

    // If dropped in a different column
    if (activeTodo.status !== overTodo.status) {
      setTodos(todos.map(todo => {
        if (todo.id === active.id) {
          return { ...todo, status: overTodo.status };
        }
        return todo;
      }));
    } else {
      // If dropped in the same column, reorder
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="dashboard">
      <h2>Todo Dashboard</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="columns-container">
          {statusColumns.map((column) => (
            <div key={column.status} className="status-column">
              <h3 className="column-title">{column.title}</h3>
              <SortableContext
                items={todosByStatus[column.status]?.map(todo => todo.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="cards-container">
                  {(todosByStatus[column.status] || []).map((todo) => (
                    <SortableCard key={todo.id} todo={todo} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default CardDashboard; 