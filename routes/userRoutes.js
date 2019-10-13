const router = require("express").Router();

const authController = require("./../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/signout").get(authController.signout);

module.exports = router;
