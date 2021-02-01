const express = require('express')
const router = express.Router();
const routesController = require('../controller/RateController')

router.get('/', ((req, res) => {
    res.json("Welcome! Use /api/rates to get rates");
}))

router.get("/api/rates", routesController.getRates)

module.exports = router