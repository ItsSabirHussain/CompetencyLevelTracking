const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Admin = require("../models/admin");
const Notifications = require("../models/notifications");

const Place = require("../models/place");
const User = require("../models/user");

router.post("/promanreg", (req, res) => {
  Admin.findOne({ ID: req.body.ID }).then(proman => {
    if (proman) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newProMan = new Admin({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });
      newProMan
        .save()
        .then(admin => res.json(newProMan))
        .catch(err => console.log(err));
    }
  });
});

router.post("/adminlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  console.log(ID);
  console.log(Key);
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (req.body.Key === admin.Key) {
      const payload = {
        id: admin.id,
        ID: admin.ID
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Key incorrect" });
    }
  });
});
router.post("/getadmin", function(req, res) {
  console.log(req.body);
  Admin.findOne({ ID: req.body.ID }, function(err, admin) {
    if (admin) {
      return res.json(admin);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

router.route("/aupdateprofile").post(function(req, res) {
  Admin.findOne({ ID: req.body.ID }, function(err, admin) {
    admin.FullName = req.body.FullName;
    admin.ID = req.body.ID;
    if (req.body.Key === "") {
      admin.Key = req.body.Key;
    }
    admin.Email = req.body.Email;
    if (!admin.Key === "") {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          admin.Key = hash;
          admin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
    admin
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

router.post("/addplace", (req, res) => {
  console.log("here");

  Place.findOne({
    Latitude: req.body.Longitude,
    Longitude: req.body.Latitude
  }).then(place => {
    if (place) {
      return res.status(400).json({ ID: "Place already exists" });
    } else {
      const newPlace = new Place({
        Name: req.body.Name,
        Category: req.body.Category,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        Tags: req.body.Tags,
        City: req.body.City
      });
      newPlace
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.post("/getallnoti", function(req, res) {
  Notifications.find(function(err, allnoti) {
    if (allnoti) {
      return res.json(allnoti);
    } else {
      return res.json({ message: "No Notification" });
    }
  });
});

router.post("/deletenoti", function(req, res) {
  Notifications.deleteOne({ ID: req.body.ID }, function(err, obj) {
    console.log("there");

    return res.json({ message: "Notification deleted." });
  });
});

router.post("/getallusers", function(req, res) {
  User.find(function(err, user) {
    if (user) {
      return res.json(user);
    } else {
      return res.json({ message: "There is no users." });
    }
  });
});

module.exports = router;
