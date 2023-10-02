const router = require("express").Router();

const authController = require("../controllers/authController.js")

router.get("/signup", authController.signup);

module.exports = router