const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/quattour", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
console.log(process.env.NODE_ENV);
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
