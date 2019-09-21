const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const User = require("../models/user");
const Notifications = require("../models/notifications");
router.post("/userreg", (req, res) => {
  User.findOne({ ID: req.body.ID }).then(user => {
    const d = new Date();
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCUser = new User({
        FullName: req.body.FullName,
        Email: req.body.Email,
        ID: req.body.ID,
        Key: req.body.Key
      });
      const newNofi = Notifications({
        ID: req.body.ID,
        Name: req.body.FullName,
        Date: d,
        Description: "New sign up"
      });
      newNofi.save();
      newCUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.post("/userlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  User.findOne({ ID: req.body.ID }).then(user => {
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (user.Key === req.body.Key) {
      const payload = {
        id: user.id,
        ID: user.ID
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
      return res.status(400).json({ keyincorrect: "Key incorrect" });
    }
  });
});

router.route("/updateprofile").post(function(req, res) {
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      const uSkills = Array.from(req.body.Skills);
      user.FullName = req.body.FullName;
      user.Email = req.body.Email;
      user.Skills = req.body.Skills;
      user.Phone = req.body.Phone;
      user.Department = req.body.Department;
      user.Country = req.body.Country;
      user.City = req.body.City;
      const skils = [
        "Communication",
        "IT/Technology Affinity",
        "Big Data",
        "Problem Solving",
        "Life-Long Learning",
        "Work in Interdisciplinary Environments",
        "Network Technology",
        "Modelling/Programming",
        "Data/Network Security",
        "Business Process Mgm",
        "Collaboration",
        "Reamwork",
        "Decision Making",
        "Leardership Skills",
        "Service Orientation",
        "Creativity",
        "Self-Management"
      ];
      cl = 0;
      skils.forEach((v, i, a) => {
        if (uSkills.includes(v)) {
          cl += 1;
        }
      });
      const d = new Date();
      if (cl < 5) {
        user.CLevel = "Great 8 Factor Level";
      } else if (cl < 10) {
        user.CLevel = "20 Dimensions Competency Level";
      } else {
        user.CLevel = "68 I4.0 Components Bahaviur Level";
      }
      const newNofi = Notifications({
        ID: req.body.ID,
        Name: req.body.FullName,
        Date: d,
        Description: "Profile Upated."
      });
      newNofi.save();
      user
        .save()
        .then(user => {
          res.json("Profile updated");
        })
        .catch(err => {
          res.status(400).send("Profile not possible");
        });
    }
  });
});

router.route("/updateup").post(function(req, res) {
  const d = new Date();
  User.findOne({ ID: req.body.IDD }, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      user.ID = req.body.ID;
      user.Key = req.body.Key;
      user.save();
      const newNofi = Notifications({
        ID: req.body.ID,
        Name: user.FullName,
        Date: d,
        Description: "User Name Password Changed."
      });
      newNofi.save();
    }
  });
});

router.route("/ucurrentcity").post(function(req, res) {
  CurrentCity.findOne({ ID: req.body.ID }, function(err, cl) {
    if (!cl) res.status(404).send("data is not found");
    else {
      cl.City = req.body.City;
      cl.ID = "0";

      cl.save()
        .then(todo => {
          res.json("City updated");
        })
        .catch(err => {
          res.status(400).send("City update not possible");
        });
    }
  });
});

router.post("/getuser", function(req, res) {
  User.findOne({ ID: req.body.ID }, function(err, user) {
    if (user) {
      return res.json(user);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

module.exports = router;
