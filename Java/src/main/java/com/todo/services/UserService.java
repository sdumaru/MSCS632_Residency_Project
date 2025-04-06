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

    public void deleteUser(String name) {
        List<User> users = getAllUsers();
        for (User user : users) {
            if (user != null && user.getName().equalsIgnoreCase(name)) {
                try {
                    FirebaseService.deleteUser(user.getId());
                    FirebaseService.unassignTodosForUser(user.getUsername().toLowerCase());
                    System.out.println("User '" + name + "' deleted successfully.");
                    return;
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
            }
        }
        System.out.println("User '" + name + "' not found.");
    }
    
    public boolean userExists(String name) {
        if (name == null) {
            return false;
        }
        String normalizedName = name.toLowerCase();
        return getAllUsers().stream()
            .anyMatch(user -> user != null && user.getName() != null &&
                user.getName().equalsIgnoreCase(normalizedName));
    }
    
} 