This students API will allow for Users to CRUD Classes, Students and Professors in a relational Mongoose Database. 

# Getting Started

This documentation will illustrade the features of the app which include adding, deleting and modifying information YOU enter as a test user :)

# Notes:
  - Until this project is deployed live, you can access all endpoints at localhost:3000
  - All endpoints require you to be logged in.

# Features
## Users

The User model has username and password fields

### Signing Up
  - The Sign up route lives at auth/signup
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"username":"example", "password":"examplePassword"}' http://localhost:3000/auth/sign-up
  ```

### Logging In
  - The Logout route lives at auth/login
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"username":"example", "password":"examplePassword"}' http://localhost:3000/auth/login
  ```

### Logging Out
  - The Logout route lives at auth/logout
  ```
  curl -X GET -H "Content-Type: application/json" -d '{"username":"example", "password":"examplePassword"}' http://localhost:3000/auth/logout
  ```

## Students

The Student model has first_name and last_name fields

### Adding a Student
  - The Add Student route lives at /students/new
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"first_name":"Bob", "last_name":"Papadopoulos"}' http://localhost:3000/students/new
  ```

### Deleting a Student
  - The Delete  Student route lives at /students/delete
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"last_name":"Luke", "last_name":"Skywalker"}' http://localhost:3000/students/delete
  ```

### Seeing Student Info
  - The Student Info route lives at /students/info
  ```
  curl -X GET -H "Content-Type: application/json" -d '{id:"1"}' http://localhost:3000/students/info
  ```

## Professors
### Adding a Professor
### Deleting a Professor
### Editing an existing Professor

## Classes
### Adding a Class
### Deleting a Class
### Editing an existing Class
