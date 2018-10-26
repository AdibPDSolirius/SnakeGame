import { Position } from "./position.js";

export class Player {
    constructor(length){
        this.initialLength = length;
        this.bodySize = 1;
        this.direction = 'RIGHT';
        this.positionHistory = [];
    }

    addPosition(position) {
        this.positionHistory.unshift(position);
    }

    isAtPosition(position) {
        for(let playerPosition of this.positionHistory) {
            if(playerPosition.x === position.x && playerPosition.y === position.y) {
                return true;
            }
        }
        return false;
    }

    updateDirection(direction) {
        let isValidDirection = this.isNotBackwards(direction);
        if(isValidDirection) {
            this.direction = direction;
        }
    }

    isNotBackwards(direction) {
        let upCondition = direction === 'UP' & this.direction !== 'DOWN';
        let downCondition = direction === 'DOWN' & this.direction !== 'UP';
        let leftCondition = direction === 'LEFT' & this.direction !== 'RIGHT';
        let rightCondition = direction === 'RIGHT' & this.direction !== 'LEFT';
        return (upCondition | downCondition | leftCondition | rightCondition)
    }

    updatePlayerHead() {
        if(this.direction === 'UP'){
            this.moveUp();
        }else if(this.direction === 'DOWN') {
            this.moveDown();
        }else if(this.direction === 'LEFT') {
            this.moveLeft();
        }else if(this.direction === 'RIGHT') {
            this.moveRight();
        }
    }

    moveUp() {
        this.setHead(new Position(this.getHead().x, this.getHead().y - 1));
    }

    moveDown() {
        this.setHead(new Position(this.getHead().x, this.getHead().y + 1));
    }

    moveLeft() {
        this.setHead(new Position(this.getHead().x - 1, this.getHead().y));
    }

    moveRight() {
        this.setHead(new Position(this.getHead().x + 1, this.getHead().y));
    }

    updateBodyFrom(headPosition) {
        let curPosition = new Position(headPosition.x, headPosition.y);
        let bodyLength = this.getLength() - 2;
        while(bodyLength >= 0) {
            let temp = this.positionHistory[bodyLength];
            this.positionHistory[bodyLength] = curPosition;
            curPosition = temp;
            bodyLength--;
        }
    }
    
    isSelfCollided() {
        for(let playerPosition = 0; playerPosition < this.getLength() - 2; playerPosition++) {
            let curPlayerPosition = this.positionHistory[playerPosition];
            if(this.getHead().x === curPlayerPosition.x & this.getHead().y === curPlayerPosition.y) {
                return true;
            }
        }
        return false;
    }

    resetPlayerSize() {
        this.positionHistory.splice(0, this.positionHistory.length - (this.initialLength+1));
    }

    increaseLength(){
        let tailPosition = this.positionHistory[0];
        this.positionHistory.unshift(tailPosition);
    }

    getHead() {
        return this.positionHistory[this.getLength() - 1];
    }

    setHead(position) {
        if(this.positionHistory.length === 0){
            this.positionHistory.push(position);
        }else{
            this.positionHistory[this.getLength() - 1] = position;
        }
    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getLength() {
        return this.positionHistory.length;
    }

    getInitialLength() {
        return this.initialLength;
    }

    getBodySize() {
        return this.bodySize;
    }

    getPositionHistory() {
        return this.positionHistory;
    }

}