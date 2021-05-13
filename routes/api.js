const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/exercise?", (req, res) => {
    if (req.query.id) {    
        Workout.find({
            _id: req.query.id,
        })
        .then(workout => {
            res.redirect("exercise.html" + "?id=" + req.query.id);
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
        });
    } else {
        res.redirect("exercise.html");        
    }
});




router.get("/stats", (req, res) => {
    res.redirect("stats.html");
});



router.get("/api/workout/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum : "$exercises.duration" },
            }
        }
    ]).sort({day: -1}).limit(7)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });    
})



router.get("/api/workout", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum : "$exercises.duration" },
            }
        }
    ])
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
});




router.get("/api/workout/:id", (req, res) => {
    Workout.find({
        _id: req.params.id,
    })
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
        console.log(err);
    });
});




router.put("/api/workout", (req, res) => {
     Workout.save(req.body)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        alert(err);
        res.status(400).json(err);
    });
});



router.put("/api/workout/:id", (req, res) => {
    Workout.findByIdAndUpdate( 
        req.params.id,
        { 
            $push: { exercises: req.body }}
        )
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});




router.post("/api/workout", (req, res) => {
    Workout.create(req.body)
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});


module.exports = router;
