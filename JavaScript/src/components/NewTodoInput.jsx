import React, { useState } from 'react';
import './NewTodoInput.css';

const NewTodoInput = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [assignee, setAssignee] = useState('John');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      priority,
      status: 'To Do',
      assignee
    };

    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="new-todo-input"
      />
      <div className="select-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="assignee-select"
        >
          <option value="John">John</option>
          <option value="Jane">Jane</option>
          <option value="Bob">Bob</option>
          <option value="Alice">Alice</option>
        </select>
      </div>
      <button type="submit" className="add-button" disabled={!title.trim()}>
        Add Task
      </button>
    </form>
  );
};

export default NewTodoInput;