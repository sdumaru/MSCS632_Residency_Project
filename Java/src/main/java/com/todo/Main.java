package com.todo;

import com.todo.models.Todo;
import com.todo.services.TodoService;
import com.todo.services.UserService;
import com.todo.services.FirebaseService;
import com.todo.models.User;

import java.io.IOException;
import java.util.Scanner;
import java.util.List;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final TodoService todoService = new TodoService();
    private static final UserService userService = new UserService();

    public static void main(String[] args) {
        try {
            FirebaseService.initialize();
        } catch (IOException e) {
            System.err.println("Failed to initialize Firebase: " + e.getMessage());
            return;
        }

        boolean running = true;
        
        while (running) {
            displayMainMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1:
                    viewTodos();
                    break;
                case 2:
                    addTodo();
                    break;
                case 3:
                    manageUsers();
                    break;
                case 4:
                    updateTodo();
                    break;
                case 5:
                    deleteCompletedTodos();
                    break;
                
                case 0:
                    running = false;
                    System.out.println("Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void displayMainMenu() {
        System.out.println("\n=== Todo CLI Dashboard ===");
        System.out.println("1. View Todos");
        System.out.println("2. Add New Todo");
        System.out.println("3. Manage Users");
        System.out.println("4. Update Todo");
        System.out.println("5. Delete Completed Todos");
        System.out.println("0. Exit");
    }

    private static void viewTodos() {
        System.out.println("\n=== View Todos ===");
        System.out.println("1. View All");
        System.out.println("2. View by Status");
        System.out.println("3. View by Priority");
        System.out.println("0. Back");
        
        int choice = getIntInput("Enter your choice: ");
        
        switch (choice) {
            case 1:
                displayTodos(todoService.getAllTodos());
                break;
            case 2:
                viewTodosByStatus();
                break;
            case 3:
                viewTodosByPriority();
                break;
            case 0:
                return;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }

    private static void viewTodosByStatus() {
        System.out.println("\nSelect Status:");
        System.out.println("1. To Do");
        System.out.println("2. In Progress");
        System.out.println("3. Completed");
        System.out.println("0. Back");
        
        int choice = getIntInput("Enter your choice: ");
        if (choice == 0) return;
        
        if (choice > 0 && choice <= 3) {
            String status = choice == 1 ? "To Do" : choice == 2 ? "In Progress" : "Completed";
            displayTodos(todoService.getTodosByStatus(status));
        } else {
            System.out.println("Invalid choice.");
        }
    }

    private static void viewTodosByPriority() {
        System.out.println("\nSelect Priority:");
        System.out.println("1. High");
        System.out.println("2. Medium");
        System.out.println("3. Low");
        System.out.println("0. Back");
        
        int choice = getIntInput("Enter your choice: ");
        if (choice == 0) return;
        
        if (choice > 0 && choice <= 3) {
            String priority = choice == 1 ? "High" : choice == 2 ? "Medium" : "Low";
            displayTodos(todoService.getTodosByPriority(priority));
        } else {
            System.out.println("Invalid choice.");
        }
    }

    private static void displayTodos(java.util.List<com.todo.models.Todo> todos) {
        if (todos.isEmpty()) {
        System.out.println("No todos found.");
        return;
    }

    // Step 1: Calculate max title length, cap at 50
    int maxTitleLength = todos.stream()
        .mapToInt(todo -> todo.getTitle().length())
        .max()
        .orElse(20);
    maxTitleLength = Math.min(maxTitleLength, 50);

    // Step 2: Build format and border strings dynamically
    String titleFormat = "%-" + maxTitleLength + "s";
    String rowFormat = "| %-2s | " + titleFormat + " | %-8s | %-13s | %-11s | %-10s |\n";

    String border = "+----+" + "-".repeat(maxTitleLength + 2) + "+----------+---------------+-------------+------------+";

    // Step 3: Print table
    System.out.println(border);
    System.out.printf("| %-2s | " + titleFormat + " | %-8s | %-13s | %-11s | %-10s |\n",
            "#", "Title", "Priority", "Status", "Assignee", "Created");
    System.out.println(border);

    for (int i = 0; i < todos.size(); i++) {
        Todo todo = todos.get(i);
        String createdDate = todo.getCreatedAt().toString().split("T")[0];

        System.out.printf(rowFormat,
                (i + 1),
                todo.getTitle(),
                todo.getPriority(),
                todo.getStatus(),
                todo.getAssignee(),
                createdDate
        );
    }

    System.out.println(border);
}


    private static void addTodo() {
        String title = getStringInput("Enter todo title: ");
        System.out.println("Select priority:");
        System.out.println("1. High");
        System.out.println("2. Medium");
        System.out.println("3. Low");
        int priorityChoice = getIntInput("Enter your choice: ", 1, 3);
        String priority = priorityChoice == 1 ? "High" : priorityChoice == 2 ? "Medium" : "Low";
        
        String assignee = getStringInput("Enter assignee username: ");
        if (!userService.userExists(assignee)) {
            System.out.println("Error: User '" + assignee + "' does not exist. Please add the user first.");
            return;
        }
        
        Todo todo = new Todo(title, priority, "To Do", assignee);
        todoService.addTodo(todo);
        System.out.println("Todo added successfully!");
    }

    private static void deleteCompletedTodos() {
        System.out.print("Are you sure you want to delete all completed todos? (yes/no): ");
        String input = scanner.nextLine().trim().toLowerCase();
        if (input.equals("yes")) {
            todoService.deleteTodosByStatus("Completed");
            System.out.println("All completed todos have been deleted.");
        } else {
            System.out.println("Operation cancelled.");
        }
    }    

    private static void manageUsers() {
        System.out.println("\n=== Manage Users ===");
        System.out.println("1. Add User");
        System.out.println("2. View All Users");
        System.out.println("3. Delete User");
        System.out.println("0. Back");
        System.out.print("Enter your choice: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        switch (choice) {
            case 1:
                System.out.print("Enter user name: ");
                String name = scanner.nextLine();
                if (userService.userExists(name)) {
                    System.out.println("User already exists!");
                } else {
                    User user = new User(name);
                    userService.addUser(user);
                    System.out.println("User added successfully!");
                }
                break;
            case 2:
                List<User> users = userService.getAllUsers();
                if (users.isEmpty()) {
                    System.out.println("No users found.");
                } else {
                    System.out.println("\nUsers:");
                    for (User user : users) {
                        System.out.println("Name: " + user.getName() + ", Created: " + user.getCreatedAt());
                    }
                }
                break;
                case 3:
                System.out.print("Enter user name to delete: ");
                String userToDelete = scanner.nextLine();
                userService.deleteUser(userToDelete);
                break;
            
            case 0:
                return;
            default:
                System.out.println("Invalid choice!");
        }
    }

    private static void updateTodo() {
        System.out.println("\n=== Update Todo ===");
        System.out.println("1. Change Status");
        System.out.println("2. Change Priority");
        System.out.println("3. Change Assignee");
        System.out.println("0. Back");
        
        int choice = getIntInput("Enter your choice: ");
        
        switch (choice) {
            case 1:
                updateTodoStatus();
                break;
            case 2:
                updateTodoPriority();
                break;
            case 3:
                updateTodoAssignee();
                break;
            case 0:
                return;
            default:
                System.out.println("Invalid choice.");
        }
    }

    private static void updateTodoStatus() {
        Todo todo = selectTodoFromList();
        if (todo == null) return;
        String id = todo.getId();
    
        System.out.println("\nSelect new Status:");
        System.out.println("1. To Do");
        System.out.println("2. In Progress");
        System.out.println("3. Completed");
    
        int choice = getIntInput("Enter new status: ", 1, 3);
        String newStatus = choice == 1 ? "To Do" : choice == 2 ? "In Progress" : "Completed";
    
        if (todo.getStatus().equalsIgnoreCase(newStatus)) {
            System.out.println("Status is already '" + newStatus + "'. No changes made.");
            return;
        }
    
        todoService.updateTodoStatus(id, newStatus);
        System.out.println("Status updated successfully.");
    }
    
    private static void updateTodoPriority() {
        Todo todo = selectTodoFromList();
        if (todo == null) return;
        String id = todo.getId();
    
        System.out.println("\nSelect new Priority:");
        System.out.println("1. High");
        System.out.println("2. Medium");
        System.out.println("3. Low");
    
        int choice = getIntInput("Enter new priority: ", 1, 3);
        String newPriority = choice == 1 ? "High" : choice == 2 ? "Medium" : "Low";
    
        if (todo.getPriority().equalsIgnoreCase(newPriority)) {
            System.out.println("Priority is already '" + newPriority + "'. No changes made.");
            return;
        }
    
        todoService.updateTodoPriority(id, newPriority);
        System.out.println("Priority updated successfully.");
    }
    

    private static void updateTodoAssignee() {
        Todo todo = selectTodoFromList();
        if (todo == null) return;
        String id = todo.getId();
    
        String currentAssignee = todo.getAssignee();
        String newAssignee = getStringInput("Enter new assignee username: ").toLowerCase();
    
        if (!userService.userExists(newAssignee)) {
            System.out.println("Error: User '" + newAssignee + "' does not exist. Please add the user first.");
            return;
        }
    
        if (currentAssignee != null && currentAssignee.equalsIgnoreCase(newAssignee)) {
            System.out.println("Assignee is already '" + currentAssignee + "'. No changes made.");
            return;
        }
    
        todoService.updateTodoAssignee(id, newAssignee);
        System.out.println("Assignee updated successfully.");
    }
    

    private static int getIntInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }

    private static int getIntInput(String prompt, int min, int max) {
        while (true) {
            int value = getIntInput(prompt);
            if (value >= min && value <= max) {
                return value;
            }
            System.out.println("Please enter a number between " + min + " and " + max + ".");
        }
    }

    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine();
    }

    private static Todo selectTodoFromList() {
        List<Todo> todos = todoService.getAllTodos();
        if (todos.isEmpty()) {
            System.out.println("No todos found.");
            return null;
        }
    
        System.out.println("\nSelect a Todo:");
        displayTodos(todos);  // reusing table method here
    
        int choice = getIntInput("Enter your choice: ", 1, todos.size());
        return todos.get(choice - 1);
    }
    
} 