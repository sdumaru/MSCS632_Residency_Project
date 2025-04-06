package com.todo.models;

import com.google.cloud.Timestamp;

public class User {
    private String id;
    private String username;
    private String name;
    private Timestamp createdAt;

    public User() {
        // Default constructor required for Firebase
        this.createdAt = Timestamp.now();
    }

    public User(String username) {
        this.username = username;
        this.name = username; // Default name to username if not specified
        this.createdAt = Timestamp.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return username;
    }
} 