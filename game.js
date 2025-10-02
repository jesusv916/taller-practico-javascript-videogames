/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


let canvasSize;
let elementsSize;

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize  = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log(canvasSize, elementsSize);

    game.font = elementsSize + "px Verdana";
    game.textAlign = "start"; 

    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
    }
    // window.innerHeight
    // window.innerHeight

    // game.fillRect(0,0,100,100)
    // game.clearRect(0,50,50,50)
    // // game.clearRect(0,0,100,50);
    // game.fillStyle = 'Purple';
    // game.textAlign = 'end';
    // game.fillText('Jesus', 10,10);
}