const router = require("express").Router();

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/signout").get(authController.signout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.isLoggedIn);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);
router
  .route("/:id/photoupload")
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  );

router.route("/:id/posts").get(userController.getUserWithPosts);

module.exports = router;
