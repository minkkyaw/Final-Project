const router = require("express").Router();

const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");

// router.use(authController.protect);

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.addedUser, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
