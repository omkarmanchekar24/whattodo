const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../../models/User");

//Load input validation
const validateRegisterInput = require("../../validation/register");

//@route    api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "User works!" }));

//@route    POST api/users/register
//@desc     Register user
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@desc     Login user
//@access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = {};

  User.findOne({ email })
    .then((user) => {
      //Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      //Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          //User Matched
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          }; //Create Jwt Payload

          //Sign Token
          jwt.sign(payload, keys.secretOrKey, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          errors.password = "Password is incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => {});
});

module.exports = router;
