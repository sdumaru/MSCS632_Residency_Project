import React from 'react';
import Card from './Card';
import NewTodoInput from './NewTodoInput';
import './CardDashboard.css';
import { addTodo, updateTodo } from '../firebase/services';

const CardDashboard = ({ todos, onTodosChange, assigneeOptions }) => {
  const statuses = ['To Do', 'In Progress', 'Completed'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleAddTodo = async (newTodo) => {
    await addTodo(newTodo);
  };

  const handleHorizontalMove = async (todo, direction) => {
    const currentStatusIndex = statuses.indexOf(todo.status);
    const targetStatusIndex = currentStatusIndex + (direction === 'left' ? -1 : 1);
    
    if (targetStatusIndex < 0 || targetStatusIndex >= statuses.length) return;
    
    await updateTodo(todo.id, {
      status: statuses[targetStatusIndex]
    });
  };

  const handlePriorityChange = async (todo) => {
    const currentPriorityIndex = priorities.indexOf(todo.priority);
    const nextPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
    
    await updateTodo(todo.id, {
      priority: priorities[nextPriorityIndex]
    });
  };

  const handleAssigneeChange = async (todo, newAssignee) => {
    await updateTodo(todo.id, {
      assignee: newAssignee
    });
  };

  return (
    <div className="dashboard">
      <div className="columns-container">
        {statuses.map((status) => {
          const columnTodos = todos.filter(todo => todo.status === status);
          return (
            <div key={status} className="column">
              <h2 className="column-title">{status}</h2>
              <div className="cards-container">
                {columnTodos.map((todo) => (
                  <Card
                    key={todo.id}
                    todo={todo}
                    onMoveLeft={() => handleHorizontalMove(todo, 'left')}
                    onMoveRight={() => handleHorizontalMove(todo, 'right')}
                    onPriorityChange={handlePriorityChange}
                    onAssigneeChange={handleAssigneeChange}
                    assigneeOptions={assigneeOptions}
                  />
                ))}
                {status === 'To Do' && (
                  <div className="new-todo-card">
                    <NewTodoInput onAddTodo={handleAddTodo} assigneeOptions={assigneeOptions} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDashboard; 