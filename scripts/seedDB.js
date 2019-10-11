const mongoose = require("mongoose");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist"
);

const userSeed = [
  {
    email: "adminmin@min.io",
    passowrd: "min123456",
    name: "Min",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "adminrebeacca@rebeacca.io",
    passowrd: "rebeacca123456",
    name: "Rebeacca",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "adminben@ben.io",
    passowrd: "ben123456",
    name: "Ben",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "adminmatt@matt.io",
    passowrd: "matt123456",
    name: "Matt",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    email: "usermin@min.io",
    passowrd: "min123456",
    name: "Min",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "userrebeacca@rebeacca.io",
    passowrd: "rebeacca123456",
    name: "Rebeacca",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "userben@ben.io",
    passowrd: "ben123456",
    name: "Ben",
    city: "Philadelphia",
    zipcode: 19145
  },
  {
    username: "usermatt@matt.io",
    passowrd: "matt123456",
    name: "Matt",
    city: "Philadelphia",
    zipcode: 19145
  }
];

const addUserSeeds = () => {
  User.remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

switch (process.argv[2]) {
  case "book":
    return addBookSeeds();
  case "user":
    return addUserSeeds();
  default:
    return;
}
