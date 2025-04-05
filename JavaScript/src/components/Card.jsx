import React from 'react';
import './Card.css';

const Card = ({ todo }) => {
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

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{todo.title}</h3>
        <span 
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(todo.priority) }}
        >
          {todo.priority}
        </span>
      </div>
      <div className="card-body">
        <p className="assignee">Assignee: {todo.assignee}</p>
      </div>
    </div>
  );
};

export default Card; 