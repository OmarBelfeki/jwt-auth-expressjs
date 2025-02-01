# jwt-auth-expressjs


# Node.js Authentication API with MySQL

A simple authentication API built with **Node.js**, **Express**, and **MySQL**, featuring **JWT authentication** and password hashing with **bcrypt**. Includes user registration, login, and protected routes.

## Features
- ✅ User registration with hashed passwords
- ✅ User login with JWT token generation
- ✅ Authentication middleware for protected routes
- ✅ MySQL database connection using environment variables

## Installation

```bash
[git clone https://github.com/OmarBelfeki/your-repo.git](https://github.com/OmarBelfeki/jwt-auth-expressjs.git)
cd jwt-auth-expressjs
npm install
```

![http-client-test](https://github.com/user-attachments/assets/33532fb3-4320-489a-94ea-d9905f8e73e1)

## code Test using http client
```http
### Test Home Route
GET http://localhost:3000/
Accept: application/json

### Register a New User
POST http://localhost:3000/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpassword"
}

### Attempt Registration with Missing Fields
POST http://localhost:3000/register
Content-Type: application/json

{
  "username": "useronly"
}

### Login with Correct Credentials
POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpassword"
}

### Login with Incorrect Password
POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "wrongpassword"
}

### Login with Non-Existent User
POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "unknownuser",
  "password": "password123"
}

### Access Protected Route without Token
GET http://localhost:3000/protected
Accept: application/json

### Access Protected Route with Valid Token
GET http://localhost:3000/protected
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTczODQxMjQzMiwiZXhwIjoxNzM4NDE2MDMyfQ.wpTBryDqqAIDtwgEk0v9q1nZ8tI14yiXb2nsx8_2mJo

### Access Protected Route with Invalid Token
GET http://localhost:3000/protected
Accept: application/json
Authorization: Bearer invalidtoken123
```
