// TODO: ask questions

const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
  // initializes var workout
  let workout;
  // what is this line doing?**********************************
  // if in URL what follows id= will be split out into and array
  // if there is no id, then wait for a new workout to be created
  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout + "Heyo! I'm line 30 exercise.js");
  }
  // if there is a workout already,
  if (workout) {
    // set a query in the URL with the id #
    location.search = "?id=" + workout._id;
  }

}
// run function
initExercise();

// handles the workout type options to be selected from 
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;
  // if cardio is chosen, allow resistanceForm to be the option to change to
  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  // if resistance is selected, allow option to be cardio
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  // else have both as an option to choose from 
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }
  validateInputs();
}

// f to check for the inputs after selecting workout type
function validateInputs() {
  let isValid = true;
  // when 'resistance' is selected
  // if the exercise name is left empty, change 'isValid' to false
  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }
    // if weight is left empty do the same, etc
    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }
  // is all inputs are validated, show the complete and add buttons
  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  // otherwise they remain unavailable
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

// what to do when the values are submitted
async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};
  // set the users input values to the form keys
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  // then wait for the user to add a new exercise and runs the clearInputs f
  await API.addExercise(workoutData);
  clearInputs();
  // add the 'success' text to the toast div
  toast.classList.add("success");
}

// if the user navigates away from that page, take them to the home route
function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

// after user adds new exercise, clear out the input fields
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}
// if user changes the exercise type, run the f to alter the 'other option'
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
// if the user completes the workout and clicks the 'complete' btn, bring back to the home route and run the f to add users values to keys in db
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
// if the user clicks to 'add' button run the f to add users new values to DB
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
// return message
toast.addEventListener("animationend", handleToastAnimationEnd);

// validate all inputs
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
