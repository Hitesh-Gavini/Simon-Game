buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
$("body").on("keydown",function(){
    if(start===false){
        start=true;
        nextSequence();
    }
})



function nextSequence(){
    $("h1").text("Level "+level);
    console.log("in function");
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut().fadeIn();

    playSound(randomChosenColour);
    takeInput();
}

function takeInput(){
    $(".btn").off("click").on("click",function(event){
        var userChosenColour=this.id;
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
        animatePress(userChosenColour);
        console.log("inside click function");
        checkPattern();
        });
}


function checkPattern(){
console.log(gamePattern);
console.log(userClickedPattern);

if(compareArrays(gamePattern,userClickedPattern)){
    
    console.log("in 1st if");
    userClickedPattern=[];
    console.log(userClickedPattern);
    setTimeout(nextSequence,1000);
    level=level+1;
}
else if(gamePattern.length!=userClickedPattern.length){
    takeInput();
    console.log("in 2nd if");
}
else{
    $("h1").text("Game Over!!,Press a key to restart");
    gamePattern=[];
    userClickedPattern=[];
    start=false;
    level=0;
    console.log("in else");
}
}

function compareArrays(a,b){
    var compareArray =a.length===b.length&&a.every((element,index)=>element===b[index]);
    console.log("in comparison");
    console.log(compareArray);
    return compareArray;
}
function playSound(name){
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
