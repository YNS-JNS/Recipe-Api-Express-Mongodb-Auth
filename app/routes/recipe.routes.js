const { authMiddleware } = require("../middlewares/auth/auth.js");

// routes: Les fichiers de route définissent les points d'extrémité de l'API. Chaque fichier peut être responsable d'un ensemble spécifique de routes associées à une fonctionnalité particulière.
module.exports = app => {

    const recipes = require("../controllers/recipe.controller.js")
    const router = require("express").Router();

    /*
    These are our routes:
        /api/recipes: GET, POST, DELETE
        /api/recipes/:id: GET, PUT, DELETE
        /api/recipes/published: GET
    */

    // Create a new Recipe
    router.post("/", authMiddleware, recipes.createRecipe);

    // Find all recipes which name contains ‘tacos’: GET /recipes?name=tacos
    // Retrieve all recipes by name (Query)
    router.get("/", recipes.findRecipesByName);

    // Retrieve all recipes
    router.get("/", recipes.findAllRecipes);

    // Find all recipes with published = true:
    router.get("/published", recipes.findAllPublished)

    // Find a single Recipe with an id
    router.get("/:id", recipes.findOneRecipeById)

    // Update a Recipe identified by the id in the request:
    router.put("/:id", authMiddleware, recipes.updateRecipeById)

    // Delete a Recipe with the specified id:
    router.delete("/:id", authMiddleware,recipes.deleteRecipeById)

    // Delete all recipes from the database: 
    router.delete("/", authMiddleware, recipes.deleteAllRecipes)

    // Get Recipes by custom id of Origines "origineId"
    router.get("/origine/:idOrigine", recipes.getRecipesByOrigine)

    // Get Recipes by country:
    // http://localhost:8080/api/recipes?country=Morocco
    // router.get("/", recipes.getRecipesByCountry)

    // ________________________________________________________________________________________________
    app.use('/api/recipes', router);
};