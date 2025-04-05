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

    public boolean userExists(String username) {
        return getAllUsers().stream()
            .anyMatch(user -> user.getUsername().equals(username));
    }
} 