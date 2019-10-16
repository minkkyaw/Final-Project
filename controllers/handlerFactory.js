const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getOne = (Model, populateObj) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateObj) query = query.populate(populateObj);

    const doc = await query;
    if (!doc) return next(new AppError("No doc is found with that ID!", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getAll = (Model, populateObj) =>
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
    if (populateObj) query = query.populate(populateObj);

    const doc = await query;

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
    if (req.query.like) req.body.$inc = { noOfLike: req.query.like };
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
