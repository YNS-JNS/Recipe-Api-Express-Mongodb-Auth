// * Le point d'entrée principal de l'application où Express est configuré et le serveur est démarré.

// * Importing packages : __________________________________________________________________________
const express = require("express");
const db = require("./app/models"); // * Importing db object
const logger = require("morgan");

// -----------------------------------------------------------------------------------------------
// Todo: (cors): A middleware to manage resource sharing problems between different domains.             |
// -----------------------------------------------------------------------------------------------
// * cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

// ________________________________________________________________________________________________

// * creates an Express application instance
const app = express();

// ________________________________________________________________________________________________

/* ------------------------------------------------------------------------------------------------
- corsOptions specifies the permitted origin for requests. In this example, only requests from
  "http://localhost:3000" will be allowed.   
- fr: corsOptions spécifie l'origine autorisée pour les requêtes. Dans cet exemple,
  seules les requêtes provenant de "http://localhost:3000" seront autorisées.          
------------------------------------------------------------------------------------------------ */

const corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

// ________________________________________________________________________________________________

/* -----------------------------------------------------------------------------------------------
- app.use(express.json()) :
  This line configures middleware that parses the body of HTTP requests with a "application/json" content type. 
  It extracts JSON data from the request body and makes it available in req.body. 
  This makes it easy to work with JSON data sent in the body of a request.

- fr: Cette ligne configure un middleware qui analyse le corps des requêtes HTTP avec un type de contenu "application/json". 
  Il extrait les données JSON du corps de la requête et les rend disponibles dans req.body. 
  Cela permet de manipuler facilement les données JSON envoyées dans le corps d'une requête.
------------------------------------------------------------------------------------------------ */
// Todo: parse requests of content-type - application/json
app.use(express.json())

/* -----------------------------------------------------------------------------------------------
- app.use(express.urlencoded({ extended: true })):
  This line configures middleware that parses the body of HTTP requests with a "application/x-www-form-urlencoded" content type. 
  It extracts data from the request body in key-value pairs and makes it available in req.body. 
  This is often used to handle data from HTML forms.
------------------------------------------------------------------------------------------------ */

// parse requests of content-type - application/x-www-form-urlencoded
// Todo: This middleware parses incoming requests with URL-encoded payloads (form submit HTML)
app.use(express.urlencoded({ extended: true }));

// Middleware morgan
app.use(logger('dev'));

// ________________________________________________________________________________________________

// Todo: Connecting to MongoDb Atlas:
db.mongoose
  .connect(db.url)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit();
  })

// ________________________________________________________________________________________________

// Routes:

/* You can see that we use a controller from /controllers/tutorial.controller.js.
   We also need to include routes in server.js (right before app.listen()): */
// Todo: Routes definition :
require("./app/routes/recipe.routes")(app);
require("./app/routes/origine.routes")(app);
require("./app/routes/user.routes")(app);

// ________________________________________________________________________________________________

// * Swagger:

// Enable Swagger module’s in the API pipeline in server.js 
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication API',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
  },
  apis: ['./app/routes/*.js'], // Path to the API routes with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ________________________________________________________________________________________________

// Todo: Configuration du port et démarrage du serveur :
// * Set port, listen for requests:
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}...`)
})

// ________________________________________________________________________________________________