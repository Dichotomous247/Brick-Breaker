let canvas = document.getElementById("myCanvas")
let context = canvas.getContext("2d")

// starts new path
//defines a rectangle(x,y,width,height)
//stores colour used by the fill method
// if you want to fill the rect. then use fill; if you want to do the outline then use stroke
// closes path

let x = canvas.width/2
let y = canvas.height - 20
let changeInX = 2
let changeInY = -2

function drawBall(){
    context.beginPath();
    context.arc(x,y,20,0,Math.PI*2)
    context.strokeStyle = 'green'
    context.stroke();
    context.closePath();
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x+=changeInX
    y+=changeInY
}
setInterval(draw,10)

