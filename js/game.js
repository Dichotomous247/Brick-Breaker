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
let paddleWidth = 90
let paddleX = (canvas.width-paddleWidth)/2
let rightArrowPress = false
let leftArrowPress = false
document.addEventListener('keyup',handleKeyUp,false);
document.addEventListener('keydown',handleKeyDown,false);
//brick varibles
let brickRows = 4
let brickColumns = 4
let brickWidth = canvas.width/4-11
let brickHeight = 20
let brickPadding = 5
let brickOffsetLeft = 15
let brickOffsetTop = 15
//oth
let ballSpeed = 10

let score = 0

let wonGame = false

let bricks = []
//initialize the bricks
for(let i=0; i<brickColumns; i+=1){
    bricks[i]=[]
    for(let j=0; j<brickRows; j+=1){
        bricks[i][j] = {x:0,y:0,status:1}          
    }
}

function drawScore(){
    context.font = "20px Arial";
    context.fillStyle = "slateblue"
    context.fillText("Score: "+score, 10, 50);
}

function drawBricks(){
    for(let i=0; i<brickColumns; i+=1){
        for(let j=0; j<brickRows; j+=1){
            if(bricks[i][j].status===1){
                let brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft
                let brickY = (j*(brickHeight+brickPadding))+brickOffsetTop+60
                bricks[i][j].x = brickX
                bricks[i][j].y = brickY
                context.beginPath();
                context.rect(brickX,brickY,brickWidth,brickHeight)
                context.fillStyle = 'slateblue'
                context.fill();
                context.closePath();
            }
        }
    }
    if(wonGame){
        alert("Congrats! You Win!")
        document.location.reload();
        clearInterval(interval)
    }
}

function collisionDetection(){
    for(let i = 0; i<brickColumns; i+=1){
        for(let j = 0; j<brickRows; j+=1){
            let B = bricks[i][j]
            if(B.status===1){
                if(x>B.x&&x<B.x+brickWidth&&y>B.y&&y<B.y+brickHeight){
                    changeInY=-changeInY
                    score+=100
                    B.status = 0
                    if(score===brickRows*brickColumns*100){
                      wonGame = true
                    }
                }
            }
        }
    }
}

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
    context.fillStyle = 'slateblue'
    context.fill();
    context.closePath();
}
function drawPaddle(){
    
    context.beginPath();
    context.rect(paddleX,canvas.height-paddleHeight-3,paddleWidth,paddleHeight)
    context.fillStyle = 'slateblue'
    context.fill();
    context.closePath();
} 
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawScore();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(y+changeInY<ballRadius){
        changeInY=-changeInY
    }
    
    else if(y+changeInY>canvas.height-ballRadius){
        console.log("you have found a secret")
        if(x>paddleX&&x<paddleX+paddleWidth){
            changeInY=-changeInY
        }else{
            alert("Game Over :(")
            document.location.reload();
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

let interval = setInterval(draw,ballSpeed)