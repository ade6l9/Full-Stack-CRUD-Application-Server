# Campus Management System - Server

This is the server-side application for the Campus Management System. It is built with Node.js, Express, and Sequelize and provides RESTful API routes for managing campuses and students.

## Features

- Provides endpoints for CRUD operations on campuses and students
- Uses PostgreSQL as the database
- Sequelize ORM for database management
- Middleware for error handling and validation

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <server-repository-url>
2. Install dependencies:
    ```bash
     npm install
3. Set up the database:
  - Create a PostgreSQL database.
  - Configure the database settings in the config.js file.
4. Run the application:
   ```bash
   npm start

 
# API Endpoints

## Campus Routes
- GET /api/campuses: Get all campuses
- POST /api/campuses: Add a new campus
- GET /api/campuses/:campusId: Get a specific campus (and its students)
- PUT /api/campuses/:campusId: Update a campus
- DELETE /api/campuses/:campusId: Delete a campus

## Student Routes
- GET /api/students: Get all students
- POST /api/students: Add a new student
- GET /api/students/:studentId: Get a specific student (and their campus)
- PUT /api/students/:studentId: Update a student
- DELETE /api/students/:studentId: Delete a student

## Contributor
Adelina Dautovic <br>
Github: ade6l9
