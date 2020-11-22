const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const generateVerificationToken = require("../../utils/Utils");
const sendEmail = require("../../utils/NodeMailer");
const moment = require("moment");

//Load User Model
const User = require("../../models/User");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

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

  const verificationToken = generateVerificationToken();
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({
    email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        verification_token: verificationToken,
        verification_token_time: moment.utc().add(6, "minutes").toDate(),
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(async (user) => {
              await sendEmail({
                to: [email],
                subject: "Email verification",
                html: `<p>Hey ${name}</p><br/>
                <p>Your <b>what to do</b> one time password to verify email id is <b>${verificationToken}</b></p><br/>
`,
              });
              res.json(user);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route    PATCH api/users/verify
//@desc     Verify email id by matching verification token
//@access   Public
router.patch("/verify", async (req, res) => {
  const verificationToken = req.body.verificationToken;
  const email = req.body.email;

  try {
    const user = await User.findOneAndUpdate(
      {
        email,
        verification_token: verificationToken,
        verification_token_time: { $gt: moment.utc().toDate() },
      },
      { verified: true },
      { new: true }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ otp: "Otp has expired. Please request a new one." });
    }
  } catch (error) {
    throw error;
  }
});

//@route    PATCH api/users/resendtoken
//@desc     Resend verification token
//@access   Public
router.patch("/resendtoken", async (req, res) => {
  console.log("called");
  const email = req.body.email;
  const verificationToken = generateVerificationToken();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        verification_token: verificationToken,
        verification_token_time: moment.utc().add(6, "minutes").toDate(),
      }
    );

    if (user) {
      await sendEmail({
        to: [user.email],
        subject: "Email Verification",
        html: `<p>Hey ${user.name}</p><br/>
        <p>Your what to do one time password to verify email id is <b>${verificationToken}</b></p><br/>
`,
      });
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

//@route    POST api/users/login
//@desc     Login user
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      //Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      if (!user.verified) {
        errors.verification = "Email id is not verified";
        return res.status(400).json(errors);
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
