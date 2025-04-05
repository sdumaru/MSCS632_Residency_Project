import React, { useState } from 'react';
import './NewTodoInput.css';

const NewTodoInput = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      priority,
      status: 'To Do',
      assignee: 'Unassigned'
    };

    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="save-button" disabled={!title.trim()}>
        Add Task
      </button>
    </form>
  );
};

export default NewTodoInput;