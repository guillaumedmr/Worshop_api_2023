const router = require("express").Router();

const orgController = require("../controllers/orgController.js")

router.get("/getAllOrganisation", orgController.getAllOrganisation);
router.get("/getOrganisation/:id", (req, res) => {
    const id = req.params.id; 
    orgController.getOrganisation(id, res);
});


module.exports = router