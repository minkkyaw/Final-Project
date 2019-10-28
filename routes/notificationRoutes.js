const router = require("express").Router();

const notificationController = require("./../controllers/notificationController");
const authController = require("./../controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(
    notificationController.addedUser,
    notificationController.getAllNotifications
  );

router
  .route("/:id")
  .get(notificationController.getNotification)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

module.exports = router;
