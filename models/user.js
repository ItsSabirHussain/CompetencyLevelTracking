const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  ID: {
    type: String,
    required: true
  },
  Key: {
    type: String,
    required: true
  },
  City: {
    type: String
  },
  Country: {
    type: String
  },
  Department: {
    type: String
  },
  Skills: {
    type: []
  },
  CLevel: {
    type: String
  },
  Phone: {
    type: String
  }
});
module.exports = mongoose.model("User", User);
