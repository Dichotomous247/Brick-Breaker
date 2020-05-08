let canvas = document.getElementById("myCanvas")
let context = canvas.getContext("2d")

// starts new path
//defines a rectangle(x,y,width,height)
//stores colour used by the fill method
// if you want to fill the rect. then use fill; if you want to do the outline then use stroke
// closes path

//ball varibles
let x = canvas.width/2
let y = canvas.height - 20
let changeInX = 2
let changeInY = -2
let ballRadius = 10
//paddle varibles
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightArrowPress = false
let leftArrowPress = false
document.addEventListener('keyup',handleKeyUp,false);
document.addEventListener('keydown',handleKeyDown,false);

function handleKeyUp(){
    if (event.key==="Right"){
        rightArrowPress=false
    }else if(event.key==="ArrowRight"){
        rightArrowPress=false
    }
    if (event.key==="Left"){
        leftArrowPress=false
    } else if(event.key==="ArrowLeft"){ //The event.key holds the info about the key that was pressed
        leftArrowPress=false
    }
}

function handleKeyDown(event){
    if (event.key==="Right"){
        rightArrowPress=true
    }else if(event.key==="ArrowRight"){
        rightArrowPress=true
    }
    if (event.key==="Left"){
        leftArrowPress=true
    } else if(event.key==="ArrowLeft"){
        leftArrowPress=true
    }
}

function drawBall(){
    context.beginPath();
    context.arc(x,y,ballRadius,0,Math.PI*2)
    context.strokeStyle = 'navy'
    context.stroke();
    context.closePath();
}
function drawPaddle(){
    
    context.beginPath();
    context.rect(paddleX,canvas.height-paddleHeight-3,paddleWidth,paddleHeight)
    context.strokeStyle = 'navy'
    context.stroke();
    context.closePath();
}
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(y+changeInY<ballRadius){
        changeInY=-changeInY
    }
    
    else if(y+changeInY>canvas.height-ballRadius){
        console.log("you have found a secret")
        if(x>paddleX&&x<paddleX+paddleWidth){
            changeInY=-changeInY
        }else{
            alert("Game Over :(")
            document.location.reload
            clearInterval(interval)
        }
    
    }
    else if(x+changeInX<ballRadius){
        changeInX=-changeInX
    }
    else if(x+changeInX>canvas.width-ballRadius){
        changeInX=-changeInX
    }

    if(rightArrowPress && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftArrowPress && paddleX > 0) {
        paddleX -= 7;
    }

    x+=changeInX
    y+=changeInY

}


let interval = setInterval(draw,10)
