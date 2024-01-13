const db = require("../models");
const OrigineModel = db.origine;


// ________________________________________________________________________________________________

// Create and Save a new origine:
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