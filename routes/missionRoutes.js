const router = require("express").Router();

const missionController = require("../controllers/missionController.js")

router.post("/create", missionController.create);
router.post("/map", missionController.map);

module.exports = router