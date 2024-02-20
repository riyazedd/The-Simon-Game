var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


//starting game
$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started=true;
    }
});


//generates colour pattern chosen by the player
$('.btn').click(function(){
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)

});


//check users answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong")
        $('#level-title').text("Game Over, Press Any Key to Restart");
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startOver();
    }
}


//generates a random colour patter
function nextSequence(){
    userClickedPattern=[];
    level++;
    $('#level-title').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}


//plays sound when the button is clicked or random colour is shown
function playSound(name){

    let audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}


//animating press
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100);
}


//restart game
function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}