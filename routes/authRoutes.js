const router = require("express").Router();

const authController = require("../controllers/authController.js")

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get('/checkAuth', authController.checkAuth);
router.get('/logout', authController.logout);
module.exports = router