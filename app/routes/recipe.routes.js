const { authMiddleware } = require("../middlewares/auth/auth.js");

// routes: Les fichiers de route définissent les points d'extrémité de l'API. Chaque fichier peut être responsable d'un ensemble spécifique de routes associées à une fonctionnalité particulière.
module.exports = app => {

  const recipes = require("../controllers/recipe.controller.js")
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Recipes
   *   description: API endpoints for managing recipes
  */

  /**
   @desc      These are our routes:
   @routes    /api/recipes: GET, POST, DELETE
   @routes    /api/recipes/:id: GET, PUT, DELETE
   @routes    /api/recipes/published: GET
  */

  /**
   @desc    Create a new recipe
   @route   POST /api/recipes
   @access  Private
  */

  /**
   * @swagger
   * /api/recipes:
   *   post:
   *     summary: Create a new recipe
   *     description: Create a new recipe with the provided details
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateRecipe'
   *     responses:
   *       '201':
   *         description: Recipe created successfully
   *         content:
   *           application/json:
   *             example:
   *               message: 'Recipe created successfully.'
   *               data: { recipe details }
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal Server Error
  */
  router.post("/", authMiddleware, recipes.createRecipe);

  /**
   @desc    Retrieve all recipes by name (Query)
   @route   GET /api/recipes
   @access  Public
  */
  router.get("/", recipes.findRecipesByName);

  /**
   @desc    Retrieve all recipes
   @route   GET /api/recipes
   @access  Public
  */

  /**
   * @swagger
   * /api/recipes:
   *   get:
   *     summary: Retrieve all recipes
   *     description: Retrieve a list of all recipes
   *     tags: [Recipes]
   *     responses:
   *       '200':
   *         description: Successfully retrieved recipes
   *         content:
   *           application/json:
   *             example:
   *               message: 'Recipes retrieved successfully.'
   *               data: { recipes }
   *       '500':
   *         description: Internal Server Error
  */
  router.get("/", recipes.findAllRecipes);

  /**
   @desc    Find all recipes with published = true:
   @route   GET /api/recipes/published
   @access  Public
  */

  /**
    * @swagger
    * /api/recipes/published:
    *   get:
    *     summary: Retrieve all published recipes
    *     description: Retrieve a list of all published recipes
    *     tags: [Recipes]
    *     responses:
    *       '200':
    *         description: Successfully retrieved published recipes
    *         content:
    *           application/json:
    *             example:
    *               message: 'Published recipes retrieved successfully.'
    *               data: { recipes }
    *       '500':
    *         description: Internal Server Error
  */
  router.get("/published", recipes.findAllPublished)

  /**
   @desc    Find a single Recipe with an id
   @route   GET /api/recipes/:id
   @access  Public
  */

  /**
    * @swagger
    * /api/recipes/{id}:
    *   get:
    *     summary: Retrieve a single recipe by ID
    *     description: Retrieve details of a recipe by providing its ID
    *     tags: [Recipes]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID of the recipe to retrieve
    *     responses:
    *       '200':
    *         description: Successfully retrieved the recipe
    *         content:
    *           application/json:
    *             example:
    *               message: 'Recipe retrieved successfully.'
    *               data: { recipe details }
    *       '404':
    *         description: Recipe not found
    *       '500':
    *         description: Internal Server Error
  */
  router.get("/:id", recipes.findOneRecipeById)

  /**
   @desc    Update a Recipe identified by the id in the request
   @route   PUT /api/recipes/:id
   @access  Private
  */

  /**
    * @swagger
    * /api/recipes/{id}:
    *   put:
    *     summary: Update a recipe by ID
    *     description: Update the details of a recipe by providing its ID
    *     tags: [Recipes]
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID of the recipe to update
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/UpdateRecipe'
    *     responses:
    *       '200':
    *         description: Recipe updated successfully
    *         content:
    *           application/json:
    *             example:
    *               message: 'Recipe updated successfully.'
    *               data: { updated recipe details }
    *       '401':
    *         description: Unauthorized
    *       '404':
    *         description: Recipe not found
    *       '500':
    *         description: Internal Server Error
  */
  router.put("/:id", authMiddleware, recipes.updateRecipeById)

  /**
   @desc    Delete a Recipe with the specified id
   @route   DELETE /api/recipes/:id
   @access  Private
  */

  /**
   * @swagger
   * /api/recipes/{id}:
   *   delete:
   *     summary: Delete a recipe by ID
   *     description: Delete a recipe by providing its ID
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the recipe to delete
   *     responses:
   *       '200':
   *         description: Recipe deleted successfully
   *         content:
   *           application/json:
   *             example:
   *               message: 'Recipe deleted successfully.'
   *               data: { deleted recipe details }
   *       '401':
   *         description: Unauthorized
   *       '404':
   *         description: Recipe not found
   *       '500':
   *         description: Internal Server Error
  */
  router.delete("/:id", authMiddleware, recipes.deleteRecipeById)

  /**
   @desc    Delete all recipes from the database
   @route   DELETE /api/recipes
   @access  Private
  */

  /**
    * @swagger
    * /api/recipes:
    *   delete:
    *     summary: Delete all recipes
    *     description: Delete all recipes from the database
    *     tags: [Recipes]
    *     security:
    *       - bearerAuth: []
    *     responses:
    *       '200':
    *         description: All recipes deleted successfully
    *         content:
    *           application/json:
    *             example:
    *               message: 'All recipes deleted successfully.'
    *       '401':
    *         description: Unauthorized
    *       '500':
    *         description: Internal Server Error
  */
  router.delete("/", authMiddleware, recipes.deleteAllRecipes)

  /**
   @desc    Get Recipes by custom id of Origines "origineId"
   @route   GET /api/recipes/origine/:idOrigine
   @access  Public
  */

  /**
   * @swagger
   * /api/recipes/origine/{idOrigine}:
   *   get:
   *     summary: Get recipes by Origine ID
   *     description: Retrieve a list of recipes based on the Origine ID
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: idOrigine
   *         required: true
   *         description: ID of the Origine
   *     responses:
   *       '200':
   *         description: Successfully retrieved recipes by Origine ID
   *         content:
   *           application/json:
   *             example:
   *               message: 'Recipes retrieved successfully.'
   *               data: { recipes }
   *       '500':
   *         description: Internal Server Error
  */
  router.get("/origine/:idOrigine", recipes.getRecipesByOrigine)

  // Get Recipes by country:
  // http://localhost:8080/api/recipes?country=Morocco
  // router.get("/", recipes.getRecipesByCountry)

  // ________________________________________________________________________________________________
  app.use('/api/recipes', router);
};