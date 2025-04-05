package com.todo.services;

import com.todo.models.Todo;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class TodoService {
    public List<Todo> getAllTodos() {
        try {
            return FirebaseService.getAllTodos();
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<Todo> getTodosByStatus(String status) {
        return getAllTodos().stream()
            .filter(todo -> todo.getStatus().equalsIgnoreCase(status))
            .toList();
    }

    public List<Todo> getTodosByPriority(String priority) {
        return getAllTodos().stream()
            .filter(todo -> todo.getPriority().equalsIgnoreCase(priority))
            .toList();
    }

    public void addTodo(Todo todo) {
        try {
            FirebaseService.addTodo(todo);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public Todo getTodoById(String id) {
        return getAllTodos().stream()
            .filter(todo -> todo.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    public void updateTodoStatus(String id, String status) {
        Todo todo = getTodoById(id);
        if (todo != null) {
            todo.setStatus(status);
            try {
                FirebaseService.updateTodo(id, todo);
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void updateTodoPriority(String id, String priority) {
        Todo todo = getTodoById(id);
        if (todo != null) {
            todo.setPriority(priority);
            try {
                FirebaseService.updateTodo(id, todo);
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void updateTodoAssignee(String id, String assignee) {
        Todo todo = getTodoById(id);
        if (todo != null) {
            todo.setAssignee(assignee);
            try {
                FirebaseService.updateTodo(id, todo);
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
} 