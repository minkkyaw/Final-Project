const router = require("express").Router();

const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");
const notificationController = require("./../controllers/notificationController");
const commentRouter = require("./../routes/commentRoutes");

router.use("/:postId/comments/", commentController.addedPostIds, commentRouter);
router.route("/googlePlace").get(postController.getGooglePlaces);

router
  .route("/:postId/users/:userId/notifications/")
  .post(
    authController.protect,
    notificationController.addedUserPostIds,
    notificationController.createNotification
  );

router
  .route("/users/")
  .get(
    authController.isLoggedIn,
    postController.addedUser,
    postController.getAllPosts
  );

router
  .route("/")
  .get(
    authController.protect,
    postController.addedUser,
    postController.getAllPosts
  )
  .post(
    authController.protect,
    postController.addedUser,
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPost)
  .patch(
    authController.protect,
    postController.addedUser,
    postController.updatePost
  )
  .delete(
    authController.protect,
    postController.addedUser,
    postController.deletePost
  );

module.exports = router;
