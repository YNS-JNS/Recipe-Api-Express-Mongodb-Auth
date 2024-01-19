module.exports = app => {
    const { auth } = require("../controllers/user.controller.js")
    const router = require("express").Router();

    // Create a new User
    router.post("/", auth.signUp);
    router.post("/", auth.signIn);

    // ________________________________________________________________________________________________
    app.use('/api/user', router);
}