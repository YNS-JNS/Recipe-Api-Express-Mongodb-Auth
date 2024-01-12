// models: Les modèles décrivent la structure des données et interagissent avec la base de données. Chaque modèle représente généralement une entité dans la base de données (par exemple, une table).

const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

// Set Mongoose's promise library to use the global promise library. This ensures that Mongoose uses the native Node.js Promise implementation.
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.recipe = require("./recipe.model.js")(mongoose);
db.origine = require("./origine.model.js")(mongoose);

module.exports = db;