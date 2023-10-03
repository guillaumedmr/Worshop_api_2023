const router = require("express").Router();

const authController = require("../controllers/authController.js")

router.post("/signupUser", authController.signupUser);
router.post("/signinUser", authController.signinUser);
router.post("/signupOrg", authController.signupOrg);
router.post("/signinOrg", authController.signinOrg);
router.get('/checkAuth', authController.checkAuth);
router.get('/logout', authController.logout);
module.exports = router