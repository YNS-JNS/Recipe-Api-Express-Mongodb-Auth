# Recipe API

Recipe API is a RESTful CRUD API built with Node.js, Express, and MongoDB for managing recipes.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, Read, Update, and Delete recipes
- MongoDB for data storage
- Express for handling HTTP requests
- RESTful API design principles
- JSON responses

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- npm package manager

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YNS-JNS/Recipe-Api-Express-Mongodb.git
   ```


2. **Setting up the Backend:**

    - ***Navigate to the project directory:***

    ```bash
    cd Recipe-Api-Express-Mongodb
    ```

3. **Install the necessary packages:**

    ```bash
    npm install
    ```

4. **MongoDB Setup:**

    - Create a new database on MongoDB.
    - Copy the connection string provided by MongoDB.
    - Replace the `uri` in the `app/config/db.config.js` file with your MongoDB connection string.

    - **Start the backend server:**

    ```bash
    npm start
    ```
    
5. **Open the App:**

    The API will be available at http://localhost:8080. Use a tool like Postman to interact with the API.

    Server is running on port: [http://localhost:8080](http://localhost:8080).
   
7. **Endpoints**

/api/recipes: GET, POST, DELETE
/api/recipes/:id: GET, PUT, DELETE
/api/recipes/published: GET
/api/origines/: POST

8. **Example API request:**

***GET /recipes***
Example API response:
```bash

[
  {
    "id": "1",
    "name": "Spaghetti Bolognese",
    "ingredients": ["ground beef", "tomatoes", "spaghetti"],
    "instructions": "Cook ground beef, add tomatoes, serve over cooked spaghetti."
  },
  // More recipes...
]
```

## Author

This API was created with ❤️ by [AIT M'BAREK YOUNESS](https://github.com/YNS-JNS).

## Learn More

- Node.js Documentation: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

## Contribution

If you find issues or want to contribute, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add New Feature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.

