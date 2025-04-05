import React from 'react';
import Card from './Card';
import NewTodoInput from './NewTodoInput';
import './CardDashboard.css';

const CardDashboard = ({ todos, onTodosChange, assigneeOptions }) => {
  const statuses = ['To Do', 'In Progress', 'Completed'];
  const priorities = ['High', 'Medium', 'Low'];

  const handleAddTodo = (newTodo) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos, newTodo];
      return sortTodosByPriority(newTodos);
    });
  };

  const handleHorizontalMove = (todo, direction) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      const currentStatusIndex = statuses.indexOf(todo.status);
      const targetStatusIndex = currentStatusIndex + (direction === 'left' ? -1 : 1);
      
      if (targetStatusIndex < 0 || targetStatusIndex >= statuses.length) return prevTodos;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        status: statuses[targetStatusIndex]
      };
      
      return sortTodosByPriority(newTodos);
    });
  };

  const handlePriorityChange = (todo) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      const currentPriorityIndex = priorities.indexOf(todo.priority);
      const nextPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        priority: priorities[nextPriorityIndex]
      };
      
      return sortTodosByPriority(newTodos);
    });
  };

  const handleAssigneeChange = (todo, newAssignee) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        assignee: newAssignee
      };
      
      return newTodos;
    });
  };

  const sortTodosByPriority = (todos) => {
    return todos.sort((a, b) => {
      const priorityA = priorities.indexOf(a.priority);
      const priorityB = priorities.indexOf(b.priority);
      return priorityA - priorityB;
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