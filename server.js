const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// do I need to change the atlas cluster to Workouts?***************************
// let uri = 'mongodb+srv://lisagoodell-admin:VWb88ijDMdgA4j2z@cluster0.4ns5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001;

const db = require('./models');

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/api'))

mongoose.connect("mongodb://localhost/workouts", {           
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// db.Workouts.create({ name: "Workouts" })
//   .then(dbWorkouts => {
//     console.log(dbWorkouts);
//   })
//   .catch(({message}) => {
//     console.log(message);
//   });

// app.get("/exercises", (req, res) => {
//   db.Workouts.find({})
//     .then(dbWorkouts => {
//       res.json(dbWorkouts);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/workouts", (req, res) => {
//   db.Workouts.find({})
//     .then(dbWorkouts => {
//       res.json(dbWorkouts);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/stats", (req, res) => {
//   db.Workouts.find({})
//     .populate("stats")
//     .then(dbWorkouts => {
//       res.json(dbWorkouts);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({body}, res) => {
//   db.Workouts.create(body)
//     .then(({_id}) => db.Workouts.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
//     .then(dbWorkouts => {
//       res.json(dbWorkouts);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

