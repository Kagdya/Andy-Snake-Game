import {update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersect} from "./snake.js";
import {update as updateApple, draw as drawApple} from "./apple.js";
import{outsideGrid} from "./grid.js"; 
import { stateOfGame} from "./menu.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game_board");
let gameOver = false;

    function main(currentTime){

        if (gameOver){
            window.location = './indexSnake.html';
            if(confirm("Click \"OK\" To Play Again.")) {
                document.location.reload() ;
            }
            return
        }
        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if(secondsSinceLastRender < 1/snakeSpeed) return

        lastRenderTime = currentTime;
        if(stateOfGame)
        {
            update();
            draw();
            checkDeath();
        }
    }
    window.requestAnimationFrame(main);




//color code the board

const gameBoardColor = document.getElementById("game_board_color");
for(let i = 1; i <= 15*15; i++){
    let block1 = document.createElement('div');
    let block2 = document.createElement('div')  
    block1.setAttribute('id', 'block1');
    block2.setAttribute('id', 'block2');
    if( i % 2 == 0){
        gameBoardColor.append(block1);
    }else{
        gameBoardColor.append(block2);
    }

}

function update() {
    updateSnake();
    updateApple();
}
function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawApple(gameBoard);
}
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect();
}






