# MSCS 632: Advanced Programming Languages Residency Project (Collaborative To-Do List Application)

A real-time, cross-platform Collaborative To-Do List Application built using Java (CLI) and JavaScript (Web).  
The app utilizes Firebase Firestore to sync user and task data across platforms.

## Project Overview

This project demonstrates how two different technologies — Java CLI and React Web App — can work together seamlessly to manage shared to-do lists in real-time using Firebase.

## Features

- Add / View / Update / Delete Completed Todos
- Add / View / Delete Users
- Real-time synchronization with Firebase Firestore
- Filter Todos by Status and Priority (Java CLI)
- Automatic unassignment of tasks when a user is deleted
- JavaScript version supports live updates using Firebase snapshots
  
----

## JavaScript Project

To run the JavaScript project:

1. Navigate to the JavaScript directory:
   ```bash
   cd JavaScript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Java Project

To run the Java project:

1. Navigate to the Java directory:
   ```bash
   cd Java
   ```

2. Modify the `run.sh` file to point to your Google Cloud credentials file:
   - Open `run.sh` in a text editor
   - Update the `GOOGLE_APPLICATION_CREDENTIALS` path to point to your `credentials.json` file
   - Save the file

3. Make the run script executable:
   ```bash
   chmod +x run.sh
   ```

4. Run the application:
   ```bash
   ./run.sh
   ```

Note: Make sure you have Java and Maven installed on your system before running the Java project.

----

## References

- https://firebase.google.com/docs/firestore  
- https://react.dev  
- https://docs.oracle.com/en/java/  
- https://github.com/sdumaru/MSCS632_Residency_Project
