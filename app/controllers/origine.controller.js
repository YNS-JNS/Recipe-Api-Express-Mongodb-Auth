const db = require("../models");
const OrigineModel = db.origine;


// ________________________________________________________________________________________________

// TODO: Create and Save a new origine:
exports.createOrigine = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" })
        return;
    }

    const newOrigine = new OrigineModel({
        origineId: req.body.origineId,
        country: req.body.country,
    });

    newOrigine.save()
        .then(origine => {
            // res.send(recipe)
            res.status(201).json({
                message: "origine saved successfully.",
                data: origine
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Some error occurred while creating the origine.",
                error: err.message

            })
        });
}

// ________________________________________________________________________________________________

// TODO: Get all Origine Category
exports.getAllOrigines = (req, res) => {

    OrigineModel.find()
        .then(origines => {

            if (!origines) {
                return res.status(404).json({
                    message: "Maybe your database is empty!"
                })
            }

            res.status(200).json({
                message: "successfully",
                totalitems: origines.length,
                data: origines
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Some error occurred while retrieving recipes.",
                error: err.message
            })
        });
}