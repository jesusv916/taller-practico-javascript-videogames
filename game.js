/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

let canvasSize;
let elementsSize;

let level = 0;
let lives = 3;


let timeStart;
let timePlayer;
let timeInterval;

let playerPos = {
    x:undefined,
    y: undefined
};


let gifPos = {
    x:undefined,
    y: undefined
}

let enemyPositions  = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    // Calcula el tamaño máximo posible que sea múltiplo de 10
    const maxDimension = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    canvasSize = Math.floor(maxDimension / 10) * 10; // ¡MÚLTIPLO DE 10!
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10; // ¡Siempre entero!

    startGame();
}


function startGame() {
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }


    if (!map) {
        gameWin();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();

    enemyPositions = [];
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
            }else if(col == "I"){
                gifPos.x = posX;
                gifPos.y = posY;
            }else if(col == "X"){
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer(){
    const gifCollisionX = playerPos.x.toFixed(3) == gifPos.x.toFixed(3);
    const gifCollisionY = playerPos.y.toFixed(3) == gifPos.y.toFixed(3);
    
    const gifCollision = gifCollisionX && gifCollisionY;

    if (gifCollision){
        console.log('subiste de nivel');
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPos.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPos.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
}


function levelWin(){
    console.log('subiste de nivel');
    level++;
    startGame();
    
}

function gameWin(){
    alert('te pasaste el juego');
    clearInterval(timeInterval);
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']);

    spanLives.innerHTML = "";

    heartsArray.forEach(heart => spanLives.append(heart) )


    spanLives.innerHTML = heartsArray;
}

function showTime(){

    spanTime.innerHTML = Date.now() - timeStart;

}

function levelFail(){
    console.log('Chocaste contra un enemigo :(')
    lives--;


    if (lives <= 0){
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

        playerPos.x = undefined; 
        playerPos.y = undefined;
        startGame(); 


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