const router = require("express").Router();

const tournamentController = require("../controllers/tournamentController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protect,
    tournamentController.addedUser,
    tournamentController.getAllTournaments
  )
  .post(
    authController.protect,
    tournamentController.addedUser,
    tournamentController.createTournament
  );

router
  .route("/:id")
  .get(
    authController.protect,
    tournamentController.addedUser,
    tournamentController.getTournament
  )
  .patch(authController.protect, tournamentController.updateTournament)
  .delete(
    authController.protect,
    tournamentController.addedUser,
    tournamentController.userCheck,
    tournamentController.deleteTournament
  );

module.exports = router;
