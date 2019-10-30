const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Tournament = require("./../models/tournamentModel");
const factory = require("./handlerFactory");

exports.addedUser = (req, res, next) => {
  if (req.user) {
    req.body.user = { _id: req.user._id, firstName: req.user.firstName };
  }
  next();
};

exports.userCheck = catchAsync(async (req, res, next) => {
  const filter = {
    _id: req.params.id,
    user: { _id: req.body.user._id, firstName: req.body.user.firstName }
  };
  const tournament = await Tournament.find(filter);
  if (!tournament)
    return next(new AppError("The admin can only do this action."));
  next();
});

exports.getAllTournaments = factory.getAll(Tournament, null, "createdAt");
exports.getTournament = factory.getOne(Tournament);
exports.createTournament = factory.createOne(Tournament);
exports.updateTournament = factory.updateOne(Tournament);
exports.deleteTournament = factory.deleteOne(Tournament);
