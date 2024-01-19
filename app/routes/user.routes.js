module.exports = app => {
    const { auth } = require("../controllers/user.controller.js")
    const router = require("express").Router();

    // Create a new User
    router.post("/", auth.singUp);
    router.post("/", auth.singIn);

    // ________________________________________________________________________________________________
    app.use('/api/user', router);
}