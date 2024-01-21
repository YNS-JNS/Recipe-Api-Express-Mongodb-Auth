module.exports = app => {

  const origine = require("../controllers/origine.controller.js")
  const router = require("express").Router();

  /**
   * @swagger
   * tags:
   *   name: Origines
   *   description: API endpoints for managing origines (categories)
  */

  /**
   * @swagger
   * /api/origines:
   *   post:
   *     summary: Create a new origine
   *     description: Create a new origine with the provided details
   *     tags: [Origines]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateOrigine'
   *     responses:
   *       '201':
   *         description: Origine created successfully
   *         content:
   *           application/json:
   *             example:
   *               message: 'Origine created successfully.'
   *               data: { origine details }
   *       '500':
   *         description: Internal Server Error
  */
  router.post("/", origine.createOrigine);

  /**
   * @swagger
   * /api/origines:
   *   get:
   *     summary: Retrieve all origines
   *     description: Retrieve a list of all origines
   *     tags: [Origines]
   *     responses:
   *       '200':
   *         description: Successfully retrieved origines
   *         content:
   *           application/json:
   *             example:
   *               message: 'Origines retrieved successfully.'
   *               data: { origines }
   *       '500':
   *         description: Internal Server Error
  */
  router.get("/", origine.getAllOrigines);

  app.use('/api/origines', router);

}