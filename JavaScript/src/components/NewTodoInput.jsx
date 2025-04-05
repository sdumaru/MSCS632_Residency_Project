import React, { useState } from 'react';
import './NewTodoInput.css';

const NewTodoInput = ({ onAddTodo, assigneeOptions }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('unassigned');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        id: Date.now(),
        title: title.trim(),
        priority,
        status: 'To Do',
        assignee: assignee === 'unassigned' ? null : assignee
      });
      setTitle('');
      setPriority('Medium');
      setAssignee('unassigned');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="new-todo-input"
      />
      <div className="select-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
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
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
};

export default NewTodoInput;