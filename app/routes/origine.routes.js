module.exports = app => {

    const origine = require("../controllers/origine.controller.js")
    const router = require("express").Router();


    router.post("/", origine.createOrigine);
    router.get("/", origine.getAllOrigines);

    app.use('/api/origines', router);

}