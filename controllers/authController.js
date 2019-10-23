const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.signout = (req, res) => {
  res.cookie("jwt", "signout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    status: "success"
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization)
    token = req.headers.authorization.split(" ")[1];
  else if (req.headers.cookie)
    token = req.headers.cookie.split("jwt=")[1].split(",")[0];

  if (!token) return next(new AppError("You are not signed in!", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError("User does not exit", 401));

  // res.locals.user = currentUser;
  req.user = currentUser;

  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.headers.cookie) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.headers.cookie.split("jwt=")[1].split(",")[0],
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      if (currentUser.changedPasswordCheck(decoded.iat)) {
        return next();
      }
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
