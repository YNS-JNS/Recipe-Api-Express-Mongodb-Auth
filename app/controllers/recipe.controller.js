/*
    create a new Recipe: object.save()
    find a Recipe by id: findById(id)
    retrieve all Recipe: find()
    update a Recipe by id: findByIdAndUpdate(id, data)
    remove a Recipe: findByIdAndDelete(id)
    remove all Recipe: deleteMany()
    find all Recipe by name: find({ name: { $regex: new RegExp(name), $options: “i” } })
These functions will be used in our Controller.
*/

/*
    res.status(200) // Ok
    res.status(201) // Created
    res.status(204) // No content
    res.status(400) // Bad request
    res.status(401) // Unorigineized
    res.status(403) // Forbidden
    res.status(404) // Not found
    res.status(500) // Server error
*/
// controllers folder: Ce dossier contient les contrôleurs de l'application. Les contrôleurs sont responsables de la logique métier de l'application. Chaque fichier ou dossier dans ce répertoire peut représenter un contrôleur différent. 

const db = require("../models");
const RecipeModel = db.recipe;
const OrigineModel = db.origine;
// const OrigineModel = require("../models/origine.model")(db.mongoose);


// ________________________________________________________________________________________________

// Create and Save a new recipe:
exports.createRecipe = (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.origine) {
        res.status(400).json({ message: "Content can not be empty, name and origine are required fields!" })
        return;
    }

    // Check if the origine exist or not
    OrigineModel.findOne({ origineId: req.body.origine })
        .then((origine) => {
            // If not exist
            if (!origine) {
                // If the origine doesn't exist, send an error response
                return res.status(404).json({ message: "origine not found. Cannot create recipe." });
                // return;
            }
            // If the origine exists, create a new recipe
            /* We create an instance of the Model
            On crée une instance du Model
            Create a recipe */
            const newRecipe = new RecipeModel({
                name: req.body.name,
                origine: req.body.origine,
                ingredients: req.body.ingredients,
                description: req.body.description,
                published: req.body.published ? req.body.published : false
            });

            // Saving data in Mongodb:
            newRecipe.save()
                .then(recipe => {
                    res.status(201).json({
                        message: "recipe saved successfully.",
                        data: recipe
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message:
                            "Some error occurred while creating the recipe." || err.message
                    })
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error checking origine existence.",
                error: err.message
            });
        })
    /* .then(() => { 
    On se déconnecte de MongoDB maintenant
    mongoose.connection.close(); 
     }) */
}

// ________________________________________________________________________________________________

// Retrieve objects (with condition)
// Retrieve all recipes/ find by name from the database:
exports.findRecipesByName = (req, res) => {

    // We use req.query.name to get query string from the Request and consider it as condition for findRecipesByName() method.
    const name = req.query.name; // Get Query name
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    RecipeModel.find(condition)
        .then(recipes => {
            if (!recipes) {
                return res.status(404).json({
                    message: "This recipes with query is not found!",
                })
            } else {
                res.status(200).json({
                    message: "successfully",
                    totalItems: recipes.length,
                    data: recipes,
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving recipes."
            })
        });
}

// ________________________________________________________________________________________________

// Retrieve all recipes from the database:
exports.findAllRecipes = (req, res) => {

    RecipeModel.find()
        .then(recipes => {

            if (!recipes) {
                return res.status(404).json({
                    message: "Your database is empty!",
                })
            }

            res.status(200).json({
                message: "successfully",
                totalItems: recipes.length,
                data: recipes,
            })
        })
        .catch((err) => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving recipes."
            })
        });
}

// ________________________________________________________________________________________________

// Find a single recipe with an id
exports.findOneRecipeById = (req, res) => {

    const { id } = req.params; // Extract the id from the request

    RecipeModel.findById(id)
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({ message: `Not found recipe with id= ${id}` })
            } else {
                res.status(200).json({
                    message: "Item found successfully.",
                    data: recipe
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error retrieving recipe with id= ${id} `,
                error: err.message
            })
        });
}

// ________________________________________________________________________________________________

// Update a recipe identified by the id in the request:
exports.updateRecipeById = (req, res) => {

    // Validation
    if (!req.body) {
        return res.status(400).json({ message: "Data to update can not be empty!" });
    }

    const { id } = req.params;

    // Nb: The {new: true} option in the findByIdAndUpdate() a method is used to return the modified document to the then() function instead of the original.

    RecipeModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false })
        .then(recipe => {
            // If recipe is not exist
            if (!recipe) {
                return res.status(404).json({
                    message: `Cannot update recipe with id=${id}. Maybe recipe was not found!`
                }
                )
            }
            // Is exist: updated
            else {
                res.status(200).json({
                    message: "recipe was updated successfully.",
                    data: recipe
                })
            }
        })
        .catch(err => res.status(500).json({
            message: "Error updating recipe with id=" + id,
            error: err.message
        }));

};

// ________________________________________________________________________________________________

// Delete a recipe with the specified id:
exports.deleteNameById = (req, res) => {

    const { id } = req.params;

    RecipeModel.findByIdAndDelete(id)
        .then(
            recipe => {
                if (!recipe) {
                    return res.status(404).json({
                        message: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`
                    });
                } else {
                    res.status(200).json({
                        message: `recipe "${recipe.name}" was deleted successfully!`
                    })
                }
            }
        )
        .catch(err => res.status(500).json({
            message: `Could not delete recipe with id= ${id}`,
            error: err.message
        }));

};

// ________________________________________________________________________________________________

// Delete all recipes from the database:
exports.deleteAllRecipes = (req, res) => {

    RecipeModel.deleteMany({})
        .then(recipes => {
            res.status(200).json({
                message: `${recipes.deletedCount} recipes were deleted successfully.`
            })
        })
        .catch(
            err => res.status(500).json({
                message: "Some error occured while removing all recipes!",
                error: err.message

            })
        );

};

// ________________________________________________________________________________________________

// Find all recipes with published = true:
exports.findAllPublished = (req, res) => {

    RecipeModel.find({ published: true })
        .then(recipesPublished => {
            res.status(200)
                .json({
                    message: "List of Published Recipes",
                    totalItems: recipesPublished.length,
                    data: recipesPublished

                })
        }
        )
        .catch(
            err => res.status(500).json({
                message: "Some error occurred while retrieving recipes.",
                error: err.message
            })
        );

};

// ________________________________________________________________________________________________