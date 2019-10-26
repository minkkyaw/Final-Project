const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getOne = (Model, populateObj, sort) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (sort) query = query.sort({ [sort]: -1 });
    if (populateObj) query = query.populate(populateObj);
    const doc = await query;
    if (!doc) return next(new AppError("No doc is found with that ID!", 404));
    if (req.user) {
      if (doc.userlikedIds && doc.userlikedIds.userId.includes(req.user._id))
        doc.userLiked = true;
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getAll = (Model, populateObj, sort, likedCheck) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.query.search)
      filter = {
        $text: {
          $search: req.query.search,
          $language: "en",
          $caseSensitive: false
        }
      };
    if (req.body.postId) filter = { postId: req.body.postId };
    let query = Model.find(filter);
    if (sort) query = query.sort({ [sort]: -1 });
    if (populateObj) query = query.populate(populateObj);

    const doc = await query;
    doc.forEach(data => {
      if (
        req.user &&
        data.userlikedIds.userId &&
        data.userlikedIds.userId.includes(req.user._id)
      )
        data.userLiked = true;
    });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    req.body.createdAt = new Date(Date.now());
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    if (req.query.like) {
      delete req.body.user;
      if (req.query.like === "-1")
        req.body.$push = {
          userlikedIds: { userId: req.user._id, name: req.user.firstName }
        };
      if (req.query.like === "1")
        req.body.$pull = {
          userlikedIds: { userId: req.user._id, name: req.user.firstName }
        };
    }

    if (req.query.participants) {
      delete req.body.user;
      if (req.query.participants === "-1")
        req.body.$push = {
          participants: { userId: req.user._id, name: req.user.firstName }
        };
      if (req.query.participants === "1")
        req.body.$pull = {
          participants: { userId: req.user._id, name: req.user.firstName }
        };
    }

    if (req.query.competitor)
      req.body.$push = { competitors: req.query.competitor };
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    doc.noOfLike = doc.userlikedIds.length;

    if (!doc) return next(new AppError("No doc is found with that ID!", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No doc is found with that ID!", 404));

    res.status(204).json({
      status: "success",
      data: {
        data: null
      }
    });
  });
