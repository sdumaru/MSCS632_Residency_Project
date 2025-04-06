# MSCS 632: Advanced Programming Languages Residency Project

This project contains two implementations of a Todo application - one in Java and one in JavaScript.

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