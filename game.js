
var userClickedPattern = [];
var gamePattern = [];
var buttonColors =["red", "blue", "yellow", "green"];
var level = 0;
var gameStarted = false;
var step;


$(document).keypress( function(){
  if(!gameStarted){
    resetValues();
    nextSequence();
    gameStarted = true;
  }
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level "+level);
  level++;
}

$("div .btn").click( function(){
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  if(gameStarted){
    checkStep(step);
  }
  step++;
  if(userClickedPattern.length === gamePattern.length){
    setTimeout( function(){
        if(gameStarted){
          nextSequence();
          userClickedPattern = [];
          step = 0;
        }
      }, 1000);
  }
});

function checkStep(step){
  if(gamePattern[step]===userClickedPattern[step]){
  }
  else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
      }
      ,200);
    gameStarted = false;
    resetValues();
  }
}

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed"); }, 100);
}

function resetValues(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  step = 0;
}
