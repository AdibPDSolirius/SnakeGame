import { Position } from './position.js';

export class Grid {
    constructor(sizeOfGrid, sizeOfBlocks, sizeOfBlockSpacing){
        this.sizeOfGrid = sizeOfGrid;
        this.sizeOfBlocks = sizeOfBlocks;
        this.sizeOfBlockSpacing = sizeOfBlockSpacing;
        this.grid = [];
        this.createGridOfPositions();
    }

    createGridOfPositions() {
        let gridArray = [];
        for(let currentXPosition = 0; currentXPosition < this.sizeOfGrid; currentXPosition = currentXPosition + this.sizeOfBlocks + this.sizeOfBlockSpacing) {
            let rows = [];
            for(let currentYPosition = 0; currentYPosition < this.sizeOfGrid; currentYPosition = currentYPosition + this.sizeOfBlocks + this.sizeOfBlockSpacing){
                rows.push(new Position(currentYPosition, currentXPosition));
            }
            gridArray.push(rows);
        }
        this.grid = gridArray;
    }

    getGridRowSize() {
        return this.grid.length;
    }

    getGridColumnSize() {
        return this.grid[0].length;
    }

    getScreenSize(blockCount) {
        return blockCount * this.sizeOfBlocks;
    }

    getScreenPosition(gridPosition){
        return this.grid[gridPosition.y][gridPosition.x];
    }
    
}