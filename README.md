# Task Management App

Welcome to the Task Management App README. This document provides a comprehensive overview of the application, its features, and how to set it up for development or production use.

## Overview

The Task Management App is a web application designed to help users organize and track their tasks efficiently. It offers three main categories for tasks: pending, completed, and expired. Users can perform CRUD (Create, Read, Update, Delete) operations on tasks, as well as manage their user profile, including the ability to edit their name and other details.

## Features

- **Task Categories**: Organize tasks into three categories: pending, completed, and expired.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on tasks.
- **User Profile Management**: Edit user profile details, including name and other information.

## Technologies Used

### Frontend

- **Vite**: A fast build tool for modern web development.
- **Vercel**: A cloud platform for static sites and serverless functions.
- **React-Redux**: State management library for React applications.

### Backend

- **Multer**: Middleware for handling multipart/form-data, primarily used for file uploads.
- **MERN Stack**: MongoDB, Express.js, React, and Node.js for full-stack development.

## Installation

To set up the Task Management App locally for development, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-management-app.git
   ```
2. **Navigate to project directory:**

   ```bash
   cd task-management-app
   ```
3. **Install dependencies for both frontend and backend:**

   ```bash
   cd client
   npm i
   ```

   ```bash
   cd server
   npm i
   ```
4. **Set up environment variables:**

Create a .env file in the backend directory and add necessary environment variables (e.g., database connection URI, JWT secret).

5. **Start the development servers:**

   ```bash
   # for backend
   cd server
   npm start

   # for frontend
   cd client
   npm run dev
   ```
6. **Access the application in your browser at http://localhost:5173.**

## Usage
Once the application is running, you can:

1. Navigate through the different task categories.
2. Add new tasks, update existing ones, mark tasks as completed, or delete tasks.
3. Edit your user profile details, including your name.

## Contributing
Contributions to the Task Management App are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/my-feature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/my-feature).
5. Create a new Pull Request.

---

# Support
For any inquiries or support, please contact hirebaibhavkumar@gmail.com .

Thank you for using the Task Management App! We hope it helps you stay organized and productive. If you have any feedback or suggestions, feel free to reach out. Happy task managing!
