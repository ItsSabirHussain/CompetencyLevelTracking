const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notifications = new Schema({
  Name: {
    type: String
  },
  ID: {
    type: String
  },
  Date: {
    type: String
  },
  Description: {
    type: String
  }
});
module.exports = mongoose.model("Notifications", Notifications);
