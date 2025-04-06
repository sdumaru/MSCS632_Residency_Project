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
        // Generate a new document reference with a random ID
        var docRef = db.collection(COLLECTION_TODOS).document();
        // Set the ID in the todo object
        todo.setId(docRef.getId());
        // Create the document with the todo data
        docRef.set(todo).get();
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

    public static void deleteTodo(String id) throws ExecutionException, InterruptedException {
        db.collection(COLLECTION_TODOS).document(id).delete().get();
    }
    
    public static void deleteTodosByStatus(String status) throws ExecutionException, InterruptedException {
        var snapshot = db.collection(COLLECTION_TODOS)
            .whereEqualTo("status", status)
            .get()
            .get();
        for (var doc : snapshot.getDocuments()) {
            doc.getReference().delete().get();
        }
    }
    
    public static void unassignTodosForUser(String username) throws ExecutionException, InterruptedException {
        var snapshot = db.collection(COLLECTION_TODOS)
            .whereEqualTo("assignee", username)
            .get()
            .get();
    
        for (var doc : snapshot.getDocuments()) {
            var todo = doc.toObject(Todo.class);
            todo.setAssignee("Unassigned");
            todo.setId(doc.getId());
            doc.getReference().set(todo).get();
        }
    }
    

    public static void addUser(User user) throws ExecutionException, InterruptedException {
        // Generate a new document reference with a random ID
        var docRef = db.collection(COLLECTION_USERS).document();
        // Set the ID in the user object
        user.setId(docRef.getId());
        // Create the document with the user data
        docRef.set(user).get();
    }

    public static void deleteUser(String id) throws ExecutionException, InterruptedException {
        db.collection(COLLECTION_USERS).document(id).delete().get();
    }    

    public static boolean userExists(String name) throws ExecutionException, InterruptedException {
        return db.collection(COLLECTION_USERS)
            .whereEqualTo("name", name)
            .get()
            .get()
            .getDocuments()
            .size() > 0;
    }
} 