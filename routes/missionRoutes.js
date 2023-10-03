const router = require("express").Router();

const missionController = require("../controllers/missionController.js")

router.post("/signup", missionController.create);

module.exports = router