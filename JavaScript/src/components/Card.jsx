import React from 'react';
import './Card.css';

const Card = ({ 
  todo, 
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onPriorityChange, 
  onAssigneeChange,
  assigneeOptions,
  isFirst,
  isLast
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
          onClick={() => onPriorityChange(todo)}
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
        <div className="vertical-actions">
          {!isFirst && (
            <button 
              className="move-button up"
              onClick={() => onMoveUp(todo.id)}
              aria-label="Move up"
            >
              ↑
            </button>
          )}
          {!isLast && (
            <button 
              className="move-button down"
              onClick={() => onMoveDown(todo.id)}
              aria-label="Move down"
            >
              ↓
            </button>
          )}
        </div>
        <div className="horizontal-actions">
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
    </div>
  );
};

export default Card; 