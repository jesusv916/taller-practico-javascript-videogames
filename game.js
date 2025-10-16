/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

let playerPos = {
    x:undefined,
    y: undefined
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;

    startGame();
}


function startGame() {
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    game.clearRect(0, 0, canvasSize, canvasSize);
    
    mapRowCols.forEach((row, rowI) => {
        row.forEach( (col,colI) =>{
            const emoji = emojis[col];
            const posX = elementsSize* (colI +1);
            const posY = elementsSize* (rowI +1);

            if (col == "O"){
                if (!playerPos.x && !playerPos.y){
                playerPos.x = posX;
                playerPos.y = posY;
                console.log({playerPos});
                }
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown .addEventListener('click', moveDown)

function moveByKeys(event){
    event.key=="w"? moveUp()
    :event.key=="a"? moveLeft()
    :event.key=="d"?moveRight()
    :event.key=="s"?moveDown()
    :event.key=="W"? moveUp()
    :event.key=="A"? moveLeft()
    :event.key=="D"?moveRight()
    :event.key=="S"?moveDown()
    :event.key==="ArrowUp"? moveUp()
    :event.key==="ArrowLeft"? moveLeft()
    :event.key==="ArrowRight"?moveRight()
    :event.key==="ArrowDown"?moveDown()
    :console.log("Esa tecla no mueve nada");
}

function moveUp(){
    console.log("Me quiero mover hacia arriba");
    if ((playerPos.y - elementsSize)< elementsSize ) {
        console.log("no te puedes mover");
    }else {
        playerPos.y -= elementsSize;
        startGame();
    }

}

function moveLeft(){
    console.log("Me quiero mover hacia Izquierda");
    if ((playerPos.x - elementsSize)< elementsSize ) {
        console.log("no te puedes mover");
    }else {
        playerPos.x -= elementsSize;
        startGame();
    }
}

function moveRight(){
    console.log("Me quiero mover hacia Derecha");
    if ((playerPos.x + elementsSize) > canvasSize ) {
        console.log("no te puedes mover");
    }else {
        playerPos.x += elementsSize;
        startGame();
    }
}

function moveDown(){
    console.log("Me quiero mover hacia abajo");
    if ((playerPos.y + elementsSize) > canvasSize ) {
        console.log("no te puedes mover");
    }else {
        playerPos.y += elementsSize;
        startGame();
    }
}