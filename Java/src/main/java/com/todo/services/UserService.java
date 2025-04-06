package com.todo.services;

import com.todo.models.User;

import java.util.List;
import java.util.concurrent.ExecutionException;

public class UserService {
    public List<User> getAllUsers() {
        try {
            return FirebaseService.getAllUsers();
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public void addUser(User user) {
        try {
            FirebaseService.addUser(user);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public boolean userExists(String name) {
        if (name == null) {
            return false;
        }
        return getAllUsers().stream()
            .anyMatch(user -> user != null && user.getName() != null && user.getName().equals(name));
    }
} 