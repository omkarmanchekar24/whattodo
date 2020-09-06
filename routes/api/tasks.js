const express = require("express");
const passport = require("passport");
const router = express.Router();

//Load Task Model
const Task = require("../../models/Task");

//@route    api/tasks/test
//@desc     Tests tasks route
//@access   Public
router.get("/test", (req, res) => res.send({ msg: "Task works" }));

//@route    api/tasks/addtask
//@desc     Add Task
//@access   Private
router.post(
  "/addtask",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const newTask = new Task({
      user: req.body.user,
      text: req.body.text,
      date: req.body.date,
    });

    newTask
      .save()
      .then((task) => res.json(task))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
