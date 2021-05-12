const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    exercises: { 
        cardio:{
            name: {type: String},
            distance: {type: Number},
            duration: {type: Number}
        } ,
        resistance: { 
            exerciseName: {type: String},
            weight: {type: Number},
            sets: {type: Number},
            reps: {type: Number},
            duration: {type: Number}
        }
    }       
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;