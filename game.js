//Variables:
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() { //Any button pressed then start game
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Random number generated between 0-3 to select a colour from the buttonColours array
function nextSequence() {
  userClickedPattern = []; // Reset/initiate the userClickedPattern for the next level
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); //Add randomChosenColour to the gamePattern array
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //get random colour to fade in
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); //Var with the chosen button thats been clicked
  userClickedPattern.push(userChosenColour); //Push that clicked colour into an array
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//function that compares answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check if the current index of userClickedPattern matches the index of gamePattern
    // console.log("Success");
    if (userClickedPattern.length === gamePattern.length) { //Check if both arrays have the same number of sequences
      setTimeout(function() { //delay the execution of nextSequence(); by 1000ms
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("Wrong");
    playSound("wrong");
    $("#level-title").text("Game Over! Press any key to restart"); //Game over text
    var gameoverAnim = $("body").addClass("game-over");
    setTimeout(function() {
      gameoverAnim.removeClass("game-over");
    }, 100);
    startOver();
  }
}


//function that plays sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//function that creates button pressed animation
function animatePress(currentColour) {
  var clickedButton = $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    clickedButton.removeClass("pressed");
  }, 100);
}


//Start over function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
