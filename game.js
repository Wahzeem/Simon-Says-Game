//Variables:
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Random number generated between 0-3 to select a colour from the buttonColours array
function nextSequence(){

  level++;
  $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour); //Add randomChosenColour to the gamePattern array
$("#" + randomChosenColour).fadeOut(100).fadeIn(100); //get random colour to fade in
animatePress(randomChosenColour);
playSound(randomChosenColour);
}


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id"); //Var with the chosen button thats been clicked
  userClickedPattern.push(userChosenColour); //Push that clicked colour into an array
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  var clickedButton = $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
clickedButton.removeClass("pressed");
} , 100);
}
