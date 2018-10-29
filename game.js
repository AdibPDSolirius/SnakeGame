import { GameCanvas } from './gameCanvas.js';
import { GameBoard } from './gameBoard.js';
import { Player } from './player.js';
import { Food } from './food.js';

export class Game {
    constructor() {
        this.player = new Player(5);
        this.food = new Food();
        this.gameBoard = new GameBoard(250, this.player, this.food);
        this.gameCanvas = new GameCanvas(this.gameBoard);
        this.addKeyListeners();
    }

    addKeyListeners() {
        window.onkeydown = function(e) {
            let keyCode = e.keyCode ? e.keyCode : e.which;
            let direction = '';
            if(keyCode === 37) {
                direction = 'LEFT';
            }else if(keyCode === 38) {
                direction = 'UP';
            }else if(keyCode === 39) {
                direction = 'RIGHT';
            }else if(keyCode === 40) {
                direction = 'DOWN';
            }else{
                return;
            }
            this.gameBoard.updatePlayerDirection(direction);
        }.bind(this);
    }

    runAtSpeed(speed) {
        setInterval(this.updateGame.bind(this), speed);
    }

    updateGame() {
        this.updatePlayer();
        this.updateCanvas();
    } 

    updatePlayer() {
        this.gameBoard.updatePlayerPosition();
        this.gameBoard.updatePlayerCollision();
    }

    updateCanvas() {
        this.gameCanvas.render();
    }

}