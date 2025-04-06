package com.todo.models;

import com.google.cloud.Timestamp;
import java.time.LocalDateTime;

public class Todo {
    private String id;
    private String title;
    private String priority;
    private String status;
    private String assignee;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Todo() {
        // Default constructor required for Firebase
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public Todo(String title, String priority, String status, String assignee) {
        this.title = title;
        this.priority = priority;
        this.status = status;
        this.assignee = assignee.toLowerCase();
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = Timestamp.now();
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
        this.updatedAt = Timestamp.now();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = Timestamp.now();
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee !=null ? assignee.toLowerCase(): "Unassigned";
        this.updatedAt = Timestamp.now();
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return String.format("ID: %s, Title: %s, Priority: %s, Status: %s, Assignee: %s, Created: %s",
            id, title, priority, status, assignee, createdAt);
    }
} 