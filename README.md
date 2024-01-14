# Recipe API

Recipe API is a RESTful CRUD API built with Node.js, Express, and MongoDB for managing recipes.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)

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

**Clone the repository:**

   ```bash
   git clone https://github.com/YNS-JNS/Recipe-Api-Express-Mongodb.git
   ```

 **Navigate to the project directory:**

   ```bash
    cd Recipe-Api-Express-Mongodb
   ```

**Install the necessary packages:**

   ```bash
    npm install
   ```
## Usage

 **MongoDB Setup:**

   - Create a new database on MongoDB.
   - Copy the connection string provided by MongoDB.
   - Replace the `uri` in the `app/config/db.config.js` file with your MongoDB connection string.

**Start the backend server:**

  ```bash
    npm start
  ```
    
**Open the App:**

   The API will be available at http://localhost:8080. Use a tool like Postman to interact with the API.

   Server is running on port: [http://localhost:8080](http://localhost:8080).
   
## Endpoints

- /api/recipes: GET, POST, DELETE
- /api/recipes/:id: GET, PUT, DELETE
- /api/recipes/published: GET
- /api/origines/: POST

**Example API request:**

***GET /recipes***
Example API response:
```bash

[
  {
            "name": "Moroccan Couscous",
            "origine": 1,
            "ingredients": [
                "couscous",
                "chickpeas",
                "lamb",
                "carrots",
                "zucchini",
                "onions",
                "tomatoes",
                "garlic",
                "olive oil",
                "coriander",
                "cumin",
                "turmeric",
                "cinnamon",
                "salt",
                "pepper"
            ],
            "description": "A flavorful and aromatic Moroccan couscous dish with a mix of vegetables and tender lamb.",
            "published": true,
            "createdAt": "2024-01-13T18:40:53.781Z",
            "updatedAt": "2024-01-13T18:40:53.781Z",
            "id": "65a2d9354453af1d7ee3638b"
        },
        {
            "name": "Sushi Rolls",
            "origine": 5,
            "ingredients": [
                "rice",
                "fish",
                "seaweed",
                "avocado",
                "soy sauce"
            ],
            "description": "Japanese sushi rolls with fresh ingredients",
            "published": true,
            "createdAt": "2024-01-13T18:41:50.033Z",
            "updatedAt": "2024-01-13T18:41:50.033Z",
            "id": "65a2d96e4453af1d7ee36397"
        },
  // More recipes...
]
```
## Dependencies
**List of project dependencies:**

- cors : Cross-origin resource sharing, (CORS) is a mechanism that allows restricted resources on a web page to be accessed from another domain outside the domain from which the first resource was served.
- express
- joi : The most powerful schema description language
and data validator for JavaScript
- mongoose : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha).
- morgan : HTTP request logger middleware for node.js

## Author

This API was created with ❤️ by ***[AIT M'BAREK YOUNESS](https://github.com/YNS-JNS).***

## Learn More

- Node.js Documentation: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

## Contributing

If you find issues or want to contribute, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add New Feature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.

