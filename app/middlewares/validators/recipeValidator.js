const Joi = require("joi");

// TODO: Check if Id Recipe valid or not
const recipeIdSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

// TODO: Validation for creating a new recipe
const createRecipeSchema = Joi.object(
    {
        name: Joi.string().required().min(3).max(100),
        origine: Joi.number().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        description: Joi.string().required(),
        published: Joi.boolean(),
        // published: Joi.boolean().required(),
    }
)

// TODO: Validation for creating a new recipe
const updateRecipeSchema = Joi.object(
    {
        name: Joi.string().min(3).max(100),
        origine: Joi.number(),
        ingredients: Joi.array().items(Joi.string()),
        description: Joi.string(),
        published: Joi.boolean(),
    }
).min(1); // TODO: Au moins un champ doit être présent
/*
la méthode min(1) est utilisée pour spécifier que l'objet doit avoir au moins un champ non vide. Ainsi, si tous les champs sont vides, la validation échouera.
*/

module.exports = {
    recipeIdSchema,
    createRecipeSchema,
    updateRecipeSchema,
}