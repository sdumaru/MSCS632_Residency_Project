import React from 'react';
import './Card.css';

const Card = ({ 
  todo, 
  onMoveLeft, 
  onMoveRight, 
  onPriorityChange, 
  onAssigneeChange,
  assigneeOptions
}) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const handlePriorityClick = () => {
    const priorities = ['Low', 'Medium', 'High'];
    const currentIndex = priorities.indexOf(todo.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    onPriorityChange(todo, priorities[nextIndex]);
  };

  const handleAssigneeChange = (e) => {
    onAssigneeChange(todo, e.target.value);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{todo.title}</h3>
        <span 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(todo.priority) }}
          onClick={handlePriorityClick}
        >
          {todo.priority}
        </span>
      </div>
      <div className="card-body">
        <div className="assignee-container">
          <span className="assignee-label">Assignee: </span>
          <select
            value={todo.assignee}
            onChange={handleAssigneeChange}
            className="assignee-select"
          >
            {assigneeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card-actions">
        {todo.status !== 'To Do' && (
          <button 
            className="move-button left"
            onClick={() => onMoveLeft(todo)}
            aria-label="Move to previous column"
          >
            ←
          </button>
        )}
        {todo.status !== 'Completed' && (
          <button 
            className="move-button right"
            onClick={() => onMoveRight(todo)}
            aria-label="Move to next column"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default Card; 