const router = require("express").Router();

const missionController = require("../controllers/missionController.js")

router.get("/getAllMission", missionController.getAllMission);
router.post("/create", missionController.create);

module.exports = router