const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const axios = require("axios");

const Post = require("./../models/postModel");
const factory = require("./handlerFactory");

exports.addedUser = (req, res, next) => {
  if (req.user) {
    req.body.user = { _id: req.user._id, firstName: req.user.firstName };
    req.body.zipCode = req.user.zipCode;
  }
  next();
};

exports.getAllPosts = factory.getAll(Post, { path: "comments" });
exports.getPost = factory.getOne(Post, { path: "comments" });
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.getGooglePlaces = (req, res) => {
  let zip = 19106;
  let api = process.env.GOOGLE_API_KEY;
  let keyword = "bowling";
  axios
    .get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
        keyword +
        "&input=" +
        zip +
        "&radius=10000&key=" +
        api
    )
    .then(results => {
      return res.json({
        results: results.data.results.map(result => {
          const { formatted_address, name } = result;
          return {
            formatted_address,
            name,
            link: `https://www.google.com/maps/place/${formatted_address.replace(
              / /g,
              "+"
            )}`
          };
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
};
