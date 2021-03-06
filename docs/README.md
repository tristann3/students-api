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

## Professors

The Professor model has first_name and last_name fields


### Adding a Professor
- The Add Professor route lives at /professors/new
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"first_name":"Bob", "last_name":"Papadopoulos"}' http://localhost:3000/professors/new
  ```
### Deleting a Professor
- The Delete Professor route lives at /professors/:id/delete
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"last_name":"Luke", "last_name":"Skywalker"}' http://localhost:3000/proffessors/delete
  ```
### Getting all Professors
- The Delete Professor route lives at /professors
  - Because cUrl cannot track logged in users, you must use another form of 

### Updating a Professor
- The Update route lives at /professors/:id/update


## Classes
### Adding a Class
- The Add Class route lives at /classes/new
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"name":"BEW 1.3", "Professor":professor_id}' http://localhost:3000/classes/new
  ```
### Deleting a Class
- The Delete Class route lives at /classes/delete
  ```
  curl -X POST -H "Content-Type: application/json" -d '{"name":"BEW 1.3"}' http://localhost:3000/classes/delete
  ```

