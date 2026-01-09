# Express JS Day 03

This repository contains the source code for the Express JS Day 03 assignment.

By default, the server listens on port 3000. You can change the port by modifying the `PORT` variable in the `server.js` file.

No front-end code is implemented for the assignment.

# Deploying

To deploy the application, follow these steps:

```bash
yarn

yarn start
```

# All available routes

## Test Endpoint

-   `GET /`
-   `GET /test-success`
-   `GET /test-error`

## Rest API Endpoints

-   `GET /api`: Test API routes.
-   `GET /api/tasks`: Retrieve all tasks.
-   `GET /api/tasks/:id`: Retrieve a specific task by ID.

-   `POST /api/tasks`: Create a new task.
-   `PUT /api/tasks/:id`: Update an existing task by ID.

    -   Payloads:

    ```json
    {
        "title": "New Task Title",
        "checked": "true" | "completed" | 1 // Truthy values. The rest will be considered as false.
    }
    ```

-   `DELETE /api/tasks/:id`: Delete a task by ID. (Supports multiple IDs separated by commas)
