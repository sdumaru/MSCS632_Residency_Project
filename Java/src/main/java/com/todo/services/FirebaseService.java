package com.todo.services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.todo.models.Todo;
import com.todo.models.User;
import io.grpc.LoadBalancerRegistry;
import io.grpc.internal.PickFirstLoadBalancerProvider;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class FirebaseService {
    private static Firestore db;
    private static final String COLLECTION_TODOS = "todos";
    private static final String COLLECTION_USERS = "users";

    public static void initialize() throws IOException {
        // Register the pick_first load balancer
        LoadBalancerRegistry.getDefaultRegistry().register(new PickFirstLoadBalancerProvider());

        FirebaseOptions options = FirebaseOptions.builder()
    .setCredentials(GoogleCredentials.getApplicationDefault())
    .setDatabaseUrl("https://advancedprogramminglanguages.firebaseio.com/")
    .build();

FirebaseApp.initializeApp(options);
        db = FirestoreClient.getFirestore();
    }

    public static List<Todo> getAllTodos() throws ExecutionException, InterruptedException {
        List<Todo> todos = new ArrayList<>();
        db.collection(COLLECTION_TODOS).get().get().getDocuments()
            .forEach(document -> {
                Todo todo = document.toObject(Todo.class);
                todo.setId(document.getId());
                todos.add(todo);
            });
        return todos;
    }

    public static void addTodo(Todo todo) throws ExecutionException, InterruptedException {
        db.collection(COLLECTION_TODOS).add(todo);
    }

    public static void updateTodo(String id, Todo todo) throws ExecutionException, InterruptedException {
        db.collection(COLLECTION_TODOS).document(id).set(todo);
    }

    public static List<User> getAllUsers() throws ExecutionException, InterruptedException {
        List<User> users = new ArrayList<>();
        db.collection(COLLECTION_USERS).get().get().getDocuments()
            .forEach(document -> {
                User user = document.toObject(User.class);
                user.setId(document.getId());
                users.add(user);
            });
        return users;
    }

    public static void addUser(User user) throws ExecutionException, InterruptedException {
        db.collection(COLLECTION_USERS).add(user);
    }

    public static boolean userExists(String username) throws ExecutionException, InterruptedException {
        return db.collection(COLLECTION_USERS)
            .whereEqualTo("username", username)
            .get()
            .get()
            .getDocuments()
            .size() > 0;
    }
} 