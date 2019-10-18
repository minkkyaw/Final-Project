const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getOne = (Model, populateObj) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateObj) query = query.populate(populateObj);

    const doc = await query;
    if (!doc) return next(new AppError("No doc is found with that ID!", 404));
    if (req.user && doc.userlikedIds.includes(req.user._id))
      doc.userLiked = true;
    doc.forEach(data => {
      if (data.userlikedIds.includes(req.user._id)) data.userLiked = true;
      data.noOfLike = data.userlikedIds.length;
    });

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
      if (data.userlikedIds.includes(req.user._id)) data.userLiked = true;
      data.noOfLike = data.userlikedIds.length;
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
        req.body.$push = { userlikedIds: req.user._id };
      if (req.query.like === "1")
        req.body.$pull = { userlikedIds: req.user._id };
    }

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
