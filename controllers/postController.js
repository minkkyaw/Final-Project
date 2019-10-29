const axios = require("axios");

const Post = require("./../models/postModel");
const factory = require("./handlerFactory");

exports.addedUser = (req, res, next) => {
  if (req.user) {
    req.body.user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      photoUrl: req.user.photoUrl
    };
    if (!req.body.zipCode) req.body.zipCode = req.user.zipCode;
  }
  next();
};

exports.getAllPosts = factory.getAll(Post, { path: "comments" }, "createdAt");
exports.getPost = factory.getOne(Post, { path: "comments" });
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.getGooglePlaces = (req, res) => {
  let zip = req.query.zip;
  let apiKey = process.env.GOOGLE_API_KEY;
  let keyword = req.query.keyword;
  axios
    .get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
        keyword +
        "&input=" +
        zip +
        "&radius=10000&key=" +
        apiKey
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
