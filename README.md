# Backend API Documentation

This project is also managed using **Notion**, which is used to track tasks, milestones, and project progress. You can follow the link below to access the Notion workspace and view or update the status of different tasks:

[Project Event Management - Notion](https://workable-building-581.notion.site/Fullstack-Webiste-Event-16086bd6df1080649862fd7a2f7eee77)

This is the backend API for managing **Users** and **Events** with role-based access control, JWT authentication, and several other features including pagination, rate limiting, and more.

## Features

- **User CRUD** (Create, Read, Update, Delete)
- **Event CRUD** (Create, Read, Update, Delete)
- **Login/Logout with JWT Authentication**
- **Role-Based Access Control (RBAC)** for Users
- **Middleware for Admin-Only Routes**
- **Handler for Error Messages and Status Codes**
- **Rate Limiting and Throttling**
- **Pagination for Events and Users**
- **Swagger API Documentation**
- **Validation and Sanitization for DTO (User, Event, Login)**
- **CORS Configuration**

## Endpoints

### User

#### GET: `/user`

- Retrieves all users.

#### GET: `/user/id`

- Retrieves a specific user by ID.

#### PATCH: `/user/:id`

- Updates a user's data by ID. **Only accessible by admins.**

#### DELETE: `/user/:id`

- Deletes a user by ID. **Only accessible by admins.**

---

### Event

#### GET: `/event`

- Retrieves all events.

#### GET: `/event/:id`

- Retrieves a specific event by ID.

#### POST: `/event`

- Creates a new event. **Only accessible by admins.**

#### PATCH: `/event/:id`

- Updates an event by ID. **Only accessible by admins.**

#### PATCH: `/event/addUser/:id`

- Adds a user to an event by event ID. **Only accessible by admins.**

#### DELETE: `/event/:id`

- Deletes an event by ID. **Only accessible by admins.**

---

### Auth

#### POST: `/auth/login`

- Logs in a user and returns a JWT token.

#### POST: `/auth/logout`

- Logs out the user by invalidating the JWT token.

#### GET: `/auth/me`

- Retrieves information about the logged-in user based on the JWT token.

---

## Authentication and Authorization

This API uses JWT (JSON Web Tokens) for authentication. The token is passed in the `Authorization` header as a Bearer token for protected routes.

- **Login**: Obtain a JWT by sending a POST request to `/auth/login`.
- **Access Control**: Only authorized users can access certain routes. For instance, creating, updating, and deleting events is restricted to users with admin roles.

---

## Rate Limiting and Throttling

The API is protected with rate limiting to prevent abuse. If the rate limit is exceeded, a `429 Too Many Requests` status code will be returned.

---

## Pagination

Both the **Users** and **Events** endpoints support pagination. You can specify the `page` and `limit` query parameters to control the pagination of results.
