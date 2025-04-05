import React from 'react';
import Card from './Card';
import NewTodoInput from './NewTodoInput';
import './CardDashboard.css';

const CardDashboard = ({ todos, onTodosChange }) => {
  const statuses = ['To Do', 'In Progress', 'Completed'];

  const handleAddTodo = (newTodo) => {
    onTodosChange(prevTodos => [...prevTodos, newTodo]);
  };

  const handleMoveUp = (todoId, status) => {
    onTodosChange(prevTodos => {
      const columnTodos = prevTodos.filter(todo => todo.status === status);
      const todoIndex = columnTodos.findIndex(todo => todo.id === todoId);
      
      if (todoIndex <= 0) return prevTodos;
      
      const newTodos = [...prevTodos];
      const currentTodo = newTodos.find(todo => todo.id === todoId);
      const prevTodo = columnTodos[todoIndex - 1];
      
      const currentIndex = newTodos.indexOf(currentTodo);
      const prevIndex = newTodos.indexOf(prevTodo);
      
      [newTodos[currentIndex], newTodos[prevIndex]] = [newTodos[prevIndex], newTodos[currentIndex]];
      
      return newTodos;
    });
  };

  const handleMoveDown = (todoId, status) => {
    onTodosChange(prevTodos => {
      const columnTodos = prevTodos.filter(todo => todo.status === status);
      const todoIndex = columnTodos.findIndex(todo => todo.id === todoId);
      
      if (todoIndex >= columnTodos.length - 1) return prevTodos;
      
      const newTodos = [...prevTodos];
      const currentTodo = newTodos.find(todo => todo.id === todoId);
      const nextTodo = columnTodos[todoIndex + 1];
      
      const currentIndex = newTodos.indexOf(currentTodo);
      const nextIndex = newTodos.indexOf(nextTodo);
      
      [newTodos[currentIndex], newTodos[nextIndex]] = [newTodos[nextIndex], newTodos[currentIndex]];
      
      return newTodos;
    });
  };

  const handleMoveLeft = (todo) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      const currentStatusIndex = statuses.indexOf(todo.status);
      if (currentStatusIndex <= 0) return prevTodos;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        status: statuses[currentStatusIndex - 1]
      };
      
      return newTodos;
    });
  };

  const handleMoveRight = (todo) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      const currentStatusIndex = statuses.indexOf(todo.status);
      if (currentStatusIndex >= statuses.length - 1) return prevTodos;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        status: statuses[currentStatusIndex + 1]
      };
      
      return newTodos;
    });
  };

  const handlePriorityChange = (todo) => {
    onTodosChange(prevTodos => {
      const newTodos = [...prevTodos];
      const todoIndex = newTodos.findIndex(t => t.id === todo.id);
      
      if (todoIndex === -1) return prevTodos;
      
      const priorities = ['Low', 'Medium', 'High'];
      const currentPriorityIndex = priorities.indexOf(todo.priority);
      const nextPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
      
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        priority: priorities[nextPriorityIndex]
      };
      
      return newTodos;
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

  const assigneeOptions = ['John', 'Jane', 'Bob', 'Alice'];

  return (
    <div className="dashboard">
      <div className="columns-container">
        {statuses.map((status) => {
          const columnTodos = todos.filter(todo => todo.status === status);
          return (
            <div key={status} className="column">
              <h2 className="column-title">{status}</h2>
              <div className="cards-container">
                {columnTodos.map((todo, index) => (
                  <Card
                    key={todo.id}
                    todo={todo}
                    onMoveUp={() => handleMoveUp(todo.id, status)}
                    onMoveDown={() => handleMoveDown(todo.id, status)}
                    onMoveLeft={() => handleMoveLeft(todo)}
                    onMoveRight={() => handleMoveRight(todo)}
                    onPriorityChange={handlePriorityChange}
                    onAssigneeChange={handleAssigneeChange}
                    assigneeOptions={assigneeOptions}
                    isFirst={index === 0}
                    isLast={index === columnTodos.length - 1}
                  />
                ))}
                {status === 'To Do' && (
                  <div className="new-todo-card">
                    <NewTodoInput onAddTodo={handleAddTodo} />
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