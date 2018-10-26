import { Position } from './position.js';

export class GameCanvas {
    constructor(gameBoard, player, food) {
        this.gameBoard = gameBoard;
        this.player = player;
        this.food = food;
        this.id = 'gameBoard';
        this.createCanvasInDOM(this.id);
    }

    createCanvasInDOM(id) {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        this.setCanvasProperties(canvas, this.gameBoard.getSize(), this.gameBoard.getSize(), '1px solid');
        document.body.appendChild(canvas);
    }

    setCanvasProperties(canvas, width, height, border) {
        canvas.width = width;
        canvas.height = height
        canvas.style.border = border;
    }

    render() {
        this.renderBackGround();
        this.renderPlayer();
        this.renderFood();
    }

    renderBackGround() {
        this.fillCanvasSpace('black', new Position(0,0), this.gameBoard.getSize());
    }

    renderPlayer() {
        let playerPositions = this.gameBoard.getPlayerPositions();
        let playerSize = this.gameBoard.getPlayerSize();
        for(let playerPosition of playerPositions) {
            this.fillCanvasSpace('yellow', playerPosition, playerSize);
        }
    }

    renderFood() {
        let foodPosition = this.gameBoard.getFoodPosition();
        let foodSize = this.gameBoard.getFoodSize();
        this.fillCanvasSpace('red', foodPosition, foodSize);
    }

    fillCanvasSpace(color, position, size) {
        var ctx = this.getCanvasElement().getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, size , size);
    }

    getCanvasElement() {
        return document.getElementById(this.id);
    }
}
