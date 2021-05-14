const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const routes = require('./routes')

// do I need to change the atlas cluster to Workouts?***************************
// let uri = 'mongodb+srv://lisagoodell-admin:VWb88ijDMdgA4j2z@cluster0.4ns5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workoutdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

// routes
// app.use(require("./routes"));

// app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });