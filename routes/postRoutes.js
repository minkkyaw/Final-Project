const router = require("express").Router();

const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");
const commentRouter = require("./../routes/commentRoutes");

router.use("/:postId/comments/", commentController.addedPostIds, commentRouter);
router.route("/googlePlace").get(postController.getGooglePlaces);

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
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
