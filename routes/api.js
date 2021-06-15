const express = require("express");
const router = require("express").Router();
const Workout = require("../models/workout");

router.get('/workouts', (req,res) => {
    Workout.aggregate([
        { $addFields:{totalDuration:
          {$sum:"$exercises.duration"}}}
    ])
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/workouts/range', (req,res) => {
    Workout.aggregate([
        { $addFields:{totalDuration:
          {$sum:"$exercises.duration"}}}
      ])
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
     {
        _id: req.params.id
    },
    {
        $push: {"exercises": req.body}
    },
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    )
});

router.post('/workouts', ({body},res) => {
    Workout.create({body})
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
