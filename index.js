//Board
let tileSize = 32
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

//Ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipVelocityX = tileSize; //Moving speed of ship, which is 1 tile size at a time

//Aliens
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
alienVelocityX = 1;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");//Used for drawing on the board

    //Draw ship at starting location
    //context.fillStyle="green";
    //context.fillRect(ship.x, ship.y, ship.width, ship.height);
    //Way to draw it without image

    //Load images
    shipImg = new Image();
    shipImg.src = "./images/ship.png";
    shipImg.onload = function(){
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "./images/alien.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
}

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    //Redrawing ship with each movement
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //Drawing aliens
    for(let i = 0; i < alienArray.length; i++){
        let alien = alienArray[i];
        if(alien.alive){
            alien.x += alienVelocityX;

            //If alien touches borders
            if(alien.x + alien.width >= board.width || alien.x <= 0){
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                //Move aliens closer to ship when they hit a border
                for(let j = 0; j < alienArray.length; j++){
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
        }
    }
}

function moveShip(e){
    if(e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0){
        ship.x -= shipVelocityX;
    }else if(e.code =="ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){
        ship.x += shipVelocityX;
    }
}

function createAliens(){
    for(let c = 0; c < alienColumns; c++){
        for(let r = 0; r < alienRows; r++){
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            }

            alienArray.push(alien);
        }
    }

    alienCount = alienArray.length;
}