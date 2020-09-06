const express = require("express");
const passport = require("passport");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

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

//@route    api/tasks/:id
//@desc     Get tasks bu user id
//@access   Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    const errors = {};

    Task.find({ user: ObjectId(id) })
      .then((tasks) => {
        if (!tasks) {
          errors.notasks = "There are no tasks for this user";
          return res.status(404).json(errors);
        }

        res.json(tasks);
      })
      .catch((err) => res.status(404).json({ task: "There are no tasks" }));
  }
);

module.exports = router;
