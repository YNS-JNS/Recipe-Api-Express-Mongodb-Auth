module.exports = app => {

    const origine = require("../controllers/origine.controller.js")
    const router = require("express").Router();


    router.post("/", origine.createOrigine);

    app.use('/api/origines', router);

}