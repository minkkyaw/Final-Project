const multer = require("multer");
const User = require("./../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./client/public/images/profile/${req.file.filename}`);
  next();
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.getUserWithPosts = factory.getOne(User, {
  path: "comments posts",
  populate: { path: "comments", options: { sort: { createdAt: -1 } } }
});
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
