$("h1").css("color", "purple");

var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "yellow", "green"];

var i = 0;
var level = 0;

// when key from keyboard is pressed

$(document).keydown(function() {
  if (i < 1) {
    $("#level-title").text("Level" + level);
    nextSequence();
    i++;
  }
})

// to give the pattern of the game

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

//to check if the your pattern was correct or not

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    // alert("you failed");

    playsound('wrong');

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {

      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}

//to give sounds to the button

function playsound(name) {
  var audio = new Audio( name + '.mp3');
  audio.play();
}

//after the buttons are clicked

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);

});

//to give animation to the buttons

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//to restart the game when you fail

function startOver() {
  i = 0;
  level = 0;
  gamePattern = [];
}
