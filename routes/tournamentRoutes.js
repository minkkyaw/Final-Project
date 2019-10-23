const router = require("express").Router();

const tournamentController = require("../controllers/tournamentController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(tournamentController.getAllTournaments)
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
  .patch(tournamentController.updateTournament)
  .delete(
    authController.protect,
    tournamentController.addedUser,
    tournamentController.userCheck,
    tournamentController.deleteTournament
  );

module.exports = router;
