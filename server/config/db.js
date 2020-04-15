"use strict";

// Import mongoose.
const MONGOOSE = require("mongoose");
const REQUIRE_DIR = require("require-dir");

// Importing the "variables.env" file.
require("dotenv").config({
  path: "variables.env",
});

// Deactivating old and deprecated behaviours.
MONGOOSE.set("useFindAndModify", false);
MONGOOSE.set("useCreateIndex", true);

// MongoDB Atlas or localhost Mongodb.
const MONGO_DB = process.env.MONGODB_ATLAS || process.env.LOCALHOST_MONGODB;

// Connecting the Database with mongoose.
MONGOOSE.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log("The connection to the DB has been succesful!");
  })
  .catch((error) => {
    console.log(error);
  });
