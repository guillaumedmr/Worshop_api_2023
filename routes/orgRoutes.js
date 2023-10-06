const router = require("express").Router();

const orgController = require("../controllers/orgController.js")

router.get("/getAllOrganisation", orgController.getAllOrganisation);

module.exports = router