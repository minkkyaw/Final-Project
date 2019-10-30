var ObjectId = require("mongoose").Types.ObjectId;

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const upload = require("../utils/multer");

exports.getOne = (Model, populateObj, sort) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (sort) query = query.sort({ [sort]: -1 });
    if (populateObj) query = query.populate(populateObj);
    const doc = await query;
    if (!doc) return next(new AppError("No doc is found with that ID!", 404));
    if (req.user) {
      if (doc.userIdsLiked && doc.userIdsLiked.userId.includes(req.user._id))
        doc.userLiked = true;
      if (doc.posts) {
        doc.posts.forEach(data => {
          if (
            req.user &&
            data.userIdsLiked.some(userData => userData.userId == req.user.id)
          )
            data.userLiked = true;
        });
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getAll = (Model, populateObj, sort) =>
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
    if (req.query.userId) {
      filter = {
        user: {
          _id: new ObjectId(req.query.userId),
          firstName: req.query.firstName
        }
      };
      if (req.query.photoUrl) filter.user.photoUrl = req.query.photoUrl;
    }

    if (req.body.postId) filter = { postId: req.body.postId };
    if (req.body.userId) filter = { userId: req.body.userId };
    let query = Model.find(filter);
    if (sort) query = query.sort({ [sort]: -1 });
    if (populateObj) query = query.populate(populateObj);

    const doc = await query;
    doc.forEach(data => {
      if (
        req.user &&
        data.userIdsLiked &&
        data.userIdsLiked.some(userData => userData.userId == req.user.id)
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
    for (let key in req.body) {
      if (req.body[key] !== false) {
        if (!req.body[key]) delete req.body[key];
        if (key === "password") delete req.body[key];
      }
      switch (key) {
        case "pricePool":
          req.body[key] = parseInt(req.body[key]);
          console.log(typeof req.body[key]);
          break;
        case "maxNumberOfParticipants":
          req.body[key] = parseInt(req.body[key]);
          break;
        case "enrollmentFee":
          req.body[key] = parseInt(req.body[key]);
          break;
        case "pricePool":
          req.body[key] = parseInt(req.body[key]);
          break;
        case "pricePool":
          req.body[key] = parseInt(req.body[key]);
          break;
      }
    }
    console.log(req.body);
    req.body.createdAt = new Date(Date.now());
    const doc = await Model.create(req.body);
    if (!doc) return next();
    res.status(201).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    for (let key in req.body) {
      if (req.body[key] !== false) {
        if (!req.body[key]) delete req.body[key];
        if (key === "password") delete req.body[key];
      }
    }
    if (req.query.like) {
      delete req.body.user;
      if (req.query.like === "false")
        req.body.$push = {
          userIdsLiked: { userId: req.user._id, name: req.user.firstName }
        };
      if (req.query.like === "true")
        req.body.$pull = {
          userIdsLiked: { userId: req.user._id, name: req.user.firstName }
        };
    }

    if (req.query.competitor)
      req.body.$push = { competitors: req.query.competitor };

    if (req.body.skills) {
      let arr = req.body.skills.split(" ");
      let skillsArr = new Array();
      for (let i = 0; i < arr.length; i += 2) {
        skillsArr.push({
          skillName: arr[i],
          rating: parseInt(arr[i + 1])
        });
      }
      req.body.skills = skillsArr;
    }

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

exports.uploadPhoto = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.file);
    upload(req, res, async err => {
      if (err) {
        console.log(err);
      }
      const photoUrl = {
        photoUrl: res.req.file.path.replace("client/public", "")
      };
      let doc = await Model.findByIdAndUpdate(req.params.id, photoUrl);
      res.status(204).json({
        status: "success",
        data: {
          data: null
        }
      });
    });
  });
