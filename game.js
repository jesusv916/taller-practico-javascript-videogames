/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

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
    game.textBaseline = "top";
    
    mapRowCols.forEach((row, rowI) => {
        row.forEach( (col,colI) =>{
            const emoji = emojis[col];
            const posX = elementsSize* (colI +1);
            const posY = elementsSize* (rowI);
            game.fillText(emoji, posX, posY);
        });
    });
    
    // for (let row = 1; row <= 10; row++) {
    //     for (let column=1; column<=10; column++){
    //     game.fillText(emojis[mapRowCols[row-1][column-1]], elementsSize* column, elementsSize* row);
    //     } 

    // }
}

    // window.innerHeight
    // window.innerHeight

    // game.fillRect(0,0,100,100)
    // game.clearRect(0,50,50,50)
    // // game.clearRect(0,0,100,50);
    // game.fillStyle = 'Purple';
    // game.textAlign = 'end';
    // game.fillText('Jesus', 10,10);