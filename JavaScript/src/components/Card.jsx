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

  const handleAssigneeChange = (e) => {
    onAssigneeChange(todo, e.target.value === 'unassigned' ? null : e.target.value);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ff6b6b';
      case 'Medium':
        return '#ffd93d';
      case 'Low':
        return '#6bff6b';
      default:
        return '#ccc';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{todo.title}</h3>
        <div className="card-header-right">
          <span className="card-id">#{todo.id}</span>
          <div
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
            onClick={() => onPriorityChange(todo)}
          >
            {todo.priority}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="assignee-container">
          <span className="assignee-label">Assignee:</span>
          <select
            value={todo.assignee || 'unassigned'}
            onChange={handleAssigneeChange}
            className="assignee-select"
          >
            <option value="unassigned">Unassigned</option>
            {assigneeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card-actions">
        <button className="move-button left" onClick={() => onMoveLeft(todo)}>←</button>
        <button className="move-button right" onClick={() => onMoveRight(todo)}>→</button>
      </div>
    </div>
  );
};

export default Card; 